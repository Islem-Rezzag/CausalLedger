import { randomBytes } from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(
  new URL("../packages/ledger/package.json", import.meta.url),
);
const { Client } = require("pg");
const database = "causalledger_m04_05_disposable";
const owner = "causalledger_storage_owner";
const application = "causalledger_storage_app";
const flag = "YES_M04_05_SYNTHETIC_ONLY";
const connection = process.env.LEDGER_STORAGE_TEST_ADMIN_URL;
if (!connection || process.env.LEDGER_STORAGE_TEST_DISPOSABLE !== flag) {
  console.error(
    "FAIL: Explicit LEDGER_STORAGE_TEST_ADMIN_URL and disposable synthetic-only acknowledgement required. No DATABASE_URL fallback.",
  );
  process.exit(1);
}
let url;
try {
  url = new URL(connection);
} catch {
  throw new Error("Invalid explicit bootstrap connection URL.");
}
if (
  !["postgres:", "postgresql:"].includes(url.protocol) ||
  url.hostname !== "127.0.0.1" ||
  !url.port ||
  !url.username ||
  !url.password ||
  !["/causalledger_dev", "/causalledger_qa"].includes(url.pathname) ||
  url.search ||
  url.hash
) {
  throw new Error(
    "Refusing an unrecognized bootstrap target; use the isolated Compose loopback database.",
  );
}
const ownerPassword = randomBytes(32).toString("hex");
const appPassword = randomBytes(32).toString("hex");
const sanitize = (s) =>
  String(s)
    .replaceAll(connection, "<bootstrap-url>")
    .replaceAll(ownerPassword, "<owner-password>")
    .replaceAll(appPassword, "<app-password>")
    .replaceAll(decodeURIComponent(url.password), "<bootstrap-password>");
const roleUrl = (role, password) => {
  const result = new URL(connection);
  result.username = role;
  result.password = password;
  result.pathname = "/" + database;
  return result.href;
};
const migrationUrl = roleUrl(owner, ownerPassword);
const appUrl = roleUrl(application, appPassword);
const admin = new Client({
  connectionString: connection,
  connectionTimeoutMillis: 5000,
});
let ownerCreated = false,
  appCreated = false,
  databaseOid = null,
  ownerOid = null,
  appOid = null;
const child = (args, env) => {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    env,
    encoding: "utf8",
    timeout: 180000,
  });
  const output = sanitize((result.stdout ?? "") + (result.stderr ?? ""));
  console.log(output);
  if (result.status !== 0)
    throw new Error(
      "Required storage validation command failed: " +
        (result.error?.code ?? result.status),
    );
};
const migration = (direction, count) =>
  child(
    [
      fileURLToPath(
        new URL(
          "../node_modules/node-pg-migrate/bin/node-pg-migrate.js",
          import.meta.url,
        ),
      ),
      direction,
      ...(count === undefined ? [] : [String(count)]),
      "--migrations-dir",
      "infra/migrations",
      "--ignore-pattern",
      "README.md",
      "--database-url-var",
      "DATABASE_URL",
    ],
    { ...process.env, DATABASE_URL: migrationUrl },
  );
