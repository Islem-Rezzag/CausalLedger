import pg from "pg";
import { createRequire } from "node:module";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createLedgerReversalStore,
  createLedgerAccountBalanceReader,
  LEDGER_REVERSAL_CONTRACT_VERSION,
  validateLedgerReversalCandidate,
} from "../src/index.js";
import type {
  AccountCandidate,
  LedgerJournalCandidate,
  LedgerReversalCandidate,
} from "../src/index.js";
import {
  storageAccounts,
  storageJournal,
  syntheticId,
} from "./storage-synthetic.js";
import {
  balanceAccounts,
  balanceJournal,
  balanceQuery,
} from "./balance-synthetic.js";
function explicit(name: string, role: string): string {
  const value = process.env[name];
  if (
    !value ||
    process.env.LEDGER_STORAGE_TEST_DATABASE !==
      "causalledger_m04_05_disposable" ||
    process.env.LEDGER_STORAGE_TEST_DISPOSABLE !== "YES_M04_05_SYNTHETIC_ONLY"
  )
    throw new Error(
      "Mandatory owned synthetic17 configuration missing; no skip or ambient fallback.",
    );
  const u = new URL(value);
  if (
    !["postgres:", "postgresql:"].includes(u.protocol) ||
    u.hostname !== "127.0.0.1" ||
    u.pathname !== "/causalledger_m04_05_disposable" ||
    u.username !== role ||
    !u.password ||
    !u.port ||
    u.search ||
    u.hash
  )
    throw new Error("Unrecognized owned synthetic target/role.");
  return value;
}
const ownerUrl = explicit(
    "LEDGER_STORAGE_TEST_OWNER_URL",
    "causalledger_storage_owner",
  ),
  appUrl = explicit("LEDGER_STORAGE_TEST_APP_URL", "causalledger_storage_app");
const owner = new pg.Client({ connectionString: ownerUrl }),
  app = new pg.Client({ connectionString: appUrl });
