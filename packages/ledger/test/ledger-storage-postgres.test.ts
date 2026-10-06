import pg from "pg";
import { createRequire } from "node:module";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createLedgerJournalStore,
  validateLedgerJournalCandidate,
  LEDGER_STORAGE_CONTRACT_VERSION,
} from "../src/index.js";
import type {
  AccountCandidate,
  LedgerJournalCandidate,
  LedgerJournalStore,
} from "../src/index.js";
import {
  storageAccounts,
  storageJournal,
  syntheticId,
} from "./storage-synthetic.js";

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
    url.hostname !== "127.0.0.1" ||
    url.pathname !== "/" + database ||
    url.username !== role ||
    !url.password ||
    !url.port ||
    url.search
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
const app = new pg.Client({ connectionString: appUrl });
let store: LedgerJournalStore;
let serial = 100;
const fresh = (): LedgerJournalCandidate => storageJournal(++serial);
function snapshots(accounts = storageAccounts()): unknown[] {
  return accounts.map((account) => ({
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
function referenced(
  journal: LedgerJournalCandidate,
  accounts = storageAccounts(),
): unknown[] {
  return snapshots(
    accounts.filter((a) => journal.entries.some((e) => e.accountId === a.id)),
  );
}
async function direct(
  journal: unknown,
  accounts: unknown,
): Promise<pg.QueryResult> {
  return app.query(
    "SELECT public.append_ledger_journal($1::jsonb,$2::jsonb) AS receipt",
    [JSON.stringify(journal), JSON.stringify(accounts)],
  );
}
async function counts(id: string): Promise<unknown> {
  return (
    await owner.query(
      "SELECT (SELECT count(*) FROM public.ledger_transactions WHERE id=$1)::text AS transactions, (SELECT count(*) FROM public.ledger_account_snapshots WHERE transaction_id=$1)::text AS accounts, (SELECT count(*) FROM public.ledger_entries WHERE transaction_id=$1)::text AS entries",
      [id],
    )
  ).rows[0];
}
async function absent(journal: LedgerJournalCandidate): Promise<void> {
  expect(await counts(journal.transaction.id)).toEqual({
    transactions: "0",
    accounts: "0",
    entries: "0",
  });
}
async function readback(
  client: pg.Client,
  journal: LedgerJournalCandidate,
  expectedAccounts = storageAccounts(),
): Promise<void> {
  const header = (
    await client.query(
      "SELECT journal_version,header FROM public.ledger_transactions WHERE id=$1",
      [journal.transaction.id],
    )
  ).rows;
  expect(header).toEqual([
    { journal_version: journal.contractVersion, header: journal.transaction },
  ]);
  const rows = (
    await client.query(
      'SELECT id,transaction_id,ledger_id,account_id,contract_version,side,representation,minor_units::text AS amount,currency FROM public.ledger_entries WHERE transaction_id=$1 ORDER BY id COLLATE "C"',
      [journal.transaction.id],
    )
  ).rows as {
    id: string;
    transaction_id: string;
    ledger_id: string;
    account_id: string;
    contract_version: string;
    side: string;
    representation: string;
    amount: string;
    currency: string;
  }[];
  const entries = rows.map((r) => ({
    contractVersion: r.contract_version,
    id: r.id,
    transactionId: r.transaction_id,
    ledgerId: r.ledger_id,
    accountId: r.account_id,
    side: r.side,
    amount: {
      representation: r.representation,
      minorUnits: r.amount,
      currency: r.currency,
    },
  }));
  expect(entries).toEqual(
    [...journal.entries].sort((a, b) =>
      a.id < b.id ? -1 : a.id > b.id ? 1 : 0,
    ),
  );
  const stored = (
    await client.query(
      'SELECT snapshot FROM public.ledger_account_snapshots WHERE transaction_id=$1 ORDER BY account_id COLLATE "C"',
      [journal.transaction.id],
    )
  ).rows as {
    snapshot: {
      storageVersion: string;
      account: Omit<AccountCandidate, "name"> & {
        name: { representation: string; units: number[] };
      };
    };
  }[];
  const accounts = stored.map(({ snapshot }) => {
    expect(snapshot.storageVersion).toBe("m04.05-account-snapshot.v1");
    expect(snapshot.account.name.representation).toBe("utf16_code_units");
    return {
      ...snapshot.account,
      name: String.fromCharCode(...snapshot.account.name.units),
    };
  });
  expect(accounts).toEqual(
    expectedAccounts
      .filter((a) => journal.entries.some((e) => e.accountId === a.id))
      .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
  );
  const result = validateLedgerJournalCandidate(
    { ...journal, transaction: header[0]?.header, entries },
    accounts,
  );
  expect(result.ok).toBe(true);
  const original = validateLedgerJournalCandidate(journal, expectedAccounts);
  expect(result).toEqual(original);
}
beforeAll(async () => {
  await owner.connect();
  await app.connect();
  for (const [client, role] of [
    [owner, "causalledger_storage_owner"],
    [app, "causalledger_storage_app"],
  ] as const) {
    const row = (
      await client.query(
        "SELECT current_database() AS db,current_user AS role,current_setting('server_version_num')::integer AS version",
      )
    ).rows[0];
    expect(row.db).toBe(database);
    expect(row.role).toBe(role);
    expect(row.version).toBeGreaterThanOrEqual(170000);
    expect(row.version).toBeLessThan(180000);
  }
  store = createLedgerJournalStore(appUrl);
});
afterAll(async () => {
  await store?.close();
  await app.end();
  await owner.end();
});

describe("mandatory real PostgreSQL17 immutable synthetic storage", () => {
  it("refuses globally offset amounts that are unbalanced within each currency", async () => {
    const journal = fresh();
    const credit = journal.entries[1];
    if (!credit) throw new Error("fixture");
    const drift = {
      ...journal,
      entries: [
        journal.entries[0],
        {
          ...credit,
          accountId: storageAccounts()[1]?.id,
          amount: { ...credit.amount, currency: "EUR" },
        },
      ],
    };
    await expect(
      direct(drift, snapshots(storageAccounts().slice(0, 2))),
    ).rejects.toMatchObject({ code: "23514" });
    await absent(journal);
  });
  it("concurrent duplicate durable transaction identity stores exactly one complete journal", async () => {
    const journal = fresh();
    const second = createLedgerJournalStore(appUrl);
    try {
      const results = await Promise.allSettled([
        store.append(journal, storageAccounts()),
        second.append(journal, storageAccounts()),
      ]);
      expect(
        results.filter((result) => result.status === "fulfilled"),
      ).toHaveLength(1);
      const failure = results.find((result) => result.status === "rejected");
      expect(failure).toMatchObject({
        status: "rejected",
        reason: { outcome: "not_stored", sqlState: "23505" },
      });
      await readback(app, journal);
      expect(await counts(journal.transaction.id)).toEqual({
        transactions: "1",
        accounts: "1",
        entries: "2",
      });
    } finally {
      await second.close();
    }
  });
  it("stores a complete USD1250 journal and reads exact metadata/entries through another connection", async () => {
    const journal = fresh();
    const original = structuredClone(journal);
    expect(await store.append(journal, storageAccounts())).toEqual({
      ok: true,
      receipt: {
        contractVersion: LEDGER_STORAGE_CONTRACT_VERSION,
        transactionId: journal.transaction.id,
        entryCount: 2,
      },
    });
    expect(journal).toEqual(original);
    await readback(app, journal);
  });
  it.each(["pending", "posted", "rejected", "voided"] as const)(
    "preserves supplied %s status and both clocks without eligibility or state transitions",
    async (status) => {
      const base = fresh();
      const journal = {
        ...base,
        transaction: {
          ...base.transaction,
          status,
          effectiveAt: "0001-01-01T00:00:00.000Z",
          recordedAt: "9999-12-31T23:59:59.999Z",
        },
      };
      expect((await store.append(journal, storageAccounts())).ok).toBe(true);
      await readback(app, journal);
    },
  );
  it("keeps maximum lines, above-Number-safe amounts and larger aggregate totals exact in every currency", async () => {
    const journal = storageJournal(
      ++serial,
      ["9223372036854775807", "9007199254740993", "9223372036854775807"],
      ["USD", "EUR", "GBP"],
    );
    expect((await store.append(journal, storageAccounts())).ok).toBe(true);
    await readback(app, journal);
    const sums = (
      await app.query(
        "SELECT currency,sum(minor_units::numeric)::text AS amount FROM public.ledger_entries WHERE transaction_id=$1 AND side='debit' GROUP BY currency ORDER BY currency",
        [journal.transaction.id],
      )
    ).rows;
    expect(sums).toEqual(
      ["EUR", "GBP", "USD"].map((currency) => ({
        currency,
        amount: "18455751272964292607",
      })),
    );
  });
  it.each([
    "Synthetic 😀",
    "Synthetic \ud800",
    "Synthetic \udfff",
    "é漢字",
    "A".repeat(120),
    "😀".repeat(60),
  ])(
    "preserves every accepted UTF-16 account name without JSONB loss: %s",
    async (name) => {
      const journal = fresh();
      const accounts = storageAccounts().map((a) => ({
        ...a,
        name,
        status: "closed" as const,
      }));
      expect((await store.append(journal, accounts)).ok).toBe(true);
      await readback(app, journal, accounts);
    },
  );
  it("retains complete multi-reference provenance and treats retry keys as metadata only", async () => {
    const journal = fresh();
    const richer = {
      ...journal,
      transaction: {
        ...journal.transaction,
        provenance: {
          ...journal.transaction.provenance,
          moneyEventIds: [`evt_${syntheticId(1)}`, `evt_${syntheticId(2)}`],
          evidence: [
            ...journal.transaction.provenance.evidence,
            {
              receiptId: `rcpt_${syntheticId(2)}`,
              contentHash: `sha256:${"a".repeat(64)}`,
            },
          ],
        },
      },
    };
    expect((await store.append(richer, storageAccounts())).ok).toBe(true);
    await readback(app, richer);
    const second = fresh();
    expect(second.transaction.idempotencyKey).toBe(
      richer.transaction.idempotencyKey,
    );
    expect((await store.append(second, storageAccounts())).ok).toBe(true);
    await readback(app, second);
  });
  it.each([
    "unbalanced",
    "empty",
    "one-sided",
    "duplicate",
    "orphan",
    "wrong-ledger",
    "wrong-header",
    "currency",
    "amount-number",
    "negative",
    "zero",
    "overflow",
    "unknown",
  ])("rejects %s before durable storage", async (mutation) => {
    const journal = fresh();
    const raw = structuredClone(journal) as unknown as {
      entries: Record<string, unknown>[];
      transaction: Record<string, unknown>;
      [key: string]: unknown;
    };
    const entry = raw.entries[1];
    if (!entry) throw new Error("fixture");
    const amount = entry.amount as Record<string, unknown>;
    if (mutation === "unbalanced") amount.minorUnits = "1249";
    if (mutation === "empty") raw.entries = [];
    if (mutation === "one-sided") raw.entries = raw.entries.slice(0, 1);
    if (mutation === "duplicate") raw.entries = [entry, entry];
    if (mutation === "orphan") entry.accountId = `acct_${syntheticId(99)}`;
    if (mutation === "wrong-ledger") entry.ledgerId = `ldg_${syntheticId(99)}`;
    if (mutation === "wrong-header")
      entry.transactionId = `txn_${syntheticId(99)}`;
    if (mutation === "currency") amount.currency = "EUR";
    if (mutation === "amount-number") amount.minorUnits = 1250;
    if (mutation === "negative") amount.minorUnits = "-1";
    if (mutation === "zero") amount.minorUnits = "0";
    if (mutation === "overflow") amount.minorUnits = "9223372036854775808";
    if (mutation === "unknown") raw.approved = true;
    expect((await store.append(raw, storageAccounts())).ok).toBe(false);
    await absent(journal);
  });
  it.each([
    "unbalanced",
    "one-sided",
    "empty",
    "duplicate",
    "orphan",
    "currency",
    "wrong-header",
    "wrong-ledger",
    "leading-zero",
    "amount-number",
    "zero",
    "overflow",
    "version",
    "header-provenance",
    "header-date",
    "header-extra",
  ])(
    "database routine independently refuses %s and rolls back every inserted row",
    async (mutation) => {
      const journal = fresh();
      const raw = structuredClone(journal) as unknown as {
        entries: Record<string, unknown>[];
        transaction: Record<string, unknown>;
        [key: string]: unknown;
      };
      const entry = raw.entries[1];
      if (!entry) throw new Error("fixture");
      const amount = entry.amount as Record<string, unknown>;
      if (mutation === "unbalanced") amount.minorUnits = "1249";
      if (mutation === "one-sided") raw.entries = raw.entries.slice(0, 1);
      if (mutation === "empty") raw.entries = [];
      if (mutation === "duplicate") raw.entries = [entry, entry];
      if (mutation === "orphan") entry.accountId = `acct_${syntheticId(99)}`;
      if (mutation === "currency") amount.currency = "EUR";
      if (mutation === "wrong-header")
        entry.transactionId = `txn_${syntheticId(99)}`;
      if (mutation === "wrong-ledger")
        entry.ledgerId = `ldg_${syntheticId(99)}`;
      if (mutation === "leading-zero") amount.minorUnits = "01250";
      if (mutation === "amount-number") amount.minorUnits = 1250;
      if (mutation === "zero") amount.minorUnits = "0";
      if (mutation === "overflow") amount.minorUnits = "9223372036854775808";
      if (mutation === "version") raw.contractVersion = "future";
      if (mutation === "header-provenance") raw.transaction.provenance = {};
      if (mutation === "header-date")
        raw.transaction.effectiveAt = "2026-02-30T00:00:00.000Z";
      if (mutation === "header-extra") raw.transaction.approved = true;
      await expect(direct(raw, referenced(journal))).rejects.toBeDefined();
      await absent(journal);
    },
  );
  it.each([
    "missing",
    "duplicate",
    "wrong-ledger",
    "wrong-currency",
    "normal-side",
    "unknown",
    "name-control",
    "name-long",
    "name-whitespace",
    "name-fraction",
    "unused",
  ])(
    "refuses invalid stored account snapshot %s atomically",
    async (mutation) => {
      const journal = fresh();
      const all = referenced(journal) as { account: Record<string, unknown> }[];
      const a = all[0]?.account;
      if (!a) throw new Error("fixture");
      if (mutation === "missing") all.splice(0);
      if (mutation === "duplicate")
        all.push(all[0] as { account: Record<string, unknown> });
      if (mutation === "wrong-ledger") a.ledgerId = `ldg_${syntheticId(99)}`;
      if (mutation === "wrong-currency") a.currency = "EUR";
      if (mutation === "normal-side") a.normalBalance = "credit";
      if (mutation === "unknown") a.approved = true;
      if (mutation === "name-control")
        a.name = { representation: "utf16_code_units", units: [0] };
      if (mutation === "name-long")
        a.name = {
          representation: "utf16_code_units",
          units: Array(121).fill(65),
        };
      if (mutation === "name-whitespace")
        a.name = { representation: "utf16_code_units", units: [160, 65] };
      if (mutation === "name-fraction")
        a.name = { representation: "utf16_code_units", units: [65.5] };
      if (mutation === "unused")
        all.push(snapshots()[1] as { account: Record<string, unknown> });
      await expect(direct(journal, all)).rejects.toBeDefined();
      await absent(journal);
    },
  );
  it("refuses duplicate durable transaction/entry IDs and extending a committed journal, preserving original", async () => {
    const original = fresh();
    expect((await store.append(original, storageAccounts())).ok).toBe(true);
    await expect(
      store.append(original, storageAccounts()),
    ).rejects.toMatchObject({ outcome: "not_stored", sqlState: "23505" });
    const extension = {
      ...original,
      entries: original.entries.map((e, i) => ({
        ...e,
        id: `ent_${syntheticId(99900 + i)}`,
      })),
    };
    await expect(direct(extension, referenced(original))).rejects.toMatchObject(
      { code: "23505" },
    );
    const second = fresh();
    const collision = {
      ...second,
      entries: second.entries.map((e, i) => ({
        ...e,
        id: original.entries[i]?.id ?? e.id,
      })),
    };
    await expect(
      store.append(collision, storageAccounts()),
    ).rejects.toMatchObject({ sqlState: "23505" });
    await absent(second);
    await readback(app, original);
  });
  it("rolls back explicit outer SQL transactions and a failure after some entries inserted", async () => {
    const journal = fresh();
    await app.query("BEGIN");
    try {
      await direct(journal, referenced(journal));
    } finally {
      await app.query("ROLLBACK");
    }
    await absent(journal);
    const failed = fresh();
    const failId = failed.entries[1]?.id;
    if (!failId) throw new Error("fixture");
    await owner.query(
      `CREATE FUNCTION public.storage_test_fail() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW.id='${failId}' THEN RAISE EXCEPTION 'forced synthetic second entry failure' USING ERRCODE='22023'; END IF; RETURN NEW; END $$; CREATE TRIGGER storage_test_failure BEFORE INSERT ON public.ledger_entries FOR EACH ROW EXECUTE FUNCTION public.storage_test_fail()`,
    );
    try {
      await expect(
        store.append(failed, storageAccounts()),
      ).rejects.toMatchObject({ outcome: "not_stored", sqlState: "22023" });
      await absent(failed);
    } finally {
      await owner.query(
        "DROP TRIGGER storage_test_failure ON public.ledger_entries; DROP FUNCTION public.storage_test_fail()",
      );
    }
  });
  it("refuses SQL orphan references and database zero/negative/range errors", async () => {
    const journal = fresh();
    expect((await store.append(journal, storageAccounts())).ok).toBe(true);
    const entry = journal.entries[0];
    if (!entry) throw new Error("fixture");
    const sql =
      "INSERT INTO public.ledger_entries(id,transaction_id,ledger_id,account_id,contract_version,side,representation,minor_units,currency) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)";
    const values = [
      `ent_${syntheticId(99800)}`,
      entry.transactionId,
      entry.ledgerId,
      entry.accountId,
      entry.contractVersion,
      entry.side,
      entry.amount.representation,
      "1250",
      entry.amount.currency,
    ];
    for (const [index, value, code] of [
      [1, `txn_${syntheticId(99)}`, "23503"],
      [3, `acct_${syntheticId(99)}`, "23503"],
      [8, "EUR", "23503"],
      [7, "0", "23514"],
      [7, "-1", "23514"],
      [7, "9223372036854775808", "22003"],
    ] as const) {
      const changed = [...values];
      changed[index] = value;
      await expect(owner.query(sql, changed)).rejects.toMatchObject({ code });
    }
    await readback(app, journal);
  });
  it.each([
    "ledger_transactions",
    "ledger_account_snapshots",
    "ledger_entries",
  ])(
    "application cannot update/delete/truncate/partially insert or alter %s",
    async (table) => {
      const journal = fresh();
      expect((await store.append(journal, storageAccounts())).ok).toBe(true);
      for (const sql of [
        `UPDATE public.${table} SET ${table === "ledger_transactions" ? "ledger_id" : "ledger_id"}=ledger_id`,
        `DELETE FROM public.${table}`,
        `TRUNCATE public.${table} CASCADE`,
        `INSERT INTO public.${table} DEFAULT VALUES`,
        `ALTER TABLE public.${table} DISABLE TRIGGER ALL`,
        `DROP TABLE public.${table} CASCADE`,
      ])
        await expect(app.query(sql)).rejects.toMatchObject({ code: "42501" });
      await readback(app, journal);
    },
  );
  it("checks restricted ownership, no owner membership, safe definer path and revoked public/helper execution", async () => {
    const roles = (
      await owner.query(
        "SELECT rolname,rolsuper,rolcreatedb,rolcreaterole,rolbypassrls,rolreplication FROM pg_roles WHERE rolname IN ('causalledger_storage_owner','causalledger_storage_app') ORDER BY rolname",
      )
    ).rows;
    expect(roles).toHaveLength(2);
    for (const role of roles)
      expect([
        role.rolsuper,
        role.rolcreatedb,
        role.rolcreaterole,
        role.rolbypassrls,
        role.rolreplication,
      ]).toEqual([false, false, false, false, false]);
    expect(
      (
        await owner.query(
          "SELECT pg_has_role('causalledger_storage_app','causalledger_storage_owner','MEMBER') AS member",
        )
      ).rows,
    ).toEqual([{ member: false }]);
    const routine = (
      await owner.query(
        "SELECT p.prosecdef,p.proconfig,r.rolname FROM pg_proc p JOIN pg_roles r ON r.oid=p.proowner WHERE p.oid='public.append_ledger_journal(jsonb,jsonb)'::regprocedure",
      )
    ).rows[0];
    expect(routine).toEqual({
      prosecdef: true,
      proconfig: ["search_path=pg_catalog, pg_temp"],
      rolname: "causalledger_storage_owner",
    });
    expect(
      (
        await owner.query(
          "SELECT count(*)::text AS count FROM pg_proc p, LATERAL aclexplode(p.proacl) acl WHERE p.oid='public.append_ledger_journal(jsonb,jsonb)'::regprocedure AND acl.grantee=0 AND acl.privilege_type='EXECUTE'",
        )
      ).rows,
    ).toEqual([{ count: "0" }]);
    await expect(
      app.query("SELECT public.ledger_header('{}'::jsonb)"),
    ).rejects.toMatchObject({ code: "42501" });
    await expect(
      app.query("SET ROLE causalledger_storage_owner"),
    ).rejects.toMatchObject({ code: "42501" });
    await expect(
      app.query("CREATE TABLE public.storage_intruder(id integer)"),
    ).rejects.toMatchObject({ code: "42501" });
    await expect(
      app.query("CREATE TEMP TABLE storage_intruder(id integer)"),
    ).rejects.toMatchObject({ code: "42501" });
    await app.query("SET search_path=pg_temp,public");
    const journal = fresh();
    await direct(journal, referenced(journal));
    await readback(app, journal);
  });
  it("immutable triggers also refuse trusted-role update/delete and down migration refuses populated history", async () => {
    const journal = fresh();
    expect((await store.append(journal, storageAccounts())).ok).toBe(true);
    await expect(
      owner.query(
        "UPDATE public.ledger_transactions SET ledger_id=ledger_id WHERE id=$1",
        [journal.transaction.id],
      ),
    ).rejects.toMatchObject({ code: "55000" });
    await expect(
      owner.query("DELETE FROM public.ledger_entries WHERE transaction_id=$1", [
        journal.transaction.id,
      ]),
    ).rejects.toMatchObject({ code: "55000" });
    const require = createRequire(import.meta.url);
    const migration =
      require("../../../infra/migrations/1780000000000_m04_05_immutable_journal.cjs") as {
        down: (pgm: {
          sql: (sql: string) => Promise<unknown>;
        }) => Promise<unknown>;
      };
    await expect(
      migration.down({ sql: (sql) => owner.query(sql) }),
    ).rejects.toThrow("Down migration refuses stored history");
    await readback(app, journal);
  });
  it("durable original survives closing and reopening an independent application connection", async () => {
    const journal = fresh();
    expect((await store.append(journal, storageAccounts())).ok).toBe(true);
    const reconnect = new pg.Client({ connectionString: appUrl });
    await reconnect.connect();
    try {
      await readback(reconnect, journal);
    } finally {
      await reconnect.end();
    }
  });
});
