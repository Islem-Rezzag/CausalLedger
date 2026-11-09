import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { expect, it } from "vitest";
it("runtime imports only owned modules and deterministic SHA256", () => {
  const directory = fileURLToPath(new URL("../src/", import.meta.url));
  const forbidden = new Set([
    "fetch",
    "WebSocket",
    "XMLHttpRequest",
    "process",
    "globalThis",
    "eval",
    "Function",
    "require",
    "Date",
    "Math",
  ]);
  for (const file of readdirSync(directory)) {
    const text = readFileSync(directory + "/" + file, "utf8");
    const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    function visit(node: ts.Node) {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier
      ) {
        expect(ts.isStringLiteral(node.moduleSpecifier)).toBe(true);
        const value = (node.moduleSpecifier as ts.StringLiteral).text;
        expect([
          "./contract.js",
          "./validation.js",
          "./payment-authorized.js",
          "./payment-captured.js",
          "./payout.js",
          "./refund.js",
          "./dispute.js",
          "node:crypto",
        ]).toContain(value);
        if (value === "node:crypto" && ts.isImportDeclaration(node)) {
          const bindings = node.importClause?.namedBindings;
          expect(bindings && ts.isNamedImports(bindings)).toBe(true);
          if (bindings && ts.isNamedImports(bindings))
            expect(
              bindings.elements.map((x) => x.propertyName?.text ?? x.name.text),
            ).toEqual(["createHash"]);
        }
      }
      if (ts.isIdentifier(node))
        expect(forbidden.has(node.text), node.text).toBe(false);
      if (ts.isCallExpression(node))
        expect(node.expression.kind).not.toBe(ts.SyntaxKind.ImportKeyword);
      ts.forEachChild(node, visit);
    }
    visit(tree);
  }
});
it("is private and has no product/runtime dependencies or executable entrypoint", () => {
  const pkg = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  ) as Record<string, unknown>;
  expect(pkg.name).toBe("@causalledger/simulator");
  expect(pkg.private).toBe(true);
  expect(pkg).not.toHaveProperty("dependencies");
  expect(pkg).not.toHaveProperty("bin");
});
