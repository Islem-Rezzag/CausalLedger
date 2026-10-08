import pg from "pg";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import {
  createLedgerReversalStore,
  createIdempotentLedgerJournalStore,
  createLedgerJournalStore,
  createLedgerTransactionReader,
  createLedgerAccountBalanceReader,
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
} from "../src/index.js";
import type {
  LedgerReversalCandidate,
  LedgerReversalReceipt,
} from "../src/index.js";
import { CURRENCIES, checkRole } from "./balanced-posting-corpus.js";
import { balanceQuery } from "./balance-synthetic.js";
import {
  REVERSAL_CASES,
  REVERSAL_ROLES,
  fixture,
  multiFixture,
  inverse,
  retry,
  changed,
  snapshots,
  POLICY_CASES,
} from "./reversal-corpus.js";
import type { ReversalFixture } from "./reversal-corpus.js";
const database = "causalledger_m04_05_disposable";
function explicit(name: string, role: string): string {
  const value = process.env[name];
  if (
    !value ||
    process.env.LEDGER_STORAGE_TEST_DATABASE !== database ||
    process.env.LEDGER_STORAGE_TEST_DISPOSABLE !== "YES_M04_05_SYNTHETIC_ONLY"
  )
    throw new Error(
      "Mandatory owned synthetic17 configuration missing; no skip/ambient fallback.",
    );
  const u = new URL(value);
  if (
    !["postgres:", "postgresql:"].includes(u.protocol) ||
    u.hostname !== "127.0.0.1" ||
    u.pathname !== "/" + database ||
    u.username !== role ||
    !u.password ||
    !/^[1-9][0-9]*$/.test(u.port) ||
    Number(u.port) > 65535 ||
    u.search ||
    u.hash
  )
    throw new Error("Unrecognized owned synthetic target/role.");
  return value;
}
const owner = new pg.Client({
    connectionString: explicit(
      "LEDGER_STORAGE_TEST_OWNER_URL",
      "causalledger_storage_owner",
    ),
  }),
  appUrl = explicit("LEDGER_STORAGE_TEST_APP_URL", "causalledger_storage_app"),
  app = new pg.Client({ connectionString: appUrl });
const reversal = createLedgerReversalStore(appUrl),
  ordinary = createIdempotentLedgerJournalStore(appUrl),
  legacy = createLedgerJournalStore(appUrl),
  reader = createLedgerTransactionReader(appUrl),
  balance = createLedgerAccountBalanceReader(appUrl);
