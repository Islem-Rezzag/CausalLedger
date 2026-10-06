import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createLedgerAccountBalanceReader,
  createLedgerJournalStore,
  LEDGER_TRANSACTION_STATUSES,
} from "../src/index.js";
import type {
  AccountCandidate,
  LedgerAccountBalanceQueryCandidate,
  LedgerAccountBalanceReader,
  LedgerJournalCandidate,
  LedgerJournalStore,
} from "../src/index.js";
import {
  balanceAccounts,
  balanceJournal,
  balanceQuery,
} from "./balance-synthetic.js";

const database = "causalledger_m04_05_disposable";
function explicitUrl(name: string, role: string): string {
  const value = process.env[name];
  if (
    !value ||
    process.env.LEDGER_STORAGE_TEST_DISPOSABLE !==
      "YES_M04_05_SYNTHETIC_ONLY" ||
    process.env.LEDGER_STORAGE_TEST_DATABASE !== database
  )
    throw new Error(
      "Mandatory disposable PostgreSQL configuration is absent; integration never skips.",
    );
  const url = new URL(value);
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    url.hostname !== "127.0.0.1" ||
    url.pathname !== "/" + database ||
    url.username !== role ||
    !url.password ||
    !/^[1-9][0-9]*$/.test(url.port) ||
    url.search ||
    url.hash
  )
    throw new Error(
      "Refusing an unrecognized disposable integration target/role.",
    );
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
const owner = new pg.Client({ connectionString: ownerUrl });
const writer = new pg.Client({ connectionString: appUrl });
let reader: LedgerAccountBalanceReader, store: LedgerJournalStore;
let serial = 1_000_000,
  namespace = 1_000_000;
