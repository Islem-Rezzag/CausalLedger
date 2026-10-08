import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createIdempotentLedgerJournalStore,
  createLedgerJournalStore,
  createLedgerTransactionReader,
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
} from "../src/index.js";
import type {
  IdempotentLedgerJournalStore,
  LedgerJournalStore,
  LedgerTransactionReader,
} from "../src/index.js";
import {
  INVALID_CASES,
  declarations,
  fixture,
  mutate,
  snapshots,
} from "./invalid-posting-corpus.js";
import type { Fixture } from "./invalid-posting-corpus.js";
import { syntheticId } from "./storage-synthetic.js";

function explicitUrl(name: string, role: string): string {
  const value = process.env[name];
  if (
    !value ||
    process.env.LEDGER_STORAGE_TEST_DISPOSABLE !==
      "YES_M04_05_SYNTHETIC_ONLY" ||
    process.env.LEDGER_STORAGE_TEST_DATABASE !==
      "causalledger_m04_05_disposable"
  )
    throw new Error(
      "Mandatory explicitly owned PostgreSQL17 configuration absent; no skip or ambient fallback.",
    );
  const u = new URL(value);
  if (
    !["postgres:", "postgresql:"].includes(u.protocol) ||
    u.hostname !== "127.0.0.1" ||
    u.pathname !== "/causalledger_m04_05_disposable" ||
    u.username !== role ||
    !u.password ||
    !/^[1-9][0-9]{0,4}$/.test(u.port) ||
    Number(u.port) > 65535 ||
    u.search ||
    u.hash
  )
    throw new Error("Refusing unrecognized disposable target or role.");
  return value;
}
const ownerUrl = explicitUrl(
  "LEDGER_STORAGE_TEST_OWNER_URL",
  "causalledger_storage_owner",
);
const appUrl = explicitUrl(
  "LEDGER_STORAGE_TEST_APP_URL",
  "causalledger_storage_app",
);
const owner = new pg.Client({ connectionString: ownerUrl }),
  app = new pg.Client({ connectionString: appUrl });
let store: LedgerJournalStore,
  idempotent: IdempotentLedgerJournalStore,
  reader: LedgerTransactionReader;
