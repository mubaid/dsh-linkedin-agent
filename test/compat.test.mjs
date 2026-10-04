#!/usr/bin/env node
/**
 * Contract test for dsh-linkedin-agent engine compatibility:
 *  1. the real `evaluatePluginCompatibility` accepts our manifest on
 *     0.2.0-rc.2 with no exemption (returns undefined)
 *  2. it rejects a bogus peer range on the same runtime (returns the
 *     incompatible-peers record, not exempted)
 *  3. it accepts our manifest on 0.2.1-alpha.1 when installed (matrix leg)
 *
 * The harness imports the real function from `@deepseek-ai/dsh-app-boot`
 * (devDependency), never a stub. If the package is absent the import throws
 * and the test fails loudly rather than passing on a stub.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { evaluatePluginCompatibility } = require("@deepseek-ai/dsh-app-boot");

function test(label, fn) {
  console.log(`  ${label}`);
  fn();
}

const manifest = {
  name: "dsh-linkedin-agent",
  version: "0.1.0",
  peerDependencies: { "@deepseek-ai/dsh-skill-filesystem": ">=0.0.1-rc.2" },
};

console.log("dsh-linkedin-agent  compat contract tests");

test("shipped peers pass on 0.2.0-rc.2 with no exemption", () => {
  const out = evaluatePluginCompatibility(manifest, {}, "0.2.0-rc.2");
  assert.equal(out, undefined, "compatible manifests return undefined");
});

test("bogus peer range is rejected, not exempted", () => {
  const bad = {
    name: "dsh-linkedin-agent",
    version: "0.1.0",
    peerDependencies: { "@deepseek-ai/dsh-skill-filesystem": ">=9.9.9" },
  };
  const out = evaluatePluginCompatibility(bad, {}, "0.2.0-rc.2");
  assert.ok(out, "incompatible peers return a record");
  assert.deepStrictEqual(out.peers, {
    "@deepseek-ai/dsh-skill-filesystem": ">=9.9.9",
  });
  assert.equal(out.exempted, false, "rejected, not exempted");
});

test("shipped peers pass on 0.2.1-alpha.1 (matrix leg)", () => {
  const out = evaluatePluginCompatibility(manifest, {}, "0.2.1-alpha.1");
  assert.equal(out, undefined, "forward-compatible with the alpha runtime");
});

console.log("  all compat tests passed");