const fresh = (
  accounts: readonly [AccountCandidate, AccountCandidate],
  amount = "1250",
  side: "debit" | "credit" = "debit",
) => balanceJournal(++serial, accounts, amount, side);
const accounts = () => balanceAccounts(++namespace);
async function append(
  journal: LedgerJournalCandidate,
  catalog: readonly AccountCandidate[],
): Promise<void> {
  expect((await store.append(journal, catalog)).ok).toBe(true);
}
async function read(query: LedgerAccountBalanceQueryCandidate) {
  const result = await reader.query(query);
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.value;
}
async function direct(
  journal: LedgerJournalCandidate,
  catalog: readonly AccountCandidate[],
) {
  const snapshots = catalog.map((account) => ({
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
  return writer.query(
    "SELECT public.append_ledger_journal($1::jsonb,$2::jsonb)",
    [JSON.stringify(journal), JSON.stringify(snapshots)],
  );
}
beforeAll(async () => {
  await owner.connect();
  await writer.connect();
  expect(
    (
      await owner.query(
        "SELECT current_database() AS database, current_setting('server_version_num')::integer AS version",
      )
    ).rows[0],
  ).toMatchObject({ database });
  reader = createLedgerAccountBalanceReader(appUrl);
  store = createLedgerJournalStore(appUrl);
});
afterAll(async () => {
  await writer.query("ROLLBACK");
  await reader?.close();
  await store?.close();
  await writer.end();
  await owner.end();
});
describe("M04.06 mandatory real PostgreSQL17 balance acceptance", () => {
  it("returns empty zeros without asserting existence and leaves history unchanged", async () => {
    const before = (
      await owner.query(
        "SELECT count(*)::text AS count FROM public.ledger_entries",
      )
    ).rows;
    const result = await read(balanceQuery(accounts()[0]));
    expect(result).toMatchObject({
      debitMinorUnits: 0n,
      creditMinorUnits: 0n,
      balanceMinorUnits: 0n,
      entryCount: 0n,
      transactionCount: 0n,
      statusScope: "all_stored_headers",
    });
    expect(result.databaseSnapshot).toMatch(/^[0-9]+:[0-9]+:/);
    expect(
      (
        await owner.query(
          "SELECT count(*)::text AS count FROM public.ledger_entries",
        )
      ).rows,
    ).toEqual(before);
  });
  it("demonstrates durable debit1250 credit250 =>1000 and opposite counter balance", async () => {
    const catalog = accounts();
    await append(fresh(catalog), catalog);
    await append(fresh(catalog, "250", "credit"), catalog);
    const value = await read(balanceQuery(catalog[0]));
    expect(value).toMatchObject({
      debitMinorUnits: 1250n,
      creditMinorUnits: 250n,
      balanceMinorUnits: 1000n,
      entryCount: 2n,
      transactionCount: 2n,
    });
    expect((await read(balanceQuery(catalog[1]))).balanceMinorUnits).toBe(
      -1000n,
    );
    const changed = {
      ...balanceQuery(catalog[0]),
      signConvention: "infer_latest",
    };
    const rejected = await reader.query(changed);
    expect(rejected.ok).toBe(false);
    expect(Object.hasOwn(rejected, "value")).toBe(false);
  });
  it.each(["asset", "expense", "liability", "equity", "revenue"] as const)(
    "uses %s normal-positive sign",
    async (category) => {
      const catalog = balanceAccounts(++namespace, category);
      await append(fresh(catalog, "1250", catalog[0].normalBalance), catalog);
      await append(
        fresh(
          catalog,
          "250",
          catalog[0].normalBalance === "debit" ? "credit" : "debit",
        ),
        catalog,
      );
      expect((await read(balanceQuery(catalog[0]))).balanceMinorUnits).toBe(
        1000n,
      );
    },
  );
  it("counts distinct transactions separately from multiple selected entry lines", async () => {
    const catalog = accounts();
    const first = fresh(catalog, "1250");
    const second = fresh(catalog, "250");
    await append(
      {
        ...first,
        entries: [
          ...first.entries,
          ...second.entries.map((entry) => ({
            ...entry,
            transactionId: first.transaction.id,
          })),
        ],
      },
      catalog,
    );
    expect(await read(balanceQuery(catalog[0]))).toMatchObject({
      balanceMinorUnits: 1500n,
      entryCount: 2n,
      transactionCount: 1n,
    });
  });
  it("sums beyond int64 and Number safety; negative and zero net stay exact", async () => {
    const catalog = accounts();
    const max = "9223372036854775807";
    await append(fresh(catalog, max), catalog);
    await append(fresh(catalog, max), catalog);
    expect((await read(balanceQuery(catalog[0]))).balanceMinorUnits).toBe(
      18446744073709551614n,
    );
    await append(fresh(catalog, max, "credit"), catalog);
    await append(fresh(catalog, max, "credit"), catalog);
    expect((await read(balanceQuery(catalog[0]))).balanceMinorUnits).toBe(0n);
    await append(fresh(catalog, "9007199254740993", "credit"), catalog);
    expect((await read(balanceQuery(catalog[0]))).balanceMinorUnits).toBe(
      -9007199254740993n,
    );
  });
  it("isolates ledger, account and currency even when other identities overlap", async () => {
    const usd = accounts();
    const eur = usd.map((a) => ({ ...a, currency: "EUR" as const })) as [
      AccountCandidate,
      AccountCandidate,
    ];
    const otherLedger = usd.map((a) => ({
      ...a,
      ledgerId: balanceAccounts(++namespace)[0].ledgerId,
    })) as [AccountCandidate, AccountCandidate];
    // Both accounts in a journal must share the same ledger.
    otherLedger[1] = { ...otherLedger[1], ledgerId: otherLedger[0].ledgerId };
    await append(fresh(usd, "11"), usd);
    await append(fresh(eur, "23"), eur);
    await append(fresh(otherLedger, "37"), otherLedger);
    expect((await read(balanceQuery(usd[0]))).balanceMinorUnits).toBe(11n);
    expect((await read(balanceQuery(eur[0]))).balanceMinorUnits).toBe(23n);
    expect((await read(balanceQuery(otherLedger[0]))).balanceMinorUnits).toBe(
      37n,
    );
    expect(
      (await read(balanceQuery({ ...usd[0], currency: "GBP" })))
        .balanceMinorUnits,
    ).toBe(0n);
  });
  it.each(LEDGER_TRANSACTION_STATUSES)(
    "includes stored %s headers without inventing eligibility",
    async (status) => {
      const catalog = accounts();
      const journal = fresh(catalog, "7");
      await append(
        { ...journal, transaction: { ...journal.transaction, status } },
        catalog,
      );
      expect((await read(balanceQuery(catalog[0]))).balanceMinorUnits).toBe(7n);
    },
  );
  it.each(["effectiveThrough", "recordedThrough"] as const)(
    "applies inclusive %s boundaries independently",
    async (clock) => {
      const catalog = accounts();
      const query = balanceQuery(catalog[0]);
      const field = clock === "effectiveThrough" ? "effectiveAt" : "recordedAt";
      const instants = [
        "2024-02-29T12:00:00.000Z",
        "2024-02-29T12:00:00.001Z",
        "2024-02-29T12:00:00.002Z",
      ];
      for (const [index, instant] of instants.entries()) {
        const journal = fresh(catalog, ["1", "10", "100"][index]);
        await append(
          {
            ...journal,
            transaction: {
              ...journal.transaction,
              effectiveAt: "0001-01-01T00:00:00.000Z",
              recordedAt: "0001-01-01T00:00:00.000Z",
              [field]: instant,
            },
          },
          catalog,
        );
      }
      for (const [index, expected] of [1n, 11n, 111n].entries())
        expect(
          (
            await read({
              ...query,
              cutoffs: { ...query.cutoffs, [clock]: instants[index] },
            })
          ).balanceMinorUnits,
        ).toBe(expected);
      expect(
        (
          await read({
            ...query,
            cutoffs: { ...query.cutoffs, [clock]: "2024-02-29T11:59:59.999Z" },
          })
        ).balanceMinorUnits,
      ).toBe(0n);
    },
  );
  it("ANDs both clocks, retains independent ordering and full year-domain cutoffs", async () => {
    const catalog = accounts();
    const query = balanceQuery(catalog[0]);
    for (const [amount, effectiveAt, recordedAt] of [
      ["1", "0001-01-01T00:00:00.000Z", "9999-12-31T23:59:59.999Z"],
      ["10", "9999-12-31T23:59:59.999Z", "0001-01-01T00:00:00.000Z"],
      ["100", "0001-01-01T00:00:00.000Z", "0001-01-01T00:00:00.000Z"],
    ] as const) {
      const journal = fresh(catalog, amount);
      await append(
        {
          ...journal,
          transaction: { ...journal.transaction, effectiveAt, recordedAt },
        },
        catalog,
      );
    }
    expect((await read(query)).balanceMinorUnits).toBe(111n);
    expect(
      (
        await read({
          ...query,
          cutoffs: {
            effectiveThrough: "0001-01-01T00:00:00.000Z",
            recordedThrough: "0001-01-01T00:00:00.000Z",
          },
        })
      ).balanceMinorUnits,
    ).toBe(100n);
    expect(
      (
        await read({
          ...query,
          cutoffs: {
            ...query.cutoffs,
            recordedThrough: "0001-01-01T00:00:00.000Z",
          },
        })
      ).balanceMinorUnits,
    ).toBe(110n);
  });
  it.each(["category", "normalBalance"] as const)(
    "refuses contributing %s drift; excludes conflicts beyond cutoff",
    async (field) => {
      const original = accounts();
      const category = field === "category" ? "expense" : "liability";
      const alternative = balanceAccounts(++namespace, category).map(
        (a, i) => ({
          ...a,
          id: original[i]!.id,
          ledgerId: original[0].ledgerId,
        }),
      ) as [AccountCandidate, AccountCandidate];
      await append(fresh(original, "5"), original);
      const changed = fresh(alternative, "7");
      await append(
        {
          ...changed,
          transaction: {
            ...changed.transaction,
            effectiveAt: "2026-10-03T00:00:00.000Z",
          },
        },
        alternative,
      );
      const query = balanceQuery(original[0]);
      const result = await reader.query(query);
      expect(result.ok).toBe(false);
      expect(Object.hasOwn(result, "value")).toBe(false);
      if (!result.ok)
        expect(result.issues[0]?.code).toBe("conflicting_account_snapshot");
      expect(
        (
          await read({
            ...query,
            cutoffs: {
              ...query.cutoffs,
              effectiveThrough: "2026-10-02T23:59:59.999Z",
            },
          })
        ).balanceMinorUnits,
      ).toBe(5n);
      expect((await reader.query(balanceQuery(alternative[0]))).ok).toBe(false);
    },
  );
  it("does not claim name, owner or lifecycle metadata is authoritative current truth", async () => {
    const catalog = accounts();
    await append(fresh(catalog, "3"), catalog);
    const supplied = {
      ...catalog[0],
      name: "Other supplied label",
      owner: { namespace: "synthetic.other", id: "other" },
      status: "closed" as const,
    };
    expect((await read(balanceQuery(supplied))).balanceMinorUnits).toBe(3n);
  });
  it("never exposes uncommitted or rolled-back journals; later backdated commits change later reads", async () => {
    const catalog = accounts();
    const query = balanceQuery(catalog[0]);
    await writer.query("BEGIN");
    try {
      await direct(fresh(catalog, "17"), catalog);
      expect((await read(query)).balanceMinorUnits).toBe(0n);
    } finally {
      await writer.query("ROLLBACK");
    }
    expect((await read(query)).balanceMinorUnits).toBe(0n);
    await writer.query("BEGIN");
    try {
      await direct(fresh(catalog, "19"), catalog);
      expect((await read(query)).balanceMinorUnits).toBe(0n);
      await writer.query("COMMIT");
    } catch (error) {
      await writer.query("ROLLBACK");
      throw error;
    }
    expect((await read(query)).balanceMinorUnits).toBe(19n);
  });
  it("reports a complete committed aggregate during concurrent appends regardless of ordering", async () => {
    const catalog = accounts();
    const query = balanceQuery(catalog[0]);
    const journals = Array.from({ length: 12 }, () => fresh(catalog));
    const write = (async () => {
      for (const journal of [...journals].reverse())
        await append(journal, catalog);
    })();
    const observations = [];
    for (let i = 0; i < 16; i++) observations.push(await read(query));
    await write;
    for (const value of observations) {
      expect(value.balanceMinorUnits).toBe(value.entryCount * 1250n);
      expect(value.debitMinorUnits).toBe(value.balanceMinorUnits);
      expect(value.creditMinorUnits).toBe(0n);
      expect(value.transactionCount).toBe(value.entryCount);
      expect(value.entryCount <= 12n).toBe(true);
    }
    expect((await read(query)).balanceMinorUnits).toBe(15000n);
  });
});