const TABLES = [
  ["ledger_transactions", "id", "id"],
  ["ledger_account_snapshots", "transaction_id", "transaction_id,account_id"],
  ["ledger_entries", "transaction_id", "id"],
  [
    "ledger_idempotency_keys",
    "transaction_id",
    "ledger_id,source_namespace,idempotency_key",
  ],
  ["ledger_reversals", "original_transaction_id", "original_transaction_id"],
] as const;
async function history(
  excluded: string[] = [],
): Promise<Record<string, string>> {
  const sql =
    "SELECT " +
    TABLES.map(
      ([table, id, order]) =>
        `(SELECT COALESCE(jsonb_agg(to_jsonb(t) ORDER BY ${order
          .split(",")
          .map((k) => `t.${k} COLLATE "C"`)
          .join(
            ",",
          )}), '[]'::jsonb)::text FROM public.${table} t WHERE NOT(t.${id}=ANY($1::text[]))) AS ${table}`,
    ).join(",");
  const result = (await owner.query(sql, [excluded])).rows[0] as Record<
    string,
    string
  >;
  for (const [table] of TABLES) expect(result[table]).toBeTypeOf("string");
  return result;
}
async function direct(
  client: pg.Client,
  f: Fixture,
  routine: "05" | "08" = "05",
) {
  const name =
    routine === "05"
      ? "append_ledger_journal"
      : "append_idempotent_ledger_journal";
  return client.query(`SELECT public.${name}($1::jsonb,$2::jsonb) AS receipt`, [
    JSON.stringify(f.journal),
    JSON.stringify(snapshots(f)),
  ]);
}
async function absent(f: Fixture): Promise<void> {
  const id = declarations(f).journal.transaction.id;
  const result = (
    await owner.query(
      "SELECT (SELECT count(*) FROM public.ledger_transactions WHERE id=$1)::text AS headers,(SELECT count(*) FROM public.ledger_account_snapshots WHERE transaction_id=$1)::text AS snapshots,(SELECT count(*) FROM public.ledger_entries WHERE transaction_id=$1)::text AS entries,(SELECT count(*) FROM public.ledger_idempotency_keys WHERE transaction_id=$1)::text AS keys,(SELECT count(*) FROM public.ledger_reversals WHERE original_transaction_id=$1 OR reversal_transaction_id=$1)::text AS reversals",
      [id],
    )
  ).rows[0];
  expect(result).toEqual({
    headers: "0",
    snapshots: "0",
    entries: "0",
    keys: "0",
    reversals: "0",
  });
}
async function readback(f: Fixture): Promise<void> {
  const { journal, accounts } = declarations(f);
  const result = await reader.query({
    contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
    ledgerId: journal.transaction.ledgerId,
    selection: {
      kind: "transaction_id",
      transactionId: journal.transaction.id,
    },
    cutoffs: {
      effectiveThrough: "9999-12-31T23:59:59.999Z",
      recordedThrough: "9999-12-31T23:59:59.999Z",
    },
  });
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error("Stored winner readback refused");
  expect(result.value.statusScope).toBe("all_stored_headers");
  const rows = result.value.transactions;
  expect(rows).toHaveLength(1);
  expect(rows[0]!.journal).toEqual({
    ...journal,
    entries: journal.entries.map((e) => ({
      ...e,
      amount: { ...e.amount, minorUnits: BigInt(e.amount.minorUnits) },
    })),
    totals: [
      {
        currency: journal.entries[0]!.amount.currency,
        debitMinorUnits: 1250n,
        creditMinorUnits: 1250n,
      },
    ],
  });
  expect(rows[0]!.accounts).toEqual(
    accounts.filter((a) => journal.entries.some((e) => e.accountId === a.id)),
  );
}
async function connect(): Promise<pg.Client> {
  const c = new pg.Client({ connectionString: appUrl });
  await c.connect();
  return c;
}
async function waiting(
  pid: number,
  kind: "advisory" | "transactionid",
): Promise<void> {
  const deadline = Date.now() + 4000;
  while (Date.now() < deadline) {
    const result = await owner.query(
      "SELECT 1 FROM pg_locks WHERE pid=$1 AND locktype=$2 AND NOT granted",
      [pid, kind],
    );
    if (result.rowCount! > 0) return;
  }
  throw new Error(
    "No observed blocked competitor; elapsed time alone is not evidence.",
  );
}
function retry(f: Fixture, n: number): Fixture {
  const copy = structuredClone(f),
    { journal } = declarations(copy),
    id = `txn_${syntheticId(12_000_000 + n)}`;
  copy.journal = {
    ...journal,
    transaction: { ...journal.transaction, id },
    entries: journal.entries.map((e, i) => ({
      ...e,
      id: `ent_${syntheticId((12_000_000 + n) * 100 + i + 1)}`,
      transactionId: id,
    })),
  };
  return copy;
}
beforeAll(async () => {
  await owner.connect();
  await app.connect();
  const target = (
    await owner.query(
      "SELECT current_database() AS db,current_user AS role,current_setting('server_version_num')::integer AS version",
    )
  ).rows[0];
  expect(target.db).toBe("causalledger_m04_05_disposable");
  expect(target.role).toBe("causalledger_storage_owner");
  expect(target.version).toBeGreaterThanOrEqual(170000);
  expect(target.version).toBeLessThan(180000);
  expect((await app.query("SELECT current_user AS role")).rows[0].role).toBe(
    "causalledger_storage_app",
  );
  store = createLedgerJournalStore(appUrl);
  idempotent = createIdempotentLedgerJournalStore(appUrl);
  reader = createLedgerTransactionReader(appUrl);
  const seed = fixture(9000);
  expect((await idempotent.append(seed.journal, seed.accounts)).ok).toBe(true);
  await readback(seed);
});
afterAll(async () => {
  await Promise.allSettled([
    store?.close(),
    idempotent?.close(),
    reader?.close(),
    app.end(),
    owner.end(),
  ]);
});

