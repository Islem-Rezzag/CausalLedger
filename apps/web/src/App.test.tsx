import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { App } from "./App";

describe("App", () => {
  it("renders the non-domain web bootstrap", () => {
    const markup = renderToStaticMarkup(<App />);

    expect(markup).toContain("CausalLedger Web");
    expect(markup).not.toContain("MoneyEvent");
    expect(markup).not.toContain("ledger");
    expect(markup).not.toContain("incident");
    expect(markup).not.toContain("evidence");
    expect(markup).not.toContain("repair");
  });
});