const seed = fixture(REVERSAL_CASES[1]!, 9000);
const TABLES = [
  ["ledger_transactions", "id", "id"],
  ["ledger_account_snapshots", "transaction_id", "transaction_id,account_id"],
  ["ledger_entries", "transaction_id", "id"],
  [
    "ledger_idempotency_keys",
    "transaction_id",
    "ledger_id,source_namespace,idempotency_key",
  ],
  ["ledger_reversals", "reversal_transaction_id", "original_transaction_id"],
] as const;
type History = Record<string, [string, string, string][]>;
function excludeHistory(snapshot: History, excluded: string[]): History {
  return Object.fromEntries(
    Object.entries(snapshot).map(([table, rows]) => [
      table,
      rows.filter(
        ([id, original]) =>
          !excluded.includes(id) && !excluded.includes(original),
      ),
    ]),
  );
}
async function history(excluded: string[] = []): Promise<History> {
  const row = (
    await owner.query(
      "SELECT " +
        TABLES.map(
          ([table, id, order]) =>
            `(SELECT COALESCE(array_agg(ARRAY[t.${id}, ${table === "ledger_reversals" ? "t.original_transaction_id" : "''::text"}, to_jsonb(t)::text] ORDER BY ${order
              .split(",")
              .map((k) => `t.${k} COLLATE "C"`)
              .join(
                ",",
              )}), ARRAY[]::text[]) FROM public.${table} t WHERE NOT(t.${id}=ANY($1::text[])${table === "ledger_reversals" ? " OR t.original_transaction_id=ANY($1::text[])" : ""})) AS ${table}`,
        ).join(","),
      [excluded],
    )
  ).rows[0] as History;
  for (const [table] of TABLES) {
    expect(Array.isArray(row[table])).toBe(true);
    expect(
      row[table]!.every(
        (tuple) =>
          Array.isArray(tuple) &&
          tuple.length === 3 &&
          tuple.every((value) => typeof value === "string"),
      ),
    ).toBe(true);
  }
  return row;
}
async function direct(
  request: LedgerReversalCandidate,
  accounts: ReversalFixture["input"],
  client = app,
) {
  return client.query(
    "SELECT public.append_ledger_reversal($1::jsonb,$2::jsonb) AS receipt",
    [JSON.stringify(request), JSON.stringify(snapshots(accounts))],
  );
}
async function absent(id: string) {
  const row = (
    await owner.query(
      "SELECT (SELECT count(*) FROM public.ledger_transactions WHERE id=$1)::text AS headers,(SELECT count(*) FROM public.ledger_account_snapshots WHERE transaction_id=$1)::text AS snapshots,(SELECT count(*) FROM public.ledger_entries WHERE transaction_id=$1)::text AS entries,(SELECT count(*) FROM public.ledger_idempotency_keys WHERE transaction_id=$1)::text AS keys,(SELECT count(*) FROM public.ledger_reversals WHERE original_transaction_id=$1 OR reversal_transaction_id=$1)::text AS links",
      [id],
    )
  ).rows[0];
  expect(row).toEqual({
    headers: "0",
    snapshots: "0",
    entries: "0",
    keys: "0",
    links: "0",
  });
}
async function readback(f: ReversalFixture, offset = false) {
  const journal = offset ? f.request.journal : f.input.journal;
  const result = await reader.query({
    contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
    ledgerId: journal.transaction.ledgerId,
    selection: {
      kind: "transaction_id",
      transactionId: journal.transaction.id,
    },
    cutoffs: balanceQuery(f.input.accounts[0]!).cutoffs,
  });
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error("Durable readback refused");
  expect(result.value.statusScope).toBe("all_stored_headers");
  expect(result.value.transactions).toHaveLength(1);
  expect(result.value.transactions[0]!.journal).toEqual({
    ...journal,
    entries: journal.entries.map((e) => ({
      ...e,
      amount: {
        ...e.amount,
        minorUnits: BigInt(e.amount.minorUnits as string),
      },
    })),
    totals: f.totals,
  });
  expect(result.value.transactions[0]!.accounts).toEqual(
    [...f.input.accounts].sort((a, b) =>
      a.id < b.id ? -1 : a.id > b.id ? 1 : 0,
    ),
  );
}
async function balances(
  f: ReversalFixture,
  offset: boolean,
  cutoffs = balanceQuery(f.input.accounts[0]!).cutoffs,
) {
  for (const oracle of f.accounts) {
    const account = f.input.accounts.find((a) => a.id === oracle.id)!;
    const result = await balance.query({ ...balanceQuery(account), cutoffs });
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("Account balance refused");
    const amount = BigInt(oracle.total),
      debit = offset || oracle.side === "debit" ? amount : 0n,
      credit = offset || oracle.side === "credit" ? amount : 0n;
    expect(result.value).toMatchObject({
      debitMinorUnits: debit,
      creditMinorUnits: credit,
      balanceMinorUnits: offset
        ? 0n
        : oracle.side === account.normalBalance
          ? amount
          : -amount,
      entryCount: BigInt(oracle.lineCount * (offset ? 2 : 1)),
      transactionCount: offset ? 2n : 1n,
      statusScope: "all_stored_headers",
    });
  }
}
async function linkAndKey(f: ReversalFixture, request = f.request) {
  const id = request.journal.transaction.id;
  expect(
    (
      await owner.query(
        "SELECT original_transaction_id,reversal_transaction_id,ledger_id,contract_version,kind FROM public.ledger_reversals WHERE original_transaction_id=$1",
        [f.input.journal.transaction.id],
      )
    ).rows,
  ).toEqual([
    {
      original_transaction_id: f.input.journal.transaction.id,
      reversal_transaction_id: id,
      ledger_id: request.journal.transaction.ledgerId,
      contract_version: "m04.09-ledger-reversal.v1",
      kind: "full",
    },
  ]);
  expect(
    (
      await owner.query(
        "SELECT ledger_id,source_namespace,idempotency_key,transaction_id,receipt->>'contractVersion' AS version,receipt->>'transactionId' AS receipt_id,receipt->>'entryCount' AS entry_count FROM public.ledger_idempotency_keys WHERE transaction_id=$1",
        [id],
      )
    ).rows,
  ).toEqual([
    {
      ledger_id: request.journal.transaction.ledgerId,
      source_namespace: request.journal.transaction.provenance.source.namespace,
      idempotency_key: request.journal.transaction.idempotencyKey,
      transaction_id: id,
      version: "m04.08-idempotency.v1",
      receipt_id: id,
      entry_count: String(request.journal.entries.length),
    },
  ]);
}
function expectedReceipt(
  request: LedgerReversalCandidate,
): LedgerReversalReceipt {
  return {
    contractVersion: "m04.09-ledger-reversal.v1",
    kind: "full",
    originalTransactionId:
      request.originalTransactionId as LedgerReversalReceipt["originalTransactionId"],
    transactionId: request.journal.transaction
      .id as LedgerReversalReceipt["transactionId"],
    entryCount: request.journal.entries.length,
  };
}
async function storeOriginal(f: ReversalFixture, old = false) {
  const out = await (old ? legacy : ordinary).append(
    f.input.journal,
    f.input.accounts,
  );
  expect(out.ok).toBe(true);
  if (!out.ok) throw new Error("Declared original refused");
  await readback(f);
}
async function roundtrip(f: ReversalFixture, old = false) {
  const inputBefore = structuredClone(f),
    before = await history();
  await storeOriginal(f, old);
  await balances(f, false);
  const originalHistory = await history();
  const result = await reversal.append(f.request, f.input.accounts);
  expect(result).toEqual({ ok: true, receipt: expectedReceipt(f.request) });
  expect(f).toEqual(inputBefore);
  await readback(f);
  await readback(f, true);
  await linkAndKey(f);
  await balances(f, true);
  const acceptedHistory = await history();
  expect(
    excludeHistory(acceptedHistory, [f.request.journal.transaction.id]),
  ).toEqual(originalHistory);
  expect(
    excludeHistory(acceptedHistory, [
      f.input.journal.transaction.id,
      f.request.journal.transaction.id,
    ]),
  ).toEqual(before);
  const next = retry(f.request, 60_000 + f.number);
  const again = await reversal.append(next, [...f.input.accounts].reverse());
  expect(again).toEqual(result);
  expect(await history()).toEqual(acceptedHistory);
  await absent(next.journal.transaction.id);
}
async function connect() {
  const c = new pg.Client({ connectionString: appUrl });
  await c.connect();
  return c;
}
async function blocked(pid: number) {
  const deadline = Date.now() + 4000;
  while (Date.now() < deadline) {
    if (
      (
        await owner.query(
          "SELECT 1 FROM pg_locks WHERE pid=$1 AND locktype='advisory' AND NOT granted",
          [pid],
        )
      ).rowCount! > 0
    )
      return;
  }
  throw new Error(
    "No observed blocked competitor; elapsed time is not ordering evidence.",
  );
}
beforeAll(async () => {
  await owner.connect();
  await app.connect();
  const target = (
    await owner.query(
      "SELECT current_database() AS db,current_user AS role,current_setting('server_version_num')::integer AS version",
    )
  ).rows[0];
  expect(target.db).toBe(database);
  expect(target.role).toBe("causalledger_storage_owner");
  expect(target.version).toBeGreaterThanOrEqual(170000);
  expect(target.version).toBeLessThan(180000);
  expect((await app.query("SELECT current_user AS role")).rows[0].role).toBe(
    "causalledger_storage_app",
  );
  await storeOriginal(seed);
});
afterAll(async () => {
  await Promise.allSettled([
    owner.end(),
    app.end(),
    reversal.close(),
    ordinary.close(),
    legacy.close(),
    reader.close(),
    balance.close(),
  ]);
});
describe("M04.17 mandatory real PostgreSQL17 cross-feature reversal corpus", () => {
  it.each(REVERSAL_CASES)(
    "$label exact linked original/full inverse/net-zero and stable retry",
    async (row) => roundtrip(fixture(row), row.number % 2 === 0),
  );
  it.each(REVERSAL_ROLES)(
    "$label full role original/offset composition and preserved history",
    async (row) => {
      const f = fixture(row);
      expect(checkRole(row, f.input).ok).toBe(true);
      expect(
        checkRole(row, {
          journal: f.request.journal,
          accounts: f.input.accounts,
        }).ok,
      ).toBe(true);
      await roundtrip(f);
    },
  );
  it("five-category/multicurrency repeated maximum lines remain exact and net-zero", async () =>
    roundtrip(multiFixture()));
  it.each(
    CURRENCIES.flatMap((currency, u) =>
      POLICY_CASES.map((policy, i) => ({
        currency,
        policy,
        number: 3000 + u * 100 + i,
        label: `${currency}/${policy.name}`,
      })),
    ),
  )(
    "$label SQL policy refusal preserves complete original/global history",
    async ({ currency, policy, number }) => {
      const f = fixture({ ...REVERSAL_CASES[1]!, currency }, number);
      await storeOriginal(f);
      const before = await history(),
        bad = policy.mutate(f),
        inputBefore = structuredClone(bad);
      await expect(direct(bad.request, bad.input)).rejects.toMatchObject({
        code: policy.sql,
      });
      expect(bad).toEqual(inputBefore);
      expect(await history()).toEqual(before);
      if (bad.request.journal.transaction.id !== f.input.journal.transaction.id)
        await absent(bad.request.journal.transaction.id);
      await readback(f);
      await balances(f, false);
    },
  );
  it.each(CURRENCIES)(
    "%s both inclusive clocks distinguish original-only and exact full inverse",
    async (currency) => {
      const f = fixture(
        { ...REVERSAL_CASES[1]!, currency },
        3800 + CURRENCIES.indexOf(currency),
      );
      await roundtrip(f);
      await balances(f, false, {
        effectiveThrough: "2026-10-08T12:59:59.999Z",
        recordedThrough: "2026-10-08T13:01:00.000Z",
      });
      await balances(f, false, {
        effectiveThrough: "2026-10-08T13:00:00.000Z",
        recordedThrough: "2026-10-08T13:00:59.999Z",
      });
      await balances(f, true, {
        effectiveThrough: "2026-10-08T13:00:00.000Z",
        recordedThrough: "2026-10-08T13:01:00.000Z",
      });
    },
  );
  it.each([
    "second-key",
    "changed-clock",
    "other-original",
    "reversal-of-reversal",
  ] as const)(
    "durable %s refuses despite individually well-formed inverse declarations",
    async (mode) => {
      const n =
          4000 +
          [
            "second-key",
            "changed-clock",
            "other-original",
            "reversal-of-reversal",
          ].indexOf(mode),
        f = fixture(REVERSAL_CASES[1]!, n);
      await storeOriginal(f);
      expect((await reversal.append(f.request, f.input.accounts)).ok).toBe(
        true,
      );
      let bad = retry(f.request, n);
      let code = "23505";
      if (mode === "second-key")
        bad = changed(
          bad,
          ["journal", "transaction", "idempotencyKey"],
          "synthetic.second-key",
        );
      if (mode === "changed-clock")
        bad = changed(
          bad,
          ["journal", "transaction", "recordedAt"],
          "2026-10-08T13:01:01.000Z",
        );
      if (mode === "other-original") {
        const attempt = retry(
          { ...f.request, journal: f.input.journal },
          n + 100,
        ).journal;
        const other = {
          ...attempt,
          transaction: {
            ...attempt.transaction,
            idempotencyKey: `synthetic.other.${n}`,
            provenance: {
              ...attempt.transaction.provenance,
              source: {
                namespace: "synthetic.reversal-corpus",
                id: `other-${n}`,
              },
            },
          },
        };
        const otherInput = { journal: other, accounts: f.input.accounts };
        const stored = await ordinary.append(other, otherInput.accounts);
        expect(stored.ok).toBe(true);
        if (!stored.ok) throw new Error("Second declared original refused");
        expect(stored.receipt.transactionId).toBe(other.transaction.id);
        await readback({ ...f, input: otherInput });
        bad = { ...bad, originalTransactionId: other.transaction.id };
      }
      if (mode === "reversal-of-reversal") {
        bad = inverse(
          { journal: f.request.journal, accounts: f.input.accounts },
          n + 100,
        );
        code = "23514";
      }
      const before = await history();
      await expect(direct(bad, f.input)).rejects.toMatchObject({ code });
      expect(await history()).toEqual(before);
      await absent(bad.journal.transaction.id);
      await readback(f);
      await readback(f, true);
      await linkAndKey(f);
    },
  );
  it.each(["missing", "pending"] as const)(
    "durable %s original refusal leaves no offset/key/link",
    async (mode) => {
      const f = fixture(
        REVERSAL_CASES[1]!,
        4100 + (mode === "pending" ? 1 : 0),
      );
      if (mode === "pending")
        expect(
          (
            await ordinary.append(
              {
                ...f.input.journal,
                transaction: {
                  ...f.input.journal.transaction,
                  status: "pending",
                },
              },
              f.input.accounts,
            )
          ).ok,
        ).toBe(true);
      const before = await history();
      await expect(direct(f.request, f.input)).rejects.toMatchObject({
        code: "23514",
      });
      expect(await history()).toEqual(before);
      await absent(f.request.journal.transaction.id);
    },
  );
  it.each(CURRENCIES)(
    "%s fresh connection semantic retry recovers the exact committed linked receipt",
    async (currency) => {
      const f = fixture(
        { ...REVERSAL_CASES[1]!, currency },
        4200 + CURRENCIES.indexOf(currency),
      );
      await storeOriginal(f);
      const committed = await reversal.append(f.request, f.input.accounts),
        before = await history(),
        next = retry(f.request, 4200 + CURRENCIES.indexOf(currency)),
        fresh = createLedgerReversalStore(appUrl);
      try {
        expect(
          await fresh.append(next, [...f.input.accounts].reverse()),
        ).toEqual(committed);
        expect(await history()).toEqual(before);
        await absent(next.journal.transaction.id);
        await linkAndKey(f);
      } finally {
        await fresh.close();
      }
    },
  );
  it.each(CURRENCIES)(
    "%s late unrelated durable entry conflict atomically rolls back offset/key/link, then retry succeeds",
    async (currency) => {
      const f = fixture(
        { ...REVERSAL_CASES[1]!, currency },
        4300 + CURRENCIES.indexOf(currency),
      );
      await storeOriginal(f);
      const before = await history(),
        bad = changed(
          f.request,
          ["journal", "entries", 3, "id"],
          seed.input.journal.entries[0]!.id,
        );
      await expect(direct(bad, f.input)).rejects.toMatchObject({
        code: "23505",
      });
      expect(await history()).toEqual(before);
      await absent(bad.journal.transaction.id);
      expect(await reversal.append(f.request, f.input.accounts)).toEqual({
        ok: true,
        receipt: expectedReceipt(f.request),
      });
      expect(await history([f.request.journal.transaction.id])).toEqual(before);
      await linkAndKey(f);
    },
  );
  it.each(CURRENCIES)(
    "%s staged linked reversal stays observer-invisible and explicit error/rollback restores prehistory",
    async (currency) => {
      const f = fixture(
        { ...REVERSAL_CASES[1]!, currency },
        4400 + CURRENCIES.indexOf(currency),
      );
      await storeOriginal(f);
      const before = await history(),
        c = await connect();
      try {
        await c.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        expect((await direct(f.request, f.input, c)).rows[0].receipt).toEqual(
          expectedReceipt(f.request),
        );
        expect(await history()).toEqual(before);
        await absent(f.request.journal.transaction.id);
        await expect(c.query("SELECT 1/0")).rejects.toMatchObject({
          code: "22012",
        });
        await expect(c.query("SELECT 1")).rejects.toMatchObject({
          code: "25P02",
        });
        await c.query("ROLLBACK");
        expect(await history()).toEqual(before);
        await absent(f.request.journal.transaction.id);
        expect(await reversal.append(f.request, f.input.accounts)).toEqual({
          ok: true,
          receipt: expectedReceipt(f.request),
        });
        expect(await history([f.request.journal.transaction.id])).toEqual(
          before,
        );
        await linkAndKey(f);
      } finally {
        await c.query("ROLLBACK");
        await c.end();
      }
    },
  );
  it.each(
    CURRENCIES.flatMap((currency, u) =>
      (
        [
          "matching",
          "different-key",
          "changed-payload",
          "winner-rollback",
        ] as const
      ).map((mode, i) => ({
        currency,
        mode,
        number: 5000 + u * 100 + i,
        label: `${currency}/${mode}`,
      })),
    ),
  )(
    "$label observes actual waiting competitor before winner decision",
    async ({ currency, mode, number }) => {
      const f = fixture({ ...REVERSAL_CASES[1]!, currency }, number);
      await storeOriginal(f);
      const before = await history(),
        win = await connect(),
        lose = await connect();
      let pending:
        | Promise<
            | { ok: true; receipt: LedgerReversalReceipt }
            | { ok: false; code: string }
          >
        | undefined;
      let next = retry(f.request, number);
      if (mode === "different-key")
        next = changed(
          next,
          ["journal", "transaction", "idempotencyKey"],
          "synthetic.concurrent-second",
        );
      if (mode === "changed-payload")
        next = changed(
          next,
          ["journal", "transaction", "recordedAt"],
          "2026-10-08T13:01:01.000Z",
        );
      try {
        await win.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        expect((await direct(f.request, f.input, win)).rows[0].receipt).toEqual(
          expectedReceipt(f.request),
        );
        expect(await history()).toEqual(before);
        await absent(f.request.journal.transaction.id);
        const pid = (await lose.query("SELECT pg_backend_pid() AS pid")).rows[0]
          .pid as number;
        await lose.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        await lose.query("SET LOCAL statement_timeout='10000ms'");
        pending = direct(next, f.input, lose).then(
          (r) => ({
            ok: true as const,
            receipt: r.rows[0].receipt as LedgerReversalReceipt,
          }),
          (e) => ({ ok: false as const, code: (e as { code: string }).code }),
        );
        await blocked(pid);
        await win.query(mode === "winner-rollback" ? "ROLLBACK" : "COMMIT");
        const outcome = await pending;
        if (mode === "matching" || mode === "winner-rollback") {
          expect(outcome).toEqual({
            ok: true,
            receipt: expectedReceipt(mode === "matching" ? f.request : next),
          });
          await lose.query("COMMIT");
        } else {
          expect(outcome).toEqual({ ok: false, code: "23505" });
          await lose.query("ROLLBACK");
        }
        const committed = mode === "winner-rollback" ? next : f.request;
        await linkAndKey(f, committed);
        await readback({ ...f, request: committed }, true);
        await readback(f);
        await balances(f, true);
        expect(await history([committed.journal.transaction.id])).toEqual(
          before,
        );
        await absent(
          (mode === "winner-rollback" ? f.request : next).journal.transaction
            .id,
        );
      } finally {
        await win.query("ROLLBACK");
        if (pending) await pending;
        await lose.query("ROLLBACK");
        await Promise.allSettled([win.end(), lose.end()]);
      }
    },
    15000,
  );
  it.each(
    CURRENCIES.flatMap((currency, u) =>
      (["commit", "rollback"] as const).map((decision, i) => ({
        currency,
        decision,
        number: 5400 + u * 100 + i,
        label: `${currency}/${decision}`,
      })),
    ),
  )(
    "$label ordinary08 race cannot be adopted, rolled-back ordinary outcome permits proper09 link",
    async ({ currency, decision, number }) => {
      const f = fixture({ ...REVERSAL_CASES[1]!, currency }, number);
      await storeOriginal(f);
      const before = await history(),
        win = await connect(),
        lose = await connect(),
        next = retry(f.request, number);
      let pending:
        | Promise<
            | { ok: true; receipt: LedgerReversalReceipt }
            | { ok: false; code: string }
          >
        | undefined;
      try {
        await win.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        await win.query(
          "SELECT public.append_idempotent_ledger_journal($1::jsonb,$2::jsonb)",
          [
            JSON.stringify(f.request.journal),
            JSON.stringify(snapshots(f.input)),
          ],
        );
        const pid = (await lose.query("SELECT pg_backend_pid() AS pid")).rows[0]
          .pid as number;
        await lose.query("BEGIN ISOLATION LEVEL READ COMMITTED");
        await lose.query("SET LOCAL statement_timeout='10000ms'");
        pending = direct(next, f.input, lose).then(
          (r) => ({
            ok: true as const,
            receipt: r.rows[0].receipt as LedgerReversalReceipt,
          }),
          (e) => ({ ok: false as const, code: (e as { code: string }).code }),
        );
        await blocked(pid);
        expect(await history()).toEqual(before);
        await win.query(decision === "commit" ? "COMMIT" : "ROLLBACK");
        const outcome = await pending;
        if (decision === "commit") {
          expect(outcome).toEqual({ ok: false, code: "23505" });
          await lose.query("ROLLBACK");
          expect(
            (
              await owner.query(
                "SELECT count(*)::text AS n FROM public.ledger_reversals WHERE original_transaction_id=$1",
                [f.input.journal.transaction.id],
              )
            ).rows,
          ).toEqual([{ n: "0" }]);
          await absent(next.journal.transaction.id);
          await readback(f, true);
          expect(await history([f.request.journal.transaction.id])).toEqual(
            before,
          );
        } else {
          expect(outcome).toEqual({ ok: true, receipt: expectedReceipt(next) });
          await lose.query("COMMIT");
          await linkAndKey(f, next);
          await readback({ ...f, request: next }, true);
          await absent(f.request.journal.transaction.id);
          expect(await history([next.journal.transaction.id])).toEqual(before);
        }
        await readback(f);
        await balances(f, true);
      } finally {
        await win.query("ROLLBACK");
        if (pending) await pending;
        await lose.query("ROLLBACK");
        await Promise.allSettled([win.end(), lose.end()]);
      }
    },
    15000,
  );
});
