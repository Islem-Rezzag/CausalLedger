import type { AccountCurrency, LedgerReversalCandidate } from "../src/index.js";
import { LEDGER_REVERSAL_CONTRACT_VERSION } from "../src/index.js";
import {
  CATEGORIES,
  CURRENCIES,
  NORMAL_SIDE,
  SHAPES,
  ROLE_CASES,
  materialize,
  permute,
} from "./balanced-posting-corpus.js";
import type { CorpusCase, CorpusInput } from "./balanced-posting-corpus.js";
import { syntheticId } from "./storage-synthetic.js";

export const REVERSAL_CORPUS_VERSION = "m04.17-reversal-corpus.v1" as const;
export const REVERSAL_BASE = 13_000_000;
export const REVERSAL_CASES = CATEGORIES.flatMap((first, f) =>
  CATEGORIES.flatMap((counter, c) =>
    CURRENCIES.flatMap((currency, u) =>
      SHAPES.map((shape, s) => ({
        number: ((f * 5 + c) * 3 + u) * 4 + s + 1,
        label: `${first}/${counter}/${currency}/${shape.name}`,
        first,
        counter,
        currency,
        status: "posted" as const,
        shape,
      })),
    ),
  ),
) satisfies readonly CorpusCase[];
export const REVERSAL_ROLES = ROLE_CASES.map((row) => ({
  ...row,
  first:
    row.role === "customer"
      ? ("liability" as const)
      : row.role === "fee"
        ? ("expense" as const)
        : row.role === "revenue"
          ? ("revenue" as const)
          : ("asset" as const),
  counter: "asset" as const,
  status: "posted" as const,
  shape: SHAPES[1],
}));
export interface ReversalFixture {
  readonly number: number;
  readonly input: CorpusInput;
  readonly request: LedgerReversalCandidate;
  readonly totals: readonly {
    currency: AccountCurrency;
    debitMinorUnits: bigint;
    creditMinorUnits: bigint;
  }[];
  readonly accounts: readonly {
    id: string;
    total: string;
    side: "debit" | "credit";
    lineCount: number;
  }[];
}
export function inverse(
  inputArg: CorpusInput,
  n: number,
): LedgerReversalCandidate {
  const input = structuredClone(inputArg);
  const id = `txn_${syntheticId(REVERSAL_BASE + 100_000 + n)}`;
  return {
    contractVersion: LEDGER_REVERSAL_CONTRACT_VERSION,
    kind: "full",
    originalTransactionId: input.journal.transaction.id,
    journal: {
      ...input.journal,
      transaction: {
        ...input.journal.transaction,
        id,
        idempotencyKey: `synthetic.inverse.${n}`,
        effectiveAt: "2026-10-08T13:00:00.000Z",
        recordedAt: "2026-10-08T13:01:00.000Z",
        provenance: {
          ...input.journal.transaction.provenance,
          source: {
            namespace: "synthetic.reversal-corpus",
            id: `inverse-${n}`,
          },
        },
      },
      entries: input.journal.entries.map((e, i) => ({
        ...e,
        id: `ent_${syntheticId((REVERSAL_BASE + 100_000 + n) * 100 + i + 1)}`,
        transactionId: id,
        side: e.side === "debit" ? "credit" : "debit",
      })),
    },
  };
}
export function fixture(
  row: CorpusCase = REVERSAL_CASES[1]!,
  number = row.number,
): ReversalFixture {
  const raw = materialize({ ...row, number: 2_000_000 + number });
  const input: CorpusInput = {
    ...raw,
    journal: {
      ...raw.journal,
      transaction: {
        ...raw.journal.transaction,
        provenance: {
          ...raw.journal.transaction.provenance,
          source: {
            namespace: "synthetic.reversal-corpus",
            id: `original-${number}`,
          },
        },
      },
    },
  };
  const firstSide = NORMAL_SIDE[row.first];
  return {
    input,
    request: inverse(input, number),
    number,
    totals: [
      {
        currency: row.currency,
        debitMinorUnits: BigInt(row.shape.total),
        creditMinorUnits: BigInt(row.shape.total),
      },
    ],
    accounts: input.accounts.map((a, i) => ({
      id: a.id,
      total: row.shape.total,
      side: i === 0 ? firstSide : firstSide === "debit" ? "credit" : "debit",
      lineCount: row.shape.amounts.length,
    })),
  };
}
export function multiFixture(number = 2001): ReversalFixture {
  const parts = CATEGORIES.map((first, i) =>
    fixture(
      {
        number: number + i,
        label: first,
        first,
        counter: first === "revenue" ? "asset" : "revenue",
        currency: CURRENCIES[i % 3]!,
        status: "posted",
        shape: SHAPES[2],
      },
      number + i,
    ),
  );
  const first = parts[0]!,
    ledgerId = first.input.journal.transaction.ledgerId,
    transactionId = first.input.journal.transaction.id;
  const input: CorpusInput = {
    journal: {
      ...first.input.journal,
      entries: parts.flatMap((p) =>
        p.input.journal.entries.map((e) => ({ ...e, ledgerId, transactionId })),
      ),
    },
    accounts: parts.flatMap((p) =>
      p.input.accounts.map((a) => ({ ...a, ledgerId })),
    ),
  };
  // Each pair has TWO max-int64 lines. Two pairs each for USD/EUR, one for GBP.
  return {
    input,
    request: inverse(input, number),
    number,
    totals: [
      {
        currency: "EUR",
        debitMinorUnits: 36893488147419103228n,
        creditMinorUnits: 36893488147419103228n,
      },
      {
        currency: "GBP",
        debitMinorUnits: 18446744073709551614n,
        creditMinorUnits: 18446744073709551614n,
      },
      {
        currency: "USD",
        debitMinorUnits: 36893488147419103228n,
        creditMinorUnits: 36893488147419103228n,
      },
    ],
    accounts: parts.flatMap((p) => p.accounts),
  };
}
export function retry(
  request: LedgerReversalCandidate,
  n: number,
): LedgerReversalCandidate {
  const id = `txn_${syntheticId(REVERSAL_BASE + 200_000 + n)}`;
  const reordered = permute({ journal: request.journal, accounts: [] }).journal;
  return {
    ...request,
    journal: {
      ...reordered,
      transaction: { ...reordered.transaction, id },
      entries: reordered.entries.map((e, i) => ({
        ...e,
        id: `ent_${syntheticId((REVERSAL_BASE + 200_000 + n) * 100 + i + 1)}`,
        transactionId: id,
      })),
    },
  };
}
export function changed<T>(
  input: T,
  path: readonly (string | number)[],
  value: unknown,
): T {
  const result = structuredClone(input);
  let at = result as Record<string, unknown>;
  for (const key of path.slice(0, -1)) at = at[key] as Record<string, unknown>;
  at[path.at(-1)!] = value;
  return result;
}
export function snapshots(input: CorpusInput) {
  return input.accounts.map((account) => ({
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
export const POLICY_CASES: readonly {
  name: string;
  path: string;
  sql: string;
  mutate: (f: ReversalFixture) => ReversalFixture;
}[] = [
  {
    name: "partial wrapper",
    path: "$",
    sql: "22023",
    mutate: (f) => changed(f, ["request", "kind"], "partial"),
  },
  {
    name: "future wrapper",
    path: "$",
    sql: "22023",
    mutate: (f) =>
      changed(f, ["request", "contractVersion"], "m04.09-ledger-reversal.v2"),
  },
  {
    name: "unknown approval",
    path: "$",
    sql: "22023",
    mutate: (f) => changed(f, ["request", "approved"], true),
  },
  {
    name: "pending inverse",
    path: "$.journal.transaction",
    sql: "23514",
    mutate: (f) =>
      changed(f, ["request", "journal", "transaction", "status"], "pending"),
  },
  {
    name: "self link",
    path: "$.journal.transaction",
    sql: "23514",
    mutate: (f) => {
      const id = f.input.journal.transaction.id;
      const next = changed(f, ["request", "journal", "transaction", "id"], id);
      return changed(
        next,
        ["request", "journal", "entries"],
        next.request.journal.entries.map((e) => ({ ...e, transactionId: id })),
      );
    },
  },
  {
    name: "balanced partial amounts",
    path: "$.journal.entries",
    sql: "23514",
    mutate: (f) =>
      changed(
        f,
        ["request", "journal", "entries"],
        f.request.journal.entries.map((e) => ({
          ...e,
          amount: {
            ...e.amount,
            minorUnits:
              e.amount.minorUnits === "1000" ? "750" : e.amount.minorUnits,
          },
        })),
      ),
  },
  {
    name: "removed balanced pair",
    path: "$.journal.entries",
    sql: "23514",
    mutate: (f) =>
      changed(
        f,
        ["request", "journal", "entries"],
        f.request.journal.entries.slice(0, 2),
      ),
  },
  {
    name: "merged lines",
    path: "$.journal.entries",
    sql: "23514",
    mutate: (f) =>
      changed(
        f,
        ["request", "journal", "entries"],
        f.request.journal.entries
          .slice(0, 2)
          .map((e) => ({ ...e, amount: { ...e.amount, minorUnits: "1250" } })),
      ),
  },
  {
    name: "split lines",
    path: "$.journal.entries",
    sql: "23514",
    mutate: (f) =>
      changed(
        f,
        ["request", "journal", "entries"],
        f.request.journal.entries.flatMap((e, i) =>
          e.amount.minorUnits === "1000"
            ? [
                { ...e, amount: { ...e.amount, minorUnits: "500" } },
                {
                  ...e,
                  id: `ent_${syntheticId(1_400_000_000 + i)}`,
                  amount: { ...e.amount, minorUnits: "500" },
                },
              ]
            : [e],
        ),
      ),
  },
  {
    name: "forward sides",
    path: "$.journal.entries",
    sql: "23514",
    mutate: (f) =>
      changed(
        f,
        ["request", "journal", "entries"],
        f.request.journal.entries.map((e) => ({
          ...e,
          side: e.side === "debit" ? "credit" : "debit",
        })),
      ),
  },
  {
    name: "snapshot name drift",
    path: "$.journal.entries",
    sql: "23514",
    mutate: (f) =>
      changed(f, ["input", "accounts", 0, "name"], "Drifted snapshot"),
  },
  {
    name: "snapshot owner drift",
    path: "$.journal.entries",
    sql: "23514",
    mutate: (f) =>
      changed(f, ["input", "accounts", 0, "owner", "id"], "owner-B"),
  },
  {
    name: "omitted event",
    path: "$.journal.transaction.provenance",
    sql: "23514",
    mutate: (f) =>
      changed(
        f,
        ["request", "journal", "transaction", "provenance", "moneyEventIds"],
        f.request.journal.transaction.provenance.moneyEventIds.slice(1),
      ),
  },
  {
    name: "omitted receipt",
    path: "$.journal.transaction.provenance",
    sql: "23514",
    mutate: (f) =>
      changed(
        f,
        ["request", "journal", "transaction", "provenance", "evidence"],
        f.request.journal.transaction.provenance.evidence.slice(1),
      ),
  },
  {
    name: "receipt hash drift",
    path: "$.journal.transaction.provenance",
    sql: "23514",
    mutate: (f) =>
      changed(
        f,
        [
          "request",
          "journal",
          "transaction",
          "provenance",
          "evidence",
          0,
          "contentHash",
        ],
        `sha256:${"c".repeat(64)}`,
      ),
  },
  {
    name: "reused original entry",
    path: "$.journal.entries",
    sql: "23505",
    mutate: (f) =>
      changed(
        f,
        ["request", "journal", "entries", 0, "id"],
        f.input.journal.entries[0]!.id,
      ),
  },
];