describe("M04.16 mandatory PostgreSQL17 invalid-posting no-write/rollback/concurrency corpus", () => {
  for (const currency of ["USD", "EUR", "GBP"] as const)
    for (const routine of ["05", "08"] as const) {
      it.each(INVALID_CASES)(
        `${currency} routine${routine}: $name, exact server refusal and unchanged complete history`,
        async (row) => {
          const number =
            1000 +
            INVALID_CASES.indexOf(row) +
            (routine === "08" ? 100 : 0) +
            ["USD", "EUR", "GBP"].indexOf(currency) * 200;
          const input = mutate(row, number, currency),
            original = fixture(number, currency),
            preserved = structuredClone(input),
            before = await history();
          await expect(direct(app, input, routine)).rejects.toMatchObject({
            code: routine === "05" ? row.sql05 : row.sql08,
          });
          expect(input).toEqual(preserved);
          expect(await history()).toEqual(before);
          await absent(original);
        },
      );
    }
  it("both public stores refuse the complete invalid corpus without rows or receipts", async () => {
    const before = await history();
    for (const row of INVALID_CASES) {
      const n = 3000 + INVALID_CASES.indexOf(row),
        f = mutate(row, n);
      for (const api of [store, idempotent]) {
        const result = await api.append(f.journal, f.accounts);
        expect(result.ok).toBe(false);
        expect(result).not.toHaveProperty("receipt");
      }
      await absent(fixture(n));
    }
    expect(await history()).toEqual(before);
  });
  for (const [table, , order] of TABLES) {
    for (const operation of [
      "INSERT",
      "UPDATE",
      "DELETE",
      "TRUNCATE",
    ] as const) {
      it(`application ${operation} ${table} refuses with42501 and preserves all history`, async () => {
        const before = await history(),
          column = order.split(",")[0]!;
        const sql =
          operation === "INSERT"
            ? `INSERT INTO public.${table} SELECT * FROM public.${table} WHERE false`
            : operation === "UPDATE"
              ? `UPDATE public.${table} SET ${column}=${column}`
              : operation === "DELETE"
                ? `DELETE FROM public.${table}`
                : `TRUNCATE public.${table}`;
        await expect(app.query(sql)).rejects.toMatchObject({ code: "42501" });
        expect(await history()).toEqual(before);
      });
    }
    for (const operation of ["UPDATE", "DELETE"] as const)
      it(`owner ${operation} existing ${table} refuses immutable history with55000`, async () => {
        const before = await history(),
          column = order.split(",")[0]!;
        expect(
          Number(
            (
              await owner.query(
                `SELECT count(*)::text AS n FROM public.${table}`,
              )
            ).rows[0].n,
          ),
        ).toBeGreaterThan(0);
        await expect(
          owner.query(
            operation === "UPDATE"
              ? `UPDATE public.${table} SET ${column}=${column}`
              : `DELETE FROM public.${table}`,
          ),
        ).rejects.toMatchObject({ code: "55000" });
        expect(await history()).toEqual(before);
      });
  }
  it.each(["header", "payload", "owner-role"])(
    "restricted %s refuses42501 without mutation",
    async (action) => {
      const before = await history(),
        f = fixture(3100);
      const request =
        action === "header"
          ? app.query("SELECT public.ledger_header($1::jsonb)", [
              JSON.stringify(declarations(f).journal.transaction),
            ])
          : action === "payload"
            ? app.query(
                "SELECT public.ledger_idempotency_payload($1::jsonb,$2::jsonb)",
                [JSON.stringify(f.journal), JSON.stringify(snapshots(f))],
              )
            : app.query("SET ROLE causalledger_storage_owner");
      await expect(request).rejects.toMatchObject({ code: "42501" });
      expect(await history()).toEqual(before);
    },
  );
  it.each(["05", "08"] as const)(
    "routine%s rolls back fresh header/snapshots/first line before late stored-ID conflict",
    async (routine) => {
      const existing = declarations(fixture(9000)).journal,
        f = fixture(routine === "05" ? 3200 : 3201),
        j = declarations(f).journal;
      f.journal = {
        ...j,
        entries: j.entries.map((e, i) =>
          i === 3 ? { ...e, id: existing.entries[0]!.id } : e,
        ),
      };
      const before = await history();
      await expect(direct(app, f, routine)).rejects.toMatchObject({
        code: "23505",
      });
      expect(await history()).toEqual(before);
      await absent(f);
    },
  );
  it.each(["05", "08"] as const)(
    "routine%s staged append remains invisible and subsequent22012 abort rolls back all rows/key",
    async (routine) => {
      const c = await connect(),
        f = fixture(routine === "05" ? 3300 : 3301),
        before = await history();
      try {
        await c.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        await direct(c, f, routine);
        await absent(f);
        expect(await history()).toEqual(before);
        await expect(c.query("SELECT 1/0")).rejects.toMatchObject({
          code: "22012",
        });
        await expect(c.query("SELECT 1")).rejects.toMatchObject({
          code: "25P02",
        });
        await c.query("ROLLBACK");
        await absent(f);
        expect(await history()).toEqual(before);
      } finally {
        await c.query("ROLLBACK");
        await c.end();
      }
    },
  );
  it.each([
    "duplicate-commit",
    "key-conflict-commit",
    "timeout-rollback",
  ] as const)(
    "observed concurrent %s rejects loser without any partial mutation",
    async (mode) => {
      const win = await connect(),
        lose = await connect();
      const n =
        3400 +
        ["duplicate-commit", "key-conflict-commit", "timeout-rollback"].indexOf(
          mode,
        ) *
          10;
      const winner = fixture(n),
        loser = retry(winner, n + 1),
        j = declarations(loser).journal;
      if (mode !== "key-conflict-commit")
        loser.journal = {
          ...j,
          transaction: {
            ...j.transaction,
            id: declarations(winner).journal.transaction.id,
          },
          entries: j.entries.map((e) => ({
            ...e,
            transactionId: declarations(winner).journal.transaction.id,
          })),
        };
      else
        loser.journal = {
          ...j,
          entries: j.entries.map((e, i) =>
            i < 2 ? { ...e, amount: { ...e.amount, minorUnits: "1001" } } : e,
          ),
        };
      const before = await history();
      let pending: Promise<{ ok: boolean; code: string | null }> | undefined;
      try {
        await win.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        await direct(win, winner, mode === "key-conflict-commit" ? "08" : "05");
        expect(await history()).toEqual(before);
        await absent(winner);
        const pid = Number(
          (await lose.query("SELECT pg_backend_pid() AS pid")).rows[0].pid,
        );
        await lose.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        await lose.query("SET LOCAL statement_timeout='10000ms'");
        if (mode === "timeout-rollback")
          await lose.query("SET LOCAL lock_timeout='5000ms'");
        pending = direct(
          lose,
          loser,
          mode === "key-conflict-commit" ? "08" : "05",
        ).then(
          () => ({ ok: true, code: null }),
          (error) => ({ ok: false, code: String(error.code) }),
        );
        await waiting(
          pid,
          mode === "key-conflict-commit" ? "advisory" : "transactionid",
        );
        if (mode === "timeout-rollback") {
          expect(await pending).toEqual({ ok: false, code: "55P03" });
          await lose.query("ROLLBACK");
          await win.query("ROLLBACK");
          await absent(winner);
          expect(await history()).toEqual(before);
        } else {
          await win.query("COMMIT");
          expect(await pending).toEqual({ ok: false, code: "23505" });
          await lose.query("ROLLBACK");
          await readback(winner);
          const after = await history();
          expect(await history()).toEqual(after);
          expect(
            await history([declarations(winner).journal.transaction.id]),
          ).toEqual(before);
          const attemptEntries = declarations(loser).journal.entries.map(
            (e) => e.id,
          );
          expect(
            (
              await owner.query(
                "SELECT count(*)::text AS n FROM public.ledger_entries WHERE id=ANY($1::text[])",
                [attemptEntries],
              )
            ).rows[0].n,
          ).toBe("0");
          if (mode === "key-conflict-commit") await absent(loser);
        }
      } finally {
        await win.query("ROLLBACK");
        if (pending) await pending;
        await lose.query("ROLLBACK");
        await Promise.all([win.end(), lose.end()]);
      }
    },
    15000,
  );
});
