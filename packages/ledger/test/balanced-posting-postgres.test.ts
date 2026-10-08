import pg from "pg";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import type { AccountCurrency } from "../src/index.js";
import {
  createLedgerJournalStore,
  createLedgerTransactionReader,
  createLedgerAccountBalanceReader,
  createIdempotentLedgerJournalStore,
  validateLedgerJournalCandidate,
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
} from "../src/index.js";
import {
  CORPUS,
  ROLE_CASES,
  NORMAL_SIDE,
  materialize,
  roleInput,
  checkRole,
  permute,
  multiCurrency,
  SHAPES,
} from "./balanced-posting-corpus.js";
import type { CorpusInput } from "./balanced-posting-corpus.js";
import { balanceQuery } from "./balance-synthetic.js";
import { syntheticId } from "./storage-synthetic.js";
const database = "causalledger_m04_05_disposable";
function explicit(name: string, role: string): string {
  const value = process.env[name];
  if (
    !value ||
    process.env.LEDGER_STORAGE_TEST_DATABASE !== database ||
    process.env.LEDGER_STORAGE_TEST_DISPOSABLE !== "YES_M04_05_SYNTHETIC_ONLY"
  )
    throw new Error(
      "Mandatory owned synthetic17 configuration missing; no skip or ambient fallback.",
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
});
const appUrl = explicit(
  "LEDGER_STORAGE_TEST_APP_URL",
  "causalledger_storage_app",
);
const store = createLedgerJournalStore(appUrl),
  reader = createLedgerTransactionReader(appUrl),
  balance = createLedgerAccountBalanceReader(appUrl),
  idempotent = createIdempotentLedgerJournalStore(appUrl);
