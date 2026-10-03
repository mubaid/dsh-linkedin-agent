#!/usr/bin/env node
/**
 * Smoke test for dsh-linkedin-agent entrypoint:
 *  1. exports name = 'linkedin-agent', inject = []
 *  2. apply(ctx) registers a skill provider named 'linkedin-agent'
 */
import assert from "node:assert/strict";
import { apply, inject, name } from "../lib/index.js";

function fakeCtx() {
  const registered = [];
  return {
    skills: {
      registerProvider(factory) {
        const provider = factory({
          signal: new AbortController().signal,
          invalidate() {},
        });
        registered.push(provider);
        return () => {};
      },
    },
    effect() {
      return () => {};
    },
    on() {
      return () => {};
    },
    logger: { info() {}, debug() {}, warn() {}, error() {} },
    get registered() {
      return registered;
    },
  };
}

function test(label, fn) {
  console.log(`  ${label}`);
  fn();
}

console.log("dsh-linkedin-agent  provider smoke tests");

test("exports name", () => {
  assert.equal(typeof name, "string");
  assert.equal(name, "linkedin-agent");
});

test("exports inject", () => {
  assert.deepStrictEqual(inject, []);
});

test("apply registers the skill provider with the right name", () => {
  const ctx = fakeCtx();
  apply(ctx);
  assert.equal(ctx.registered.length, 1, "exactly one provider registered");
  assert.equal(ctx.registered[0].name, "linkedin-agent", "provider name is 'linkedin-agent'");
});

console.log("  all provider tests passed");