try {
  await admin.connect();
  const identity = (
    await admin.query(
      "SELECT current_database() AS database, current_setting('server_version_num')::integer AS version",
    )
  ).rows[0];
  if (
    identity.database !== url.pathname.slice(1) ||
    identity.version < 170000 ||
    identity.version >= 180000
  )
    throw new Error(
      "Disposable acceptance requires the verified bootstrap identity and PostgreSQL17.",
    );
  const existing = await admin.query(
    "SELECT datname AS name FROM pg_database WHERE datname=$1 UNION ALL SELECT rolname FROM pg_roles WHERE rolname IN ($2,$3)",
    [database, owner, application],
  );
  if (existing.rows.length)
    throw new Error(
      "Refusing existing storage test databases or roles; no existing resources will be reset.",
    );
  await admin.query(
    `CREATE ROLE ${owner} LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD '${ownerPassword}'`,
  );
  ownerCreated = true;
  ownerOid = (
    await admin.query("SELECT oid FROM pg_roles WHERE rolname=$1", [owner])
  ).rows[0].oid;
  await admin.query(
    `CREATE ROLE ${application} LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD '${appPassword}'`,
  );
  appCreated = true;
  appOid = (
    await admin.query("SELECT oid FROM pg_roles WHERE rolname=$1", [
      application,
    ])
  ).rows[0].oid;
  await admin.query(`CREATE DATABASE ${database} OWNER ${owner}`);
  databaseOid = (
    await admin.query("SELECT oid FROM pg_database WHERE datname=$1", [
      database,
    ])
  ).rows[0].oid;
  await admin.query(`REVOKE ALL ON DATABASE ${database} FROM PUBLIC`);
  await admin.query(`GRANT CONNECT ON DATABASE ${database} TO ${application}`);
  console.log(
    "PASS: Own disposable Postgres17 database and restricted separate identities provisioned: " +
      database,
  );
  migration("up");
  migration("down", 3);
  migration("up");
  console.log("PASS: Empty disposable THREE migrations up/down/up recovery");
  // Three migrations were fully removed/rebuilt on empty storage. Stage a real legacy upgrade too.
  migration("down", 2);
  const upgrade = new Client({ connectionString: migrationUrl });
  await upgrade.connect();
  let legacyBefore;
  try {
    const id = (prefix, n) => prefix + String(n).padStart(26, "0");
    const ledgerId = id("ldg_", 9000000),
      accountId = id("acct_", 9000000);
    const accounts = [
      {
        storageVersion: "m04.05-account-snapshot.v1",
        account: {
          contractVersion: "m04.01-account.v1",
          id: accountId,
          ledgerId,
          name: {
            representation: "utf16_code_units",
            units: [83, 121, 110, 116, 104, 101, 116, 105, 99],
          },
          category: "asset",
          normalBalance: "debit",
          currency: "USD",
          owner: { namespace: "synthetic.owner", id: "upgrade" },
          status: "active",
        },
      },
    ];
    for (const n of [9000000, 9000001]) {
      const transactionId = id("txn_", n);
      const journal = {
        contractVersion: "m04.04-ledger-journal.v1",
        transaction: {
          contractVersion: "m04.02-ledger-transaction.v1",
          id: transactionId,
          ledgerId,
          status: "pending",
          effectiveAt: "2026-10-02T10:00:00.000Z",
          recordedAt: "2026-10-02T10:01:00.000Z",
          idempotencyKey: "legacy.shared-key",
          provenance: {
            source: { namespace: "synthetic.upgrade", id: "same" },
            moneyEventIds: [],
            evidence: [
              {
                receiptId: id("rcpt_", 9000000),
                contentHash: "sha256:" + "a".repeat(64),
              },
            ],
          },
        },
        entries: ["debit", "credit"].map((side, i) => ({
          contractVersion: "m04.03-ledger-entry.v1",
          id: id("ent_", n * 100 + i + 1),
          transactionId,
          ledgerId,
          accountId,
          side,
          amount: {
            representation: "integer_minor_units",
            minorUnits: "1250",
            currency: "USD",
          },
        })),
      };
      await upgrade.query(
        "SELECT public.append_ledger_journal($1::jsonb,$2::jsonb)",
        [JSON.stringify(journal), JSON.stringify(accounts)],
      );
    }
    legacyBefore = (
      await upgrade.query(
        "SELECT jsonb_build_object('transactions',(SELECT jsonb_agg(to_jsonb(t) ORDER BY id) FROM public.ledger_transactions t),'accounts',(SELECT jsonb_agg(to_jsonb(a) ORDER BY transaction_id,account_id) FROM public.ledger_account_snapshots a),'entries',(SELECT jsonb_agg(to_jsonb(e) ORDER BY id) FROM public.ledger_entries e))::text AS snapshot",
      )
    ).rows[0].snapshot;
  } finally {
    await upgrade.end();
  }
  migration("up", 1); // Install08 over populated05 first.
  const checkpoint = new Client({ connectionString: migrationUrl });
  await checkpoint.connect();
  let history08;
  try {
    const legacyAfter = (
      await checkpoint.query(
        "SELECT jsonb_build_object('transactions',(SELECT jsonb_agg(to_jsonb(t) ORDER BY id) FROM public.ledger_transactions t),'accounts',(SELECT jsonb_agg(to_jsonb(a) ORDER BY transaction_id,account_id) FROM public.ledger_account_snapshots a),'entries',(SELECT jsonb_agg(to_jsonb(e) ORDER BY id) FROM public.ledger_entries e))::text AS snapshot",
      )
    ).rows[0].snapshot;
    if (
      legacyBefore !== legacyAfter ||
      (
        await checkpoint.query(
          "SELECT count(*)::text AS count FROM public.ledger_idempotency_keys",
        )
      ).rows[0].count !== "0"
    )
      throw new Error("Additive08 upgrade changed/adopted legacy history");
    console.log(
      "PASS: Populated M04.05-to-M04.08 upgrade preserves both shared-key legacy journals exactly; no backfill",
    );
    // Explicitly reserve a third synthetic journal through08 before installing09; no guessed key adoption.
    await checkpoint.query(`SELECT public.append_idempotent_ledger_journal(
      jsonb_build_object('contractVersion',t.journal_version,'transaction',t.header || jsonb_build_object('id','txn_00000000000000000009000002','idempotencyKey','synthetic.upgrade.reserved'),
        'entries',(SELECT jsonb_agg(jsonb_build_object('contractVersion',e.contract_version,'id','ent_' || lpad((900000200+CASE WHEN e.side='debit' THEN 1 ELSE 2 END)::text,26,'0'),
          'transactionId','txn_00000000000000000009000002','ledgerId',e.ledger_id,'accountId',e.account_id,'side',e.side,
          'amount',jsonb_build_object('representation','integer_minor_units','minorUnits',e.minor_units::text,'currency',e.currency))) FROM public.ledger_entries e WHERE e.transaction_id=t.id)),
      (SELECT jsonb_agg(a.snapshot ORDER BY a.account_id) FROM public.ledger_account_snapshots a WHERE a.transaction_id=t.id))
      FROM public.ledger_transactions t WHERE t.id='txn_00000000000000000009000000'`);
    history08 = (
      await checkpoint.query(
        "SELECT jsonb_build_object('transactions',(SELECT jsonb_agg(to_jsonb(t) ORDER BY id) FROM public.ledger_transactions t),'accounts',(SELECT jsonb_agg(to_jsonb(a) ORDER BY transaction_id,account_id) FROM public.ledger_account_snapshots a),'entries',(SELECT jsonb_agg(to_jsonb(e) ORDER BY id) FROM public.ledger_entries e),'keys',(SELECT jsonb_agg(to_jsonb(k) ORDER BY ledger_id,source_namespace,idempotency_key) FROM public.ledger_idempotency_keys k))::text AS snapshot",
      )
    ).rows[0].snapshot;
  } finally {
    await checkpoint.end();
  }
  migration("up");
  const inspect = new Client({ connectionString: migrationUrl });
  await inspect.connect();
  try {
    const history09 = (
      await inspect.query(
        "SELECT jsonb_build_object('transactions',(SELECT jsonb_agg(to_jsonb(t) ORDER BY id) FROM public.ledger_transactions t),'accounts',(SELECT jsonb_agg(to_jsonb(a) ORDER BY transaction_id,account_id) FROM public.ledger_account_snapshots a),'entries',(SELECT jsonb_agg(to_jsonb(e) ORDER BY id) FROM public.ledger_entries e),'keys',(SELECT jsonb_agg(to_jsonb(k) ORDER BY ledger_id,source_namespace,idempotency_key) FROM public.ledger_idempotency_keys k))::text AS snapshot",
      )
    ).rows[0].snapshot;
    if (
      history08 !== history09 ||
      (
        await inspect.query(
          "SELECT count(*)::text AS count FROM public.ledger_reversals",
        )
      ).rows[0].count !== "0"
    )
      throw new Error("Additive09 upgrade changed/adopted populated08 history");
    console.log(
      "PASS: Populated M04.08-to-M04.09 upgrade preserves all journals/snapshots/entries and reserved key exactly; no reversal backfill",
    );
    const tables = (
      await inspect.query(
        "SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename",
      )
    ).rows.map((row) => row.tablename);
    if (
      JSON.stringify(tables) !==
      JSON.stringify([
        "ledger_account_snapshots",
        "ledger_entries",
        "ledger_idempotency_keys",
        "ledger_reversals",
        "ledger_transactions",
        "pgmigrations",
      ])
    )
      throw new Error("Unexpected storage schema objects");
    const functions = (
      await inspect.query(
        "SELECT p.proname FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' ORDER BY p.proname",
      )
    ).rows.map((row) => row.proname);
    if (
      JSON.stringify(functions) !==
      JSON.stringify([
        "append_idempotent_ledger_journal",
        "append_ledger_journal",
        "append_ledger_reversal",
        "ledger_account",
        "ledger_deny_mutation",
        "ledger_header",
        "ledger_idempotency_payload",
        "ledger_instant",
        "ledger_object",
        "ledger_strings",
      ])
    )
      throw new Error("Unexpected storage functions");
    console.log(
      "PASS: Exact disposable public schema tables/functions inspected: " +
        tables.join(", "),
    );
  } finally {
    await inspect.end();
  }
  const testEnv = {
    ...process.env,
    LEDGER_STORAGE_TEST_OWNER_URL: migrationUrl,
    LEDGER_STORAGE_TEST_APP_URL: appUrl,
    LEDGER_STORAGE_TEST_DATABASE: database,
  };
  delete testEnv.LEDGER_STORAGE_TEST_ADMIN_URL;
  delete testEnv.DATABASE_URL;
  child(
    [
      fileURLToPath(
        new URL(
          "../packages/ledger/node_modules/vitest/vitest.mjs",
          import.meta.url,
        ),
      ),
      "run",
      "test/ledger-storage-postgres.test.ts",
      "--root",
      "packages/ledger",
    ],
    testEnv,
  );
  console.log("PASS: Mandatory real PostgreSQL storage acceptance completed");
  // Run sequentially in the same owned database; keep M04.05 acceptance mandatory.
  child(
    [
      fileURLToPath(
        new URL(
          "../packages/ledger/node_modules/vitest/vitest.mjs",
          import.meta.url,
        ),
      ),
      "run",
      "test/ledger-account-balance-postgres.test.ts",
      "--root",
      "packages/ledger",
    ],
    testEnv,
  );
  console.log(
    "PASS: Mandatory real PostgreSQL account balance acceptance completed",
  );
  child(
    [
      fileURLToPath(
        new URL(
          "../packages/ledger/node_modules/vitest/vitest.mjs",
          import.meta.url,
        ),
      ),
      "run",
      "test/ledger-transaction-query-postgres.test.ts",
      "--root",
      "packages/ledger",
    ],
    testEnv,
  );
  console.log(
    "PASS: Mandatory real PostgreSQL transaction query acceptance completed",
  );
  child(
    [
      fileURLToPath(
        new URL(
          "../packages/ledger/node_modules/vitest/vitest.mjs",
          import.meta.url,
        ),
      ),
      "run",
      "test/ledger-idempotency-postgres.test.ts",
      "--root",
      "packages/ledger",
    ],
    testEnv,
  );
  console.log(
    "PASS: Mandatory real PostgreSQL idempotency acceptance completed",
  );
  child(
    [
      fileURLToPath(
        new URL(
          "../packages/ledger/node_modules/vitest/vitest.mjs",
          import.meta.url,
        ),
      ),
      "run",
      "test/ledger-reversal-postgres.test.ts",
      "--root",
      "packages/ledger",
    ],
    testEnv,
  );
  console.log("PASS: Mandatory real PostgreSQL reversal acceptance completed");
  child(
    [
      fileURLToPath(
        new URL(
          "../packages/ledger/node_modules/vitest/vitest.mjs",
          import.meta.url,
        ),
      ),
      "run",
      "test/cash-clearing-account-postgres.test.ts",
      "--root",
      "packages/ledger",
    ],
    testEnv,
  );
  console.log(
    "PASS: Mandatory real PostgreSQL cash clearing composition acceptance completed",
  );
  child(
    [
      fileURLToPath(
        new URL(
          "../packages/ledger/node_modules/vitest/vitest.mjs",
          import.meta.url,
        ),
      ),
      "run",
      "test/provider-clearing-account-postgres.test.ts",
      "--root",
      "packages/ledger",
    ],
    testEnv,
  );
  console.log(
    "PASS: Mandatory real PostgreSQL provider clearing composition acceptance completed",
  );
} catch (error) {
  console.error("FAIL: " + sanitize(error.message));
  process.exitCode = 1;
} finally {
  try {
    // Verify exact identities again; never drop pre-existing or replaced resources.
    if (databaseOid !== null) {
      const actual = (
        await admin.query(
          "SELECT oid,datdba FROM pg_database WHERE datname=$1",
          [database],
        )
      ).rows[0];
      if (!actual || actual.oid !== databaseOid || actual.datdba !== ownerOid)
        throw new Error("Cleanup refused changed database identity/owner");
      await admin.query(`DROP DATABASE ${database} WITH (FORCE)`);
    }
    for (const [created, role, oid] of [
      [appCreated, application, appOid],
      [ownerCreated, owner, ownerOid],
    ]) {
      if (!created) continue;
      const actual = (
        await admin.query("SELECT oid FROM pg_roles WHERE rolname=$1", [role])
      ).rows[0];
      if (!actual || actual.oid !== oid)
        throw new Error("Cleanup refused changed role identity");
      await admin.query(`DROP ROLE ${role}`);
    }
    if (ownerCreated || appCreated || databaseOid !== null)
      console.log("PASS: Own disposable storage database/roles cleaned");
  } catch (error) {
    console.error("FAIL: cleanup " + sanitize(error.message));
    process.exitCode = 1;
  }
  await admin.end();
}