beforeAll(async () => {
  await owner.connect();
  const row = (
    await owner.query(
      "SELECT current_database() AS database,current_setting('server_version_num')::integer AS version",
    )
  ).rows[0] as { database: string; version: number };
  expect(row.database).toBe(database);
  expect(row.version).toBeGreaterThanOrEqual(170000);
  expect(row.version).toBeLessThan(180000);
});
afterAll(async () => {
  await idempotent.close();
  await balance.close();
  await reader.close();
  await store.close();
  await owner.end();
});
async function read(
  input: CorpusInput,
  cutoffs = balanceQuery(input.accounts[0]!).cutoffs,
) {
  const result = await reader.query({
    contractVersion: LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
    ledgerId: input.journal.transaction.ledgerId,
    selection: {
      kind: "transaction_id",
      transactionId: input.journal.transaction.id,
    },
    cutoffs,
  });
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error("Corpus durable read refused");
  expect(result.value.statusScope).toBe("all_stored_headers");
  return result.value.transactions;
}
async function storedRows(input: CorpusInput) {
  // Keep JSON aggregates as exact text so pg never parses large money as Number.
  // Inspect only this explicitly owned synthetic ledger; reads must not change stored rows.
  return (
    await owner.query(
      "SELECT (SELECT jsonb_agg(to_jsonb(t) ORDER BY t.id) FROM public.ledger_transactions t WHERE t.ledger_id=$1)::text AS transactions,(SELECT jsonb_agg(to_jsonb(e) ORDER BY e.id) FROM public.ledger_entries e WHERE e.ledger_id=$1)::text AS entries,(SELECT jsonb_agg(to_jsonb(a) ORDER BY a.transaction_id,a.account_id) FROM public.ledger_account_snapshots a WHERE a.ledger_id=$1)::text AS snapshots,(SELECT jsonb_agg(to_jsonb(k) ORDER BY k.idempotency_key) FROM public.ledger_idempotency_keys k WHERE k.ledger_id=$1)::text AS keys",
      [input.journal.transaction.ledgerId],
    )
  ).rows;
}
async function assertReadback(
  input: CorpusInput,
  totals: readonly {
    currency: AccountCurrency;
    debitMinorUnits: bigint;
    creditMinorUnits: bigint;
  }[],
) {
  const checked = validateLedgerJournalCandidate(input.journal, input.accounts);
  expect(checked.ok).toBe(true);
  if (!checked.ok) throw new Error("Declared valid corpus refused");
  const rows = await read(input);
  expect(rows).toHaveLength(1);
  // Expected readback comes from declarations/literal oracles, never validator output.
  expect(rows[0]!.journal).toEqual({
    ...input.journal,
    entries: input.journal.entries.map((entry) => ({
      ...entry,
      amount: {
        ...entry.amount,
        minorUnits: BigInt(entry.amount.minorUnits as string),
      },
    })),
    totals,
  });
  expect(rows[0]!.accounts).toEqual(input.accounts);
  expect(rows[0]!.entryCount).toBe(BigInt(input.journal.entries.length));
  expect(rows[0]!.accountCount).toBe(BigInt(input.accounts.length));
  expect(rows[0]!.journal.transaction.status).toBe(
    input.journal.transaction.status,
  );
  expect(rows[0]!.journal.transaction.provenance).toEqual(
    input.journal.transaction.provenance,
  );
  const before = await storedRows(input);
  for (const field of ["transactions", "entries", "snapshots"])
    expect(before[0]![field]).toBeTypeOf("string");
  expect(await read(input)).toEqual(rows);
  expect(await read(input)).toEqual(rows);
  expect(await storedRows(input)).toEqual(before);
  return rows;
}
describe("M04.15 mandatory real PostgreSQL17 balanced-posting corpus", () => {
  it.each(CORPUS)(
    "$label: immutable exact readback and account-normal arithmetic",
    async (row) => {
      const input = materialize(row),
        before = structuredClone(input);
      expect((await store.append(input.journal, input.accounts)).ok).toBe(true);
      const amount = BigInt(row.shape.total),
        rows = await assertReadback(input, [
          {
            currency: row.currency,
            debitMinorUnits: amount,
            creditMinorUnits: amount,
          },
        ]);
      expect(rows[0]!.journal.totals).toEqual([
        {
          currency: row.currency,
          debitMinorUnits: amount,
          creditMinorUnits: amount,
        },
      ]);
      for (const [index, account] of input.accounts.entries()) {
        const side =
          index === 0
            ? NORMAL_SIDE[row.first]
            : NORMAL_SIDE[row.first] === "debit"
              ? "credit"
              : "debit";
        const result = await balance.query(balanceQuery(account));
        expect(result.ok).toBe(true);
        if (!result.ok) throw new Error("Corpus balance refused");
        expect(result.value).toMatchObject({
          debitMinorUnits: side === "debit" ? amount : 0n,
          creditMinorUnits: side === "credit" ? amount : 0n,
          balanceMinorUnits: side === account.normalBalance ? amount : -amount,
          entryCount: BigInt(row.shape.amounts.length),
          transactionCount: 1n,
        });
      }
      expect(input).toEqual(before);
    },
  );
  it.each(ROLE_CASES)(
    "$label: existing role check composes with immutable storage/readback",
    async (row) => {
      const input = roleInput(row),
        before = structuredClone(input),
        checked = checkRole(row, input);
      expect(checked.ok).toBe(true);
      expect((await store.append(input.journal, input.accounts)).ok).toBe(true);
      const rows = await assertReadback(input, [
        {
          currency: row.currency,
          debitMinorUnits: 1250n,
          creditMinorUnits: 1250n,
        },
      ]);
      expect(rows[0]!.journal.totals).toEqual([
        {
          currency: row.currency,
          debitMinorUnits: 1250n,
          creditMinorUnits: 1250n,
        },
      ]);
      expect(input).toEqual(before);
    },
  );
  it("durably retains each currency bucket in a general04 multicurrency journal", async () => {
    const input = multiCurrency();
    expect((await store.append(input.journal, input.accounts)).ok).toBe(true);
    const rows = await assertReadback(
      input,
      (["EUR", "GBP", "USD"] as const).map((currency) => ({
        currency,
        debitMinorUnits: 1250n,
        creditMinorUnits: 1250n,
      })),
    );
    expect(rows[0]!.journal.totals).toEqual(
      ["EUR", "GBP", "USD"].map((currency) => ({
        currency,
        debitMinorUnits: 1250n,
        creditMinorUnits: 1250n,
      })),
    );
    expect(rows[0]!.entryCount).toBe(12n);
    expect(rows[0]!.accountCount).toBe(6n);
  });
  it.each(["effectiveThrough", "recordedThrough"] as const)(
    "%s is inclusive and a repeated cutoff read changes no history",
    async (clock) => {
      const input = materialize({
        ...CORPUS[0]!,
        number: clock === "effectiveThrough" ? 2101 : 2102,
        status: "posted",
        shape: SHAPES[0],
      });
      expect((await store.append(input.journal, input.accounts)).ok).toBe(true);
      const before = await storedRows(input),
        at = {
          effectiveThrough: input.journal.transaction.effectiveAt,
          recordedThrough: input.journal.transaction.recordedAt,
        };
      expect(await read(input, at)).toHaveLength(1);
      expect(
        await read(input, {
          ...at,
          [clock]:
            clock === "effectiveThrough"
              ? "2026-10-08T11:59:59.999Z"
              : "2026-10-08T12:00:59.999Z",
        }),
      ).toEqual([]);
      for (const account of input.accounts) {
        const result = await balance.query({
          ...balanceQuery(account),
          cutoffs: at,
        });
        expect(result.ok).toBe(true);
        if (result.ok) expect(result.value.transactionCount).toBe(1n);
      }
      expect(await storedRows(input)).toEqual(before);
    },
  );
  it("existing08 semantic retry with new IDs/permuted declarations returns one original durable outcome", async () => {
    const input = materialize({
      ...CORPUS[0]!,
      number: 2201,
      status: "posted",
      shape: SHAPES[1],
    });
    const first = await idempotent.append(input.journal, input.accounts);
    expect(first.ok).toBe(true);
    const before = await storedRows(input),
      original = await assertReadback(input, [
        { currency: "USD", debitMinorUnits: 1250n, creditMinorUnits: 1250n },
      ]),
      permuted = permute(input);
    const retryId = `txn_${syntheticId(11_002_202)}`;
    const retry = {
      ...permuted.journal,
      transaction: { ...permuted.journal.transaction, id: retryId },
      entries: permuted.journal.entries.map((e, i) => ({
        ...e,
        transactionId: retryId,
        id: `ent_${syntheticId(1_100_220_201 + i)}`,
      })),
    };
    expect(await idempotent.append(retry, permuted.accounts)).toEqual(first);
    expect(await read(input)).toEqual(original);
    expect(await read({ ...input, journal: retry })).toEqual([]);
    expect(await storedRows(input)).toEqual(before);
  });
});