const require = createRequire(import.meta.url);
let serial = 4000000;
function catalog(): AccountCandidate[] {
  const a = storageAccounts();
  return [
    ...a,
    ...a.map((account, i) => ({
      ...account,
      id: `acct_${syntheticId(i + 4)}`,
      name: "Synthetic reversal counter " + account.currency,
    })),
  ];
}
function original(
  amounts: readonly string[] = ["1250"],
  currencies: readonly ("USD" | "EUR" | "GBP")[] = ["USD"],
): LedgerJournalCandidate {
  const n = ++serial,
    j = storageJournal(n, amounts, currencies);
  return {
    ...j,
    transaction: {
      ...j.transaction,
      status: "posted",
      idempotencyKey: `synthetic.original.${n}`,
    },
    entries: j.entries.map((e) => ({
      ...e,
      accountId:
        e.side === "credit"
          ? `acct_${syntheticId(["USD", "EUR", "GBP"].indexOf(e.amount.currency) + 4)}`
          : e.accountId,
    })),
  };
}
function reversal(j: LedgerJournalCandidate): LedgerReversalCandidate {
  const n = ++serial,
    next = storageJournal(n);
  return {
    contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
    kind: "full",
    originalTransactionId: j.transaction.id,
    journal: {
      ...j,
      transaction: {
        ...j.transaction,
        id: next.transaction.id,
        idempotencyKey: `synthetic.reversal.${n}`,
        provenance: {
          ...j.transaction.provenance,
          source: { namespace: "synthetic.reversal", id: "reverse-1" },
        },
      },
      entries: j.entries.map((e, i) => ({
        ...e,
        id: `ent_${syntheticId(n * 100 + i + 1)}`,
        transactionId: next.transaction.id,
        side: e.side === "debit" ? "credit" : "debit",
      })),
    },
  };
}
function retry(request: LedgerReversalCandidate): LedgerReversalCandidate {
  const n = ++serial,
    id = `txn_${syntheticId(n)}`;
  return {
    ...request,
    journal: {
      ...request.journal,
      transaction: { ...request.journal.transaction, id },
      entries: request.journal.entries.map((e, i) => ({
        ...e,
        id: `ent_${syntheticId(n * 100 + i + 1)}`,
        transactionId: id,
      })),
    },
  };
}
function change<T>(input: T, path: string[], value: unknown): T {
  const result = structuredClone(input);
  let obj = result as Record<string, unknown>;
  for (const key of path.slice(0, -1))
    obj = obj[key] as Record<string, unknown>;
  obj[path.at(-1)!] = value;
  return result;
}
function snapshots(
  j: LedgerJournalCandidate,
  a: readonly AccountCandidate[] = catalog(),
) {
  return a
    .filter((account) => j.entries.some((e) => e.accountId === account.id))
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
async function seed(
  j: LedgerJournalCandidate,
  a: readonly AccountCandidate[] = catalog(),
) {
  await app.query("SELECT public.append_ledger_journal($1::jsonb,$2::jsonb)", [
    JSON.stringify(j),
    JSON.stringify(snapshots(j, a)),
  ]);
}
async function direct(request: unknown, a: unknown, client: pg.Client = app) {
  return client.query(
    "SELECT public.append_ledger_reversal($1::jsonb,$2::jsonb) AS receipt",
    [JSON.stringify(request), JSON.stringify(a)],
  );
}
async function absent(j: LedgerJournalCandidate) {
  expect(
    (
      await owner.query(
        "SELECT (SELECT count(*) FROM public.ledger_transactions WHERE id=$1)::text AS journals,(SELECT count(*) FROM public.ledger_entries WHERE transaction_id=$1)::text AS entries,(SELECT count(*) FROM public.ledger_idempotency_keys WHERE transaction_id=$1)::text AS keys,(SELECT count(*) FROM public.ledger_reversals WHERE reversal_transaction_id=$1)::text AS links",
        [j.transaction.id],
      )
    ).rows[0],
  ).toEqual({ journals: "0", entries: "0", keys: "0", links: "0" });
}
async function history(id: string) {
  return (
    await owner.query(
      "SELECT jsonb_build_object('header',(SELECT to_jsonb(t) FROM public.ledger_transactions t WHERE id=$1),'accounts',(SELECT jsonb_agg(to_jsonb(a) ORDER BY account_id) FROM public.ledger_account_snapshots a WHERE transaction_id=$1),'entries',(SELECT jsonb_agg(to_jsonb(e) ORDER BY id) FROM public.ledger_entries e WHERE transaction_id=$1)) AS value",
      [id],
    )
  ).rows[0].value;
}
async function waitForLock(pid: number) {
  const end = Date.now() + 5000;
  while (Date.now() < end) {
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
  throw new Error("Competitor never waited on advisory lock");
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
describe("mandatory owned real17 full reversals", () => {
  it("stores exact inverted multicurrency/multiline amounts and preserves complete original history", async () => {
    const j = original(
      ["9223372036854775807", "9223372036854775807"],
      ["USD", "EUR", "GBP"],
    );
    await seed(j);
    const before = await history(j.transaction.id),
      request = reversal(j),
      store = createLedgerReversalStore(appUrl);
    try {
      expect(await store.append(request, catalog())).toEqual({
        ok: true,
        receipt: {
          contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
          kind: "full",
          originalTransactionId: j.transaction.id,
          transactionId: request.journal.transaction.id,
          entryCount: 12,
        },
      });
    } finally {
      await store.close();
    }
    expect(await history(j.transaction.id)).toEqual(before);
    const rows = (
      await owner.query(
        "SELECT account_id,side,minor_units::text AS amount,currency FROM public.ledger_entries WHERE transaction_id=$1 ORDER BY id",
        [request.journal.transaction.id],
      )
    ).rows;
    expect(rows).toEqual(
      request.journal.entries.map((e) => ({
        account_id: e.accountId,
        side: e.side,
        amount: e.amount.minorUnits,
        currency: e.amount.currency,
      })),
    );
  });
  it.each(["USD", "EUR", "GBP"] as const)(
    "executable1250 demo cancels both %s account balances at explicit cutoffs",
    async (currency) => {
      const a = balanceAccounts(++serial, "asset", currency),
        j0 = balanceJournal(++serial, a, "1250"),
        j = {
          ...j0,
          transaction: { ...j0.transaction, status: "posted" as const },
        };
      await seed(j, a);
      const reader = createLedgerAccountBalanceReader(appUrl),
        store = createLedgerReversalStore(appUrl);
      try {
        const before = await reader.query(balanceQuery(a[0]));
        expect(before.ok && before.value.balanceMinorUnits).toBe(1250n);
        expect((await store.append(reversal(j), a)).ok).toBe(true);
        for (const account of a) {
          const result = await reader.query(balanceQuery(account));
          expect(result.ok).toBe(true);
          if (result.ok) {
            expect(result.value.balanceMinorUnits).toBe(0n);
            expect(result.value.transactionCount).toBe(2n);
            expect(result.value.debitMinorUnits).toBe(1250n);
            expect(result.value.creditMinorUnits).toBe(1250n);
          }
        }
      } finally {
        await store.close();
        await reader.close();
      }
    },
  );
  it("semantic retry with new IDs/reordered entries returns the same linked receipt on a fresh connection", async () => {
    const j = original(["1250", "1250"]);
    await seed(j);
    const request = reversal(j);
    const first = (await direct(request, snapshots(request.journal))).rows[0]
      .receipt;
    const next = retry(request),
      store = createLedgerReversalStore(appUrl);
    try {
      expect(
        await store.append(
          {
            ...next,
            journal: {
              ...next.journal,
              entries: [...next.journal.entries].reverse(),
            },
          },
          [...catalog()].reverse(),
        ),
      ).toEqual({ ok: true, receipt: first });
      await absent(next.journal);
    } finally {
      await store.close();
    }
  });
  it("pure identity equals persisted08 canonical payload with shuffled refs, duplicate lines and lone UTF16 names", async () => {
    const a = catalog().map((x) => ({ ...x, name: "Synthetic \ud800" }));
    let j = original(["1250", "1250"]);
    j = change(
      j,
      ["transaction", "provenance", "moneyEventIds"],
      [`evt_${syntheticId(1)}`, `evt_${syntheticId(2)}`],
    );
    await seed(j, a);
    let request = reversal(j);
    request = change(
      request,
      ["journal", "transaction", "provenance", "moneyEventIds"],
      [`evt_${syntheticId(2)}`, `evt_${syntheticId(1)}`],
    );
    request = {
      ...request,
      journal: {
        ...request.journal,
        entries: [...request.journal.entries].reverse(),
      },
    };
    const pure = validateLedgerReversalCandidate(
      request,
      j,
      a,
      [...a].reverse(),
    );
    expect(pure.ok).toBe(true);
    await direct(request, snapshots(request.journal, a));
    const persisted = (
      await owner.query(
        "SELECT payload FROM public.ledger_idempotency_keys WHERE transaction_id=$1",
        [request.journal.transaction.id],
      )
    ).rows[0].payload;
    if (pure.ok)
      expect(JSON.parse(pure.value.canonicalPayload).journal).toEqual(
        persisted,
      );
  });
  it.each(["pending", "reversed", "voided"])(
    "refuses original status %s without candidate writes",
    async (status) => {
      const j = change(original(), ["transaction", "status"], status);
      await seed(j);
      const request = change(
        reversal(j),
        ["journal", "transaction", "status"],
        "posted",
      );
      await expect(
        direct(request, snapshots(request.journal)),
      ).rejects.toMatchObject({ code: "23514" });
      await absent(request.journal);
    },
  );
  it("refuses a missing original and cross-ledger original", async () => {
    const j = original(),
      request = reversal(j);
    await expect(
      direct(request, snapshots(request.journal)),
    ).rejects.toMatchObject({ code: "23514" });
    await absent(request.journal);
    const a = catalog().map((x) => ({
      ...x,
      ledgerId: `ldg_${syntheticId(++serial)}`,
    }));
    const other = {
      ...j,
      transaction: { ...j.transaction, ledgerId: a[0]!.ledgerId },
      entries: j.entries.map((e) => ({ ...e, ledgerId: a[0]!.ledgerId })),
    };
    // Give every account the same explicit new ledger.
    const fixed = a.map((x) => ({ ...x, ledgerId: a[0]!.ledgerId }));
    await seed(other, fixed);
    await expect(
      direct(request, snapshots(request.journal)),
    ).rejects.toMatchObject({ code: "23514" });
    await absent(request.journal);
  });
  it.each([
    { path: ["kind"], value: "partial", code: "22023" },
    { path: ["contractVersion"], value: "other", code: "22023" },
    {
      path: ["journal", "transaction", "status"],
      value: "pending",
      code: "23514",
    },
    {
      path: [
        "journal",
        "transaction",
        "provenance",
        "evidence",
        "0",
        "contentHash",
      ],
      value: `sha256:${"b".repeat(64)}`,
      code: "23514",
    },
  ])(
    "refuses direct SQL malformed/policy/provenance $path",
    async ({ path, value, code }) => {
      const j = original();
      await seed(j);
      const request = change(reversal(j), path, value);
      await expect(
        direct(request, snapshots(request.journal)),
      ).rejects.toMatchObject({ code });
      await absent(request.journal);
    },
  );
  it.each(["1251", "625"])(
    "refuses balanced changed/partial amount %s",
    async (amount) => {
      const j = original();
      await seed(j);
      const request = reversal(j),
        bad = {
          ...request,
          journal: {
            ...request.journal,
            entries: request.journal.entries.map((e) => ({
              ...e,
              amount: { ...e.amount, minorUnits: amount },
            })),
          },
        };
      await expect(direct(bad, snapshots(bad.journal))).rejects.toMatchObject({
        code: "23514",
      });
      await absent(bad.journal);
    },
  );
  it("refuses multiplicity-changing split lines with equal net totals", async () => {
    const j = original();
    await seed(j);
    const request = reversal(j),
      bad = {
        ...request,
        journal: {
          ...request.journal,
          entries: request.journal.entries.flatMap((e, i) =>
            [0, 1].map((k) => ({
              ...e,
              id: `ent_${syntheticId(++serial * 100 + i * 2 + k)}`,
              amount: { ...e.amount, minorUnits: "625" },
            })),
          ),
        },
      };
    await expect(direct(bad, snapshots(bad.journal))).rejects.toMatchObject({
      code: "23514",
    });
    await absent(bad.journal);
  });
  it("refuses account/currency drift even when balanced", async () => {
    const j = original();
    await seed(j);
    const request = reversal(j),
      bad = {
        ...request,
        journal: {
          ...request.journal,
          entries: request.journal.entries.map((e) => ({
            ...e,
            accountId: `acct_${syntheticId(2)}`,
            amount: { ...e.amount, currency: "EUR" as const },
          })),
        },
      };
    await expect(direct(bad, snapshots(bad.journal))).rejects.toMatchObject({
      code: "23514",
    });
    await absent(bad.journal);
  });
  it("refuses referenced Account snapshot drift", async () => {
    const j = original();
    await seed(j);
    const request = reversal(j),
      a = catalog().map((x) => ({ ...x, name: "changed" }));
    await expect(
      direct(request, snapshots(request.journal, a)),
    ).rejects.toMatchObject({ code: "23514" });
    await absent(request.journal);
  });
  it("duplicate original entry IDs refuse atomically without a journal/key/link", async () => {
    const j = original();
    await seed(j);
    const request = change(
      reversal(j),
      ["journal", "entries", "0", "id"],
      j.entries[0]!.id,
    );
    await expect(
      direct(request, snapshots(request.journal)),
    ).rejects.toMatchObject({ code: "23505" });
    await absent(request.journal);
  });
  it("retains required events and allows extra unique evidence, rejecting omitted originals", async () => {
    const j = change(
      original(),
      ["transaction", "provenance", "moneyEventIds"],
      [`evt_${syntheticId(1)}`],
    );
    await seed(j);
    const request = reversal(j),
      bad = change(
        request,
        ["journal", "transaction", "provenance", "moneyEventIds"],
        [],
      );
    await expect(direct(bad, snapshots(bad.journal))).rejects.toMatchObject({
      code: "23514",
    });
    await absent(bad.journal);
    const extra = change(
      request,
      ["journal", "transaction", "provenance", "evidence"],
      [
        ...j.transaction.provenance.evidence,
        {
          receiptId: `rcpt_${syntheticId(2)}`,
          contentHash: `sha256:${"b".repeat(64)}`,
        },
      ],
    );
    expect(
      (await direct(extra, snapshots(extra.journal))).rows[0].receipt
        .originalTransactionId,
    ).toBe(j.transaction.id);
  });
  it("refuses second keys and reversal-of-reversal while leaving original and first reversal intact", async () => {
    const j = original();
    await seed(j);
    const first = reversal(j);
    await direct(first, snapshots(first.journal));
    const next = reversal(j);
    await expect(direct(next, snapshots(next.journal))).rejects.toMatchObject({
      code: "23505",
    });
    await absent(next.journal);
    const again = reversal(first.journal);
    await expect(direct(again, snapshots(again.journal))).rejects.toMatchObject(
      { code: "23514" },
    );
    await absent(again.journal);
  });
  it("refuses same-key changed clock and same-key other original even when08 payload matches", async () => {
    const j = original();
    await seed(j);
    const first = reversal(j);
    await direct(first, snapshots(first.journal));
    const changed = change(
      retry(first),
      ["journal", "transaction", "recordedAt"],
      "2026-10-03T00:00:00.000Z",
    );
    await expect(
      direct(changed, snapshots(changed.journal)),
    ).rejects.toMatchObject({ code: "23505" });
    await absent(changed.journal);
    const other = original();
    await seed(other);
    const next = {
      ...retry(first),
      originalTransactionId: other.transaction.id,
    };
    await expect(direct(next, snapshots(next.journal))).rejects.toMatchObject({
      code: "23505",
    });
    await absent(next.journal);
  });
  it("never adopts a pre-existing ordinary08 key, even for an identical net-zero inverse multiset", async () => {
    const j0 = original(),
      j = {
        ...j0,
        entries: j0.entries.map((e) => ({
          ...e,
          accountId: `acct_${syntheticId(1)}`,
        })),
      };
    await seed(j);
    const request = reversal(j);
    await app.query(
      "SELECT public.append_idempotent_ledger_journal($1::jsonb,$2::jsonb)",
      [
        JSON.stringify(request.journal),
        JSON.stringify(snapshots(request.journal)),
      ],
    );
    const next = retry(request);
    await expect(direct(next, snapshots(next.journal))).rejects.toMatchObject({
      code: "23505",
    });
    await absent(next.journal);
    expect(
      (
        await owner.query(
          "SELECT count(*)::text AS count FROM public.ledger_reversals WHERE original_transaction_id=$1",
          [j.transaction.id],
        )
      ).rows[0].count,
    ).toBe("0");
  });
  it.each(["duplicate", "different-key", "other-original"])(
    "concurrent %s requests serialize and commit at most one matching reversal",
    async (kind) => {
      const j = original();
      await seed(j);
      const first = reversal(j);
      let next = kind === "different-key" ? reversal(j) : retry(first);
      if (kind === "other-original") {
        const other = original();
        await seed(other);
        next = { ...next, originalTransactionId: other.transaction.id };
      }
      const winner = new pg.Client({ connectionString: appUrl }),
        loser = new pg.Client({ connectionString: appUrl });
      await winner.connect();
      await loser.connect();
      try {
        await winner.query("BEGIN");
        const committed = (
          await direct(first, snapshots(first.journal), winner)
        ).rows[0].receipt;
        const pid = (await loser.query("SELECT pg_backend_pid() AS pid"))
          .rows[0].pid;
        const pending = direct(next, snapshots(next.journal), loser).then(
          (result) => ({ ok: true as const, result }),
          (error) => ({ ok: false as const, error: error as { code: string } }),
        );
        await waitForLock(pid);
        await winner.query("COMMIT");
        const result = await pending;
        if (kind === "duplicate") {
          expect(result.ok).toBe(true);
          if (result.ok)
            expect(result.result.rows[0].receipt).toEqual(committed);
        } else {
          expect(result.ok).toBe(false);
          if (!result.ok) expect(result.error.code).toBe("23505");
        }
        await absent(next.journal);
      } finally {
        await winner.query("ROLLBACK");
        await winner.end();
        await loser.end();
      }
    },
  );
  it.each(["commit", "rollback"])(
    "ordinary08 %s race uses the same key lock and refuses adoption or safely proceeds",
    async (decision) => {
      const j = original();
      await seed(j);
      const request = reversal(j),
        next = retry(request),
        ordinary = new pg.Client({ connectionString: appUrl }),
        competitor = new pg.Client({ connectionString: appUrl });
      await ordinary.connect();
      await competitor.connect();
      try {
        await ordinary.query("BEGIN");
        await ordinary.query(
          "SELECT public.append_idempotent_ledger_journal($1::jsonb,$2::jsonb)",
          [
            JSON.stringify(request.journal),
            JSON.stringify(snapshots(request.journal)),
          ],
        );
        const pid = (await competitor.query("SELECT pg_backend_pid() AS pid"))
          .rows[0].pid;
        const pending = direct(next, snapshots(next.journal), competitor).then(
          (result) => ({ ok: true as const, result }),
          (error) => ({ ok: false as const, error: error as { code: string } }),
        );
        await waitForLock(pid);
        await ordinary.query(decision === "commit" ? "COMMIT" : "ROLLBACK");
        const result = await pending;
        if (decision === "commit") {
          expect(result.ok).toBe(false);
          if (!result.ok) expect(result.error.code).toBe("23505");
          await absent(next.journal);
        } else {
          expect(result.ok).toBe(true);
          if (result.ok)
            expect(result.result.rows[0].receipt.transactionId).toBe(
              next.journal.transaction.id,
            );
          await absent(request.journal);
        }
      } finally {
        await ordinary.query("ROLLBACK");
        await ordinary.end();
        await competitor.end();
      }
    },
  );
  it("injected link-insert failure rolls back journal/key/link and explicit retry succeeds", async () => {
    const j = original();
    await seed(j);
    const request = reversal(j);
    await owner.query(
      "CREATE FUNCTION public.synthetic_fail_reversal() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'Synthetic failure' USING ERRCODE='23514'; END $$",
    );
    await owner.query(
      "CREATE TRIGGER synthetic_fail_reversal BEFORE INSERT ON public.ledger_reversals FOR EACH ROW EXECUTE FUNCTION public.synthetic_fail_reversal()",
    );
    try {
      await expect(
        direct(request, snapshots(request.journal)),
      ).rejects.toMatchObject({ code: "23514" });
      await absent(request.journal);
    } finally {
      await owner.query(
        "DROP TRIGGER synthetic_fail_reversal ON public.ledger_reversals",
      );
      await owner.query("DROP FUNCTION public.synthetic_fail_reversal()");
    }
    const next = retry(request);
    expect(
      (await direct(next, snapshots(next.journal))).rows[0].receipt
        .transactionId,
    ).toBe(next.journal.transaction.id);
  });
  it("an outer explicit rollback leaves no new outcome and later retry succeeds", async () => {
    const j = original();
    await seed(j);
    const request = reversal(j);
    await app.query("BEGIN");
    try {
      await direct(request, snapshots(request.journal));
    } finally {
      await app.query("ROLLBACK");
    }
    await absent(request.journal);
    expect(
      (await direct(request, snapshots(request.journal))).rows[0].receipt
        .transactionId,
    ).toBe(request.journal.transaction.id);
  });
  it.each(["REPEATABLE READ", "SERIALIZABLE"])(
    "refuses unsafe isolation %s before persistence",
    async (isolation) => {
      const j = original();
      await seed(j);
      const request = reversal(j);
      await app.query("BEGIN ISOLATION LEVEL " + isolation);
      try {
        await expect(
          direct(request, snapshots(request.journal)),
        ).rejects.toMatchObject({ code: "22023" });
      } finally {
        await app.query("ROLLBACK");
      }
      await absent(request.journal);
    },
  );
  it.each(["INSERT", "UPDATE", "DELETE", "TRUNCATE"])(
    "app cannot directly %s links",
    async (operation) => {
      const sql =
        operation === "INSERT"
          ? "INSERT INTO public.ledger_reversals SELECT * FROM public.ledger_reversals"
          : operation === "UPDATE"
            ? "UPDATE public.ledger_reversals SET kind=kind"
            : operation === "DELETE"
              ? "DELETE FROM public.ledger_reversals"
              : "TRUNCATE public.ledger_reversals";
      await expect(app.query(sql)).rejects.toMatchObject({ code: "42501" });
    },
  );
  it("owner immutability/down guards and exact grants remain enforced", async () => {
    const j = original();
    await seed(j);
    const request = reversal(j);
    await direct(request, snapshots(request.journal));
    for (const sql of [
      "UPDATE public.ledger_reversals SET kind=kind WHERE original_transaction_id=$1",
      "DELETE FROM public.ledger_reversals WHERE original_transaction_id=$1",
    ])
      await expect(owner.query(sql, [j.transaction.id])).rejects.toMatchObject({
        code: "55000",
      });
    await expect(
      owner.query("TRUNCATE public.ledger_reversals"),
    ).rejects.toMatchObject({ code: "55000" });
    const migration =
      require("../../../infra/migrations/1780000004000_m04_09_reversal.cjs") as {
        down: (pgm: {
          sql: (sql: string) => Promise<pg.QueryResult>;
        }) => Promise<pg.QueryResult>;
      };
    await expect(
      migration.down({ sql: (sql) => owner.query(sql) }),
    ).rejects.toThrow("Down refuses reversal history");
    await expect(
      migration.down({ sql: (sql) => app.query(sql) }),
    ).rejects.toThrow("Down refuses reversal history or wrong owner");
    const f = (
      await owner.query(
        "SELECT p.prosecdef,p.provolatile,p.proconfig,r.rolname FROM pg_proc p JOIN pg_roles r ON r.oid=p.proowner WHERE p.oid='public.append_ledger_reversal(jsonb,jsonb)'::regprocedure",
      )
    ).rows[0];
    expect(f.prosecdef).toBe(true);
    expect(f.provolatile).toBe("v");
    expect(f.proconfig).toContain("search_path=pg_catalog, pg_temp");
    expect(f.rolname).toBe("causalledger_storage_owner");
    expect(
      (
        await owner.query(
          "SELECT count(*)::text AS count FROM pg_proc p,LATERAL aclexplode(p.proacl) a WHERE p.proname='append_ledger_reversal' AND a.grantee=0 AND a.privilege_type='EXECUTE'",
        )
      ).rows[0].count,
    ).toBe("0");
  });
  it("database constraints reject missing original/reversal, self-links and duplicate original/reversal IDs", async () => {
    const j = original();
    await seed(j);
    const request = reversal(j);
    await direct(request, snapshots(request.journal));
    await expect(
      owner.query(
        "INSERT INTO public.ledger_reversals SELECT * FROM public.ledger_reversals WHERE original_transaction_id=$1",
        [j.transaction.id],
      ),
    ).rejects.toMatchObject({ code: "23505" });
    const other = original();
    await seed(other);
    for (const [orig, rev, code] of [
      [`txn_${syntheticId(++serial)}`, other.transaction.id, "23503"],
      [other.transaction.id, `txn_${syntheticId(++serial)}`, "23503"],
      [other.transaction.id, other.transaction.id, "23514"],
      [other.transaction.id, request.journal.transaction.id, "23505"],
    ])
      await expect(
        owner.query(
          "INSERT INTO public.ledger_reversals VALUES($1,$2,$3,'m04.09-ledger-reversal.v1','full')",
          [orig, rev, j.transaction.ledgerId],
        ),
      ).rejects.toMatchObject({ code });
  });
});
