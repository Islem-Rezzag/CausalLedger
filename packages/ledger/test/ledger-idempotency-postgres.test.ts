import pg from "pg";
import { createRequire } from "node:module";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createIdempotentLedgerJournalStore,
  createLedgerJournalStore,
  LEDGER_IDEMPOTENCY_CONTRACT_VERSION,
  validateLedgerIdempotencyCandidate,
} from "../src/index.js";
import type { LedgerJournalCandidate, AccountCandidate } from "../src/index.js";
import {
  storageAccounts,
  storageJournal,
  syntheticId,
} from "./storage-synthetic.js";
const ownerUrl = process.env.LEDGER_STORAGE_TEST_OWNER_URL,
  appUrl = process.env.LEDGER_STORAGE_TEST_APP_URL;
if (
  !ownerUrl ||
  !appUrl ||
  process.env.LEDGER_STORAGE_TEST_DATABASE !== "causalledger_m04_05_disposable"
)
  throw new Error(
    "Required explicitly owned PostgreSQL acceptance configuration is missing; no skip or ambient fallback.",
  );
const owner = new pg.Client({ connectionString: ownerUrl }),
  app = new pg.Client({ connectionString: appUrl });
const require = createRequire(import.meta.url);
let serial = 3000000;
function journal(
  key?: string,
  amounts: readonly string[] = ["1250"],
): LedgerJournalCandidate {
  const n = ++serial,
    j = storageJournal(n, amounts);
  return {
    ...j,
    transaction: {
      ...j.transaction,
      idempotencyKey: key ?? `synthetic.idempotency.${n}`,
    },
  };
}
function retry(j: LedgerJournalCandidate): LedgerJournalCandidate {
  const n = ++serial,
    next = storageJournal(n);
  return {
    ...j,
    transaction: { ...j.transaction, id: next.transaction.id },
    entries: j.entries.map((e, i) => ({
      ...e,
      id: `ent_${syntheticId(n * 100 + i + 1)}`,
      transactionId: next.transaction.id,
    })),
  };
}
function change(
  j: LedgerJournalCandidate,
  path: string[],
  value: unknown,
): LedgerJournalCandidate {
  const output = structuredClone(j);
  let object = output as unknown as Record<string, unknown>;
  for (const key of path.slice(0, -1))
    object = object[key] as Record<string, unknown>;
  object[path[path.length - 1] as string] = value;
  return output;
}
function snapshots(
  j: LedgerJournalCandidate,
  accounts: readonly AccountCandidate[] = storageAccounts(),
) {
  return accounts
    .filter((a) => j.entries.some((e) => e.accountId === a.id))
    .map((account) => ({
      storageVersion: "m04.05-account-snapshot.v1",
      account: {
        ...account,
        name: {
          representation: "utf16_code_units",
          units: Array.from({ length: account.name.length }, (_, i) =>
            account.name.charCodeAt(i),
          ),
        },
      },
    }));
}
async function direct(j: unknown, a: unknown, client: pg.Client = app) {
  return client.query(
    "SELECT public.append_idempotent_ledger_journal($1::jsonb,$2::jsonb) AS receipt",
    [JSON.stringify(j), JSON.stringify(a)],
  );
}
async function stored(id: string) {
  return (
    await owner.query(
      "SELECT (SELECT count(*) FROM public.ledger_transactions WHERE id=$1)::text AS transactions,(SELECT count(*) FROM public.ledger_entries WHERE transaction_id=$1)::text AS entries,(SELECT count(*) FROM public.ledger_account_snapshots WHERE transaction_id=$1)::text AS accounts",
      [id],
    )
  ).rows[0];
}
async function keyCount(j: LedgerJournalCandidate) {
  return (
    await owner.query(
      "SELECT count(*)::text AS count FROM public.ledger_idempotency_keys WHERE ledger_id=$1 AND source_namespace=$2 AND idempotency_key=$3",
      [
        j.transaction.ledgerId,
        j.transaction.provenance.source.namespace,
        j.transaction.idempotencyKey,
      ],
    )
  ).rows[0].count;
}
async function absent(j: LedgerJournalCandidate) {
  expect(await stored(j.transaction.id)).toEqual({
    transactions: "0",
    entries: "0",
    accounts: "0",
  });
}
async function waiting(pid: number) {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    if (
      (
        await owner.query(
          "SELECT 1 FROM pg_locks WHERE pid=$1 AND locktype='advisory' AND NOT granted",
          [pid],
        )
      ).rowCount === 1
    )
      return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error("Competing connection never waited on key lock");
}
beforeAll(async () => {
  await owner.connect();
  await app.connect();
  const id = (
    await owner.query(
      "SELECT current_database() AS db,current_user AS role,current_setting('server_version_num')::integer AS version",
    )
  ).rows[0];
  expect(id.db).toBe("causalledger_m04_05_disposable");
  expect(id.role).toBe("causalledger_storage_owner");
  expect(id.version).toBeGreaterThanOrEqual(170000);
  expect(id.version).toBeLessThan(180000);
  expect((await app.query("SELECT current_user AS role")).rows[0].role).toBe(
    "causalledger_storage_app",
  );
});
afterAll(async () => {
  await app.end();
  await owner.end();
});
describe("real PostgreSQL scoped idempotency", () => {
  it("executable demo:1250 stores once, renamed retry returns original receipt,1251 conflicts without writes", async () => {
    const j = journal(),
      next = retry(j),
      store = createIdempotentLedgerJournalStore(appUrl);
    try {
      const first = await store.append(j, storageAccounts());
      expect(first).toEqual({
        ok: true,
        receipt: {
          contractVersion: LEDGER_IDEMPOTENCY_CONTRACT_VERSION,
          transactionId: j.transaction.id,
          entryCount: 2,
        },
      });
      expect(await store.append(next, storageAccounts())).toEqual(first);
      await absent(next);
      const bad = retry(j);
      const conflict = {
        ...bad,
        entries: bad.entries.map((e) => ({
          ...e,
          amount: { ...e.amount, minorUnits: "1251" },
        })),
      };
      await expect(
        store.append(conflict, storageAccounts()),
      ).rejects.toMatchObject({ outcome: "not_stored", sqlState: "23505" });
      await absent(conflict);
      expect(await keyCount(j)).toBe("1");
      expect(await stored(j.transaction.id)).toEqual({
        transactions: "1",
        entries: "2",
        accounts: "1",
      });
    } finally {
      await store.close();
    }
  });
  it("SQL independently derives the same canonical semantic object for large money, order and UTF16 names", async () => {
    const j = journal(undefined, [
      "9223372036854775807",
      "9223372036854775807",
    ]);
    const accounts = storageAccounts().map((a, i) =>
      i === 0 ? { ...a, name: "Synthetic \ud800" } : a,
    );
    const checked = validateLedgerIdempotencyCandidate(j, accounts);
    expect(checked.ok).toBe(true);
    if (!checked.ok) throw new Error("fixture");
    const actual = (
      await owner.query(
        "SELECT public.ledger_idempotency_payload($1::jsonb,$2::jsonb) AS payload",
        [
          JSON.stringify({ ...j, entries: [...j.entries].reverse() }),
          JSON.stringify(snapshots(j, accounts).reverse()),
        ],
      )
    ).rows[0].payload;
    expect(actual).toEqual(JSON.parse(checked.value.canonicalPayload));
    const first = (await direct(j, snapshots(j, accounts))).rows[0].receipt;
    expect(
      (await direct(retry(j), snapshots(j, accounts))).rows[0].receipt,
    ).toEqual(first);
    expect(await stored(j.transaction.id)).toEqual({
      transactions: "1",
      entries: "4",
      accounts: "1",
    });
  });
  it("eight concurrent valid duplicate attempts persist one journal and one original outcome", async () => {
    const first = journal();
    const attempts = [first, ...Array.from({ length: 7 }, () => retry(first))];
    const stores = attempts.map(() =>
      createIdempotentLedgerJournalStore(appUrl),
    );
    try {
      const results = await Promise.all(
        attempts.map((j, i) => {
          const store = stores[i];
          if (!store) throw new Error("fixture");
          return store.append(j, storageAccounts());
        }),
      );
      for (const value of results) expect(value).toEqual(results[0]);
      const original = results[0];
      if (!original?.ok) throw new Error("fixture");
      expect(
        attempts.some(
          (j) => j.transaction.id === original.receipt.transactionId,
        ),
      ).toBe(true);
      for (const j of attempts)
        if (j.transaction.id !== original.receipt.transactionId)
          await absent(j);
      expect(await keyCount(first)).toBe("1");
      expect(await stored(original.receipt.transactionId)).toEqual({
        transactions: "1",
        entries: "2",
        accounts: "1",
      });
    } finally {
      await Promise.all(stores.map((store) => store.close()));
    }
  });
  it.each(["equal-commit", "conflict-commit", "winner-rollback"] as const)(
    "two connections serialize %s with an observed wait and no partial second journal",
    async (mode) => {
      const j = journal(),
        next = retry(j);
      const attempt =
        mode === "conflict-commit"
          ? {
              ...next,
              entries: next.entries.map((e) => ({
                ...e,
                amount: { ...e.amount, minorUnits: "1251" },
              })),
            }
          : next;
      const winner = new pg.Client({ connectionString: appUrl }),
        loser = new pg.Client({ connectionString: appUrl });
      await winner.connect();
      await loser.connect();
      let finished = false;
      try {
        await winner.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        const receipt = (await direct(j, snapshots(j), winner)).rows[0].receipt;
        const pid = (await loser.query("SELECT pg_backend_pid() AS pid"))
          .rows[0].pid as number;
        const pending = direct(attempt, snapshots(attempt), loser).then(
          (result) => ({ ok: true as const, result }),
          (error: unknown) => ({ ok: false as const, error }),
        );
        await waiting(pid);
        expect(await keyCount(j)).toBe("0");
        await absent(j);
        await winner.query(mode === "winner-rollback" ? "ROLLBACK" : "COMMIT");
        finished = true;
        const result = await pending;
        if (mode === "conflict-commit") {
          expect(result.ok).toBe(false);
          if (!result.ok) expect(result.error).toMatchObject({ code: "23505" });
          await absent(attempt);
        } else {
          expect(result.ok).toBe(true);
          if (result.ok)
            expect(result.result.rows[0].receipt).toEqual(
              mode === "winner-rollback"
                ? { ...receipt, transactionId: attempt.transaction.id }
                : receipt,
            );
          if (mode === "winner-rollback") await absent(j);
          else await absent(attempt);
        }
        expect(await keyCount(j)).toBe("1");
      } finally {
        if (!finished) await winner.query("ROLLBACK");
        await winner.end();
        await loser.end();
      }
    },
  );
  it("a failed reservation after journal inserts rolls back everything; explicit retry succeeds", async () => {
    const j = journal();
    await owner.query(
      "CREATE FUNCTION public.synthetic_fail_key() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'Synthetic reservation failure' USING ERRCODE='23514'; END $$",
    );
    await owner.query(
      "CREATE TRIGGER synthetic_fail_key BEFORE INSERT ON public.ledger_idempotency_keys FOR EACH ROW EXECUTE FUNCTION public.synthetic_fail_key()",
    );
    try {
      await expect(direct(j, snapshots(j))).rejects.toMatchObject({
        code: "23514",
      });
      await absent(j);
      expect(await keyCount(j)).toBe("0");
    } finally {
      await owner.query(
        "DROP TRIGGER synthetic_fail_key ON public.ledger_idempotency_keys",
      );
      await owner.query("DROP FUNCTION public.synthetic_fail_key()");
    }
    const next = retry(j);
    expect(
      (await direct(next, snapshots(next))).rows[0].receipt.transactionId,
    ).toBe(next.transaction.id);
    await absent(j);
    expect(await keyCount(j)).toBe("1");
  });
  it("a caller with no retained receipt can recover committed outcome on a fresh connection", async () => {
    const j = journal();
    const first = new pg.Client({ connectionString: appUrl });
    await first.connect();
    try {
      await direct(j, snapshots(j), first);
    } finally {
      await first.end();
    }
    const next = retry(j),
      store = createIdempotentLedgerJournalStore(appUrl);
    try {
      const result = await store.append(next, storageAccounts());
      expect(result).toMatchObject({
        ok: true,
        receipt: { transactionId: j.transaction.id },
      });
      await absent(next);
      expect(await keyCount(j)).toBe("1");
    } finally {
      await store.close();
    }
  });
  it("same key is isolated by source namespace and ledger ID, and case is exact", async () => {
    const j = journal();
    const a = retry(j),
      b = retry(j),
      c = retry(j);
    const source = {
      ...a,
      transaction: {
        ...a.transaction,
        provenance: {
          ...a.transaction.provenance,
          source: {
            ...a.transaction.provenance.source,
            namespace: "synthetic.other",
          },
        },
      },
    };
    const ledgerId = `ldg_${syntheticId(3000001)}`,
      accounts = storageAccounts().map((x) => ({ ...x, ledgerId }));
    const ledger = {
      ...b,
      transaction: { ...b.transaction, ledgerId },
      entries: b.entries.map((e) => ({ ...e, ledgerId })),
    };
    const keyCase = {
      ...c,
      transaction: {
        ...c.transaction,
        idempotencyKey: j.transaction.idempotencyKey.toUpperCase(),
      },
    };
    for (const attempt of [j, source, keyCase])
      expect(
        (await direct(attempt, snapshots(attempt))).rows[0].receipt
          .transactionId,
      ).toBe(attempt.transaction.id);
    expect(
      (await direct(ledger, snapshots(ledger, accounts))).rows[0].receipt
        .transactionId,
    ).toBe(ledger.transaction.id);
    for (const attempt of [j, source, ledger, keyCase])
      expect(await keyCount(attempt)).toBe("1");
  });
  it.each([
    ["status", ["transaction", "status"], "posted"],
    ["effectiveAt", ["transaction", "effectiveAt"], "2026-10-04T10:00:00.000Z"],
    ["recordedAt", ["transaction", "recordedAt"], "2026-10-04T10:01:00.000Z"],
    ["source ID", ["transaction", "provenance", "source", "id"], "other"],
    [
      "event",
      ["transaction", "provenance", "moneyEventIds"],
      [`evt_${syntheticId(2)}`],
    ],
    [
      "evidence",
      ["transaction", "provenance", "evidence", "0", "contentHash"],
      `sha256:${"b".repeat(64)}`,
    ],
  ] as const)("same scope with changed %s rejects", async (_, path, value) => {
    const j = journal();
    await direct(j, snapshots(j));
    const bad = change(retry(j), [...path], value);
    await expect(direct(bad, snapshots(bad))).rejects.toMatchObject({
      code: "23505",
    });
    await absent(bad);
    expect(await keyCount(j)).toBe("1");
  });
  it("account drift and line split/merge both conflict even if arithmetic matches", async () => {
    const j = journal(undefined, ["1250", "1250"]);
    await direct(j, snapshots(j));
    const next = retry(j);
    const drift = storageAccounts().map((a, i) =>
      i === 0 ? { ...a, name: "Changed account" } : a,
    );
    await expect(direct(next, snapshots(next, drift))).rejects.toMatchObject({
      code: "23505",
    });
    await absent(next);
    const merged = journal(j.transaction.idempotencyKey, ["2500"]);
    await expect(direct(merged, snapshots(merged))).rejects.toMatchObject({
      code: "23505",
    });
    await absent(merged);
  });
  it("provenance order is set-like, financial entries/currency context complete", async () => {
    const base = journal();
    const multi = storageJournal(++serial, ["1250", "2500"], ["USD", "EUR"]);
    const j = {
      ...multi,
      transaction: {
        ...multi.transaction,
        idempotencyKey: base.transaction.idempotencyKey,
        provenance: {
          ...multi.transaction.provenance,
          moneyEventIds: [`evt_${syntheticId(2)}`, `evt_${syntheticId(1)}`],
          evidence: [
            ...multi.transaction.provenance.evidence,
            {
              receiptId: `rcpt_${syntheticId(2)}`,
              contentHash: `sha256:${"b".repeat(64)}`,
            },
          ],
        },
      },
    };
    const first = (await direct(j, snapshots(j))).rows[0].receipt;
    const next = retry(j);
    const reordered = {
      ...next,
      entries: [...next.entries].reverse(),
      transaction: {
        ...next.transaction,
        provenance: {
          ...next.transaction.provenance,
          moneyEventIds: [
            ...next.transaction.provenance.moneyEventIds,
          ].reverse(),
          evidence: [...next.transaction.provenance.evidence].reverse(),
        },
      },
    };
    expect(
      (await direct(reordered, snapshots(reordered).reverse())).rows[0].receipt,
    ).toEqual(first);
    await absent(next);
  });
  it.each([
    ["entries", "1", "id", "DUPLICATE"],
    ["entries", "1", "transactionId", "WRONG_TXN"],
    ["entries", "1", "amount", "minorUnits", "1249"],
    ["entries", "1", "amount", "minorUnits", "0"],
    ["entries", "1", "amount", "minorUnits", "01"],
    ["entries", "1", "amount", "minorUnits", "9223372036854775808"],
    ["entries", "1", "amount", "minorUnits", 1250],
    ["entries", "1", "amount", "currency", "EUR"],
    ["entries", "1", "contractVersion", "bad"],
    ["entries", "1", "id", "ent_bad"],
    [
      "transaction",
      "provenance",
      "moneyEventIds",
      [`evt_${syntheticId(1)}`, `evt_${syntheticId(1)}`],
    ],
    ["transaction", "extra", true],
  ])(
    "direct malformed replay attempt %j is refused before original return",
    async (...parts) => {
      const j = journal();
      await direct(j, snapshots(j));
      const next = retry(j),
        value = parts[parts.length - 1];
      const actual =
        value === "DUPLICATE"
          ? next.entries[0]?.id
          : value === "WRONG_TXN"
            ? j.transaction.id
            : value;
      const bad = change(next, parts.slice(0, -1) as string[], actual);
      await expect(direct(bad, snapshots(next))).rejects.toMatchObject({
        code: expect.stringMatching(/^(22|23)/),
      });
      await absent(next);
      expect(await keyCount(j)).toBe("1");
    },
  );
  it("missing, duplicate and unreferenced snapshots refuse replay", async () => {
    const j = journal();
    await direct(j, snapshots(j));
    const next = retry(j);
    for (const a of [
      [],
      [...snapshots(next), ...snapshots(next)],
      snapshots(storageJournal(1, ["1250"], ["USD", "EUR"])),
    ])
      await expect(direct(next, a)).rejects.toMatchObject({ code: "22023" });
    await absent(next);
  });
  it("new invalid journal has no reservation and a corrected explicit retry can reserve it", async () => {
    const j = journal();
    const bad = change(j, ["entries", "1", "amount", "minorUnits"], "1249");
    await expect(direct(bad, snapshots(j))).rejects.toMatchObject({
      code: "23514",
    });
    await absent(j);
    expect(await keyCount(j)).toBe("0");
    expect((await direct(j, snapshots(j))).rows[0].receipt.transactionId).toBe(
      j.transaction.id,
    );
  });
  it("durable entry ID collision rolls back the new scope completely", async () => {
    const a = journal();
    await direct(a, snapshots(a));
    const b = journal(),
      bad = change(b, ["entries", "0", "id"], a.entries[0]?.id);
    await expect(direct(bad, snapshots(b))).rejects.toMatchObject({
      code: "23505",
    });
    await absent(b);
    expect(await keyCount(b)).toBe("0");
    expect((await direct(b, snapshots(b))).rows[0].receipt.transactionId).toBe(
      b.transaction.id,
    );
  });
  it("legacy duplicate-ID refusal stays intact and legacy calls do not reserve/adopt keys", async () => {
    const j = journal(),
      legacy = createLedgerJournalStore(appUrl);
    try {
      await legacy.append(j, storageAccounts());
      await expect(legacy.append(j, storageAccounts())).rejects.toMatchObject({
        outcome: "not_stored",
        sqlState: "23505",
      });
      expect(await keyCount(j)).toBe("0");
      await expect(direct(j, snapshots(j))).rejects.toMatchObject({
        code: "23505",
      });
      expect(await keyCount(j)).toBe("0");
      const next = retry(j);
      expect(
        (await direct(next, snapshots(next))).rows[0].receipt.transactionId,
      ).toBe(next.transaction.id);
    } finally {
      await legacy.close();
    }
  });
  it("repeatable-read callers fail closed before storage", async () => {
    const j = journal();
    await app.query("BEGIN ISOLATION LEVEL REPEATABLE READ");
    try {
      await expect(direct(j, snapshots(j))).rejects.toMatchObject({
        code: "22023",
      });
    } finally {
      await app.query("ROLLBACK");
    }
    await absent(j);
    expect(await keyCount(j)).toBe("0");
  });
  it.each(["INSERT", "UPDATE", "DELETE", "TRUNCATE"])(
    "application cannot directly %s reservations",
    async (operation) => {
      const j = journal();
      await direct(j, snapshots(j));
      const query =
        operation === "INSERT"
          ? "INSERT INTO public.ledger_idempotency_keys SELECT * FROM public.ledger_idempotency_keys"
          : operation === "UPDATE"
            ? "UPDATE public.ledger_idempotency_keys SET idempotency_key=idempotency_key"
            : operation === "DELETE"
              ? "DELETE FROM public.ledger_idempotency_keys"
              : "TRUNCATE public.ledger_idempotency_keys";
      await expect(app.query(query)).rejects.toMatchObject({ code: "42501" });
      expect(await keyCount(j)).toBe("1");
    },
  );
  it("immutable owner triggers, populated down refusal, uniqueness/FK and definer grants are preserved", async () => {
    const j = journal();
    await direct(j, snapshots(j));
    for (const query of [
      "UPDATE public.ledger_idempotency_keys SET idempotency_key=idempotency_key WHERE idempotency_key=$1",
      "DELETE FROM public.ledger_idempotency_keys WHERE idempotency_key=$1",
    ])
      await expect(
        owner.query(query, [j.transaction.idempotencyKey]),
      ).rejects.toMatchObject({ code: "55000" });
    await expect(
      owner.query("TRUNCATE public.ledger_idempotency_keys"),
    ).rejects.toMatchObject({ code: "55000" });
    const migration =
      require("../../../infra/migrations/1780000003000_m04_08_idempotency.cjs") as {
        down: (pgm: {
          sql: (sql: string) => Promise<pg.QueryResult>;
        }) => Promise<pg.QueryResult>;
      };
    await expect(
      migration.down({ sql: (sql) => owner.query(sql) }),
    ).rejects.toThrow("Down refuses idempotency history");
    expect(await keyCount(j)).toBe("1");
    await expect(
      owner.query(
        "INSERT INTO public.ledger_idempotency_keys SELECT * FROM public.ledger_idempotency_keys WHERE idempotency_key=$1",
        [j.transaction.idempotencyKey],
      ),
    ).rejects.toMatchObject({ code: "23505" });
    await expect(
      owner.query(
        "INSERT INTO public.ledger_idempotency_keys SELECT ledger_id,source_namespace,idempotency_key||'.other',$2,payload,jsonb_set(receipt,'{transactionId}',to_jsonb($2::text)) FROM public.ledger_idempotency_keys WHERE idempotency_key=$1",
        [j.transaction.idempotencyKey, `txn_${syntheticId(++serial)}`],
      ),
    ).rejects.toMatchObject({ code: "23503" });
    await expect(
      app.query(
        "SELECT public.ledger_idempotency_payload($1::jsonb,$2::jsonb)",
        [JSON.stringify(j), JSON.stringify(snapshots(j))],
      ),
    ).rejects.toMatchObject({ code: "42501" });
    const f = (
      await owner.query(
        "SELECT p.prosecdef,p.provolatile,p.proconfig,r.rolname FROM pg_proc p JOIN pg_roles r ON r.oid=p.proowner WHERE p.oid='public.append_idempotent_ledger_journal(jsonb,jsonb)'::regprocedure",
      )
    ).rows[0];
    expect(f.prosecdef).toBe(true);
    expect(f.provolatile).toBe("v");
    expect(f.proconfig).toContain("search_path=pg_catalog, pg_temp");
    expect(f.rolname).toBe("causalledger_storage_owner");
    expect(
      (
        await owner.query(
          "SELECT count(*)::text AS count FROM pg_proc p,LATERAL aclexplode(p.proacl) a WHERE p.proname IN ('ledger_idempotency_payload','append_idempotent_ledger_journal') AND a.grantee=0 AND a.privilege_type='EXECUTE'",
        )
      ).rows[0].count,
    ).toBe("0");
  });
});
