import pg from "pg";
import { beforeAll, afterAll, describe, expect, it } from "vitest";
import {
  createLedgerReversalStore,
  validateLedgerReversalCandidate,
  createIdempotentLedgerJournalStore,
  createLedgerTransactionReader,
  createLedgerAccountBalanceReader,
  LEDGER_TRANSACTION_QUERY_CONTRACT_VERSION,
} from "../src/index.js";
import type {
  LedgerReversalCandidate,
  LedgerReversalReceipt,
} from "../src/index.js";
import { SHAPES } from "./balanced-posting-corpus.js";
import { syntheticId } from "./storage-synthetic.js";
import { balanceQuery } from "./balance-synthetic.js";
import { fixture, retry, changed, snapshots } from "./reversal-corpus.js";
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
      "Mandatory owned synthetic18 configuration missing; no skip/ambient fallback.",
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
  reader = createLedgerTransactionReader(appUrl),
  balance = createLedgerAccountBalanceReader(appUrl);

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

function example(n: number): ReversalFixture {
  return fixture(
    {
      number: n,
      label: "M04.18 synthetic USD asset/revenue",
      first: "asset",
      counter: "revenue",
      currency: "USD",
      status: "posted",
      shape: SHAPES[0],
    },
    1_000_000 + n,
  );
}
function ordinaryRetry(f: ReversalFixture, n: number) {
  const id = `txn_${syntheticId(14_300_000 + n)}`;
  const journal = structuredClone(f.input.journal);
  return {
    ...journal,
    transaction: { ...journal.transaction, id },
    entries: [...journal.entries].reverse().map((e, i) => ({
      ...e,
      id: `ent_${syntheticId((14_300_000 + n) * 100 + i)}`,
      transactionId: id,
    })),
  };
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
});
afterAll(async () => {
  await Promise.allSettled([
    owner.end(),
    app.end(),
    ordinary.close(),
    reversal.close(),
    reader.close(),
    balance.close(),
  ]);
});
describe("M04.18 mandatory executable synthetic ledger core acceptance", () => {
  it("1250 balanced posting -> original retry -> full linked reversal -> zero, immutable readback", async () => {
    const f = example(18),
      inputBefore = structuredClone(f),
      before = await history();
    const first = await ordinary.append(f.input.journal, f.input.accounts);
    expect(first).toEqual({
      ok: true,
      receipt: {
        contractVersion: "m04.08-idempotency.v1",
        transactionId: f.input.journal.transaction.id,
        entryCount: 2,
      },
    });
    await readback(f);
    await balances(f, false);
    const original = await history();
    const next = ordinaryRetry(f, 18);
    expect(
      await ordinary.append(next, [...f.input.accounts].reverse()),
    ).toEqual(first);
    expect(await history()).toEqual(original);
    await absent(next.transaction.id);
    // Restricted application writes must remain refused; owner is read-only here.
    for (const sql of [
      "UPDATE public.ledger_transactions SET status='pending' WHERE id=$1",
      "DELETE FROM public.ledger_transactions WHERE id=$1",
    ]) {
      await expect(
        app.query(sql, [f.input.journal.transaction.id]),
      ).rejects.toMatchObject({ code: "42501" });
      expect(await history()).toEqual(original);
    }
    const result = await reversal.append(f.request, f.input.accounts);
    expect(result).toEqual({ ok: true, receipt: expectedReceipt(f.request) });
    await readback(f);
    await readback(f, true);
    await linkAndKey(f);
    await balances(f, true);
    const accepted = await history();
    expect(
      excludeHistory(accepted, [f.request.journal.transaction.id]),
    ).toEqual(original);
    expect(
      excludeHistory(accepted, [
        f.input.journal.transaction.id,
        f.request.journal.transaction.id,
      ]),
    ).toEqual(before);
    // Both inclusive clocks retain the original-only1250 snapshot before the offset.
    await balances(f, false, {
      effectiveThrough: f.input.journal.transaction.effectiveAt,
      recordedThrough: f.input.journal.transaction.recordedAt,
    });
    for (const clock of ["effectiveThrough", "recordedThrough"] as const) {
      const cutoffs = {
        ...balanceQuery(f.input.accounts[0]!).cutoffs,
        [clock]:
          f.input.journal.transaction[
            clock === "effectiveThrough" ? "effectiveAt" : "recordedAt"
          ],
      };
      await balances(f, false, cutoffs);
    }
    const renamed = retry(f.request, 1_000_018),
      fresh = createLedgerReversalStore(appUrl);
    try {
      expect(
        await fresh.append(renamed, [...f.input.accounts].reverse()),
      ).toEqual(result);
    } finally {
      await fresh.close();
    }
    await absent(renamed.journal.transaction.id);
    await readback(f);
    await readback(f, true);
    await balances(f, true);
    expect(await history()).toEqual(accepted);
    expect(f).toEqual(inputBefore);
    console.log(
      "DEMO PASS: synthetic USD debit1250/credit1250; original retry same receipt/no rows; linked full1250 offset; both normal balances0; original/global history preserved.",
    );
  });
  it("balanced same-key changed1251 payload refuses without writes", async () => {
    const f = example(19);
    expect((await ordinary.append(f.input.journal, f.input.accounts)).ok).toBe(
      true,
    );
    await readback(f);
    const before = await history(),
      next = ordinaryRetry(f, 19);
    const conflict = {
      ...next,
      entries: next.entries.map((e) => ({
        ...e,
        amount: { ...e.amount, minorUnits: "1251" },
      })),
    };
    await expect(
      app.query(
        "SELECT public.append_idempotent_ledger_journal($1::jsonb,$2::jsonb)",
        [JSON.stringify(conflict), JSON.stringify(snapshots(f.input))],
      ),
    ).rejects.toMatchObject({ code: "23505" });
    expect(await history()).toEqual(before);
    await absent(next.transaction.id);
    await balances(f, false);
  });
  it("balanced partial1000 inverse of1250 refuses without offset or history change", async () => {
    const f = example(20);
    expect((await ordinary.append(f.input.journal, f.input.accounts)).ok).toBe(
      true,
    );
    await readback(f);
    const before = await history(),
      partial = changed(
        f.request,
        ["journal", "entries"],
        f.request.journal.entries.map((e) => ({
          ...e,
          amount: { ...e.amount, minorUnits: "1000" },
        })),
      );
    const preflight = validateLedgerReversalCandidate(
      partial,
      f.input.journal,
      f.input.accounts,
      f.input.accounts,
    );
    expect(preflight.ok).toBe(false);
    if (preflight.ok) throw new Error("Partial inverse accepted");
    expect(preflight.issues).toContainEqual(
      expect.objectContaining({
        code: "invalid_context",
        path: "$.journal.entries",
      }),
    );
    await expect(
      reversal.append(partial, f.input.accounts),
    ).rejects.toMatchObject({ outcome: "not_stored", sqlState: "23514" });
    expect(await history()).toEqual(before);
    await expect(direct(partial, f.input)).rejects.toMatchObject({
      code: "23514",
    });
    expect(await history()).toEqual(before);
    await absent(partial.journal.transaction.id);
    await balances(f, false);
  });
});
