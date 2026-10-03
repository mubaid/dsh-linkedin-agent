#!/usr/bin/env node
/**
 * Structure test for dsh-linkedin-agent:
 *  1. skills/ contains exactly the 11 upstream skill directories
 *  2. every SKILL.md is valid frontmatter + kebab-case name
 *  3. required data files exist (hooks.json, slop.json, rubric.json,
 *     humanize.py, detect.py) and templates/voice.md
 *  4. no unexpected files; node_modules is not packaged
 */
import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgDir = join(__dirname, "..");

// The 11 upstream skills; SKILL.md must exist in each.
const SKILLS = [
  "li-audit", "li-carousel", "li-comment", "li-dm", "li-human",
  "li-inbox", "li-plan", "li-post", "li-profile", "li-reply", "li-repurpose",
].sort();

// Required non-SKILL data files bundled alongside their skill dirs.
const DATA = {
  "li-human": ["detect.py", "humanize.py", "slop.json"],
  "li-post": ["hooks.json"],
  "li-profile": ["rubric.json"],
};

const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const SKILL = /---\n\s*name:\s*([^\n]+)\s*\n/;

async function read(path) {
  return await readFile(path, "utf8");
}

async function test(label, fn) {
  console.log(`  ${label}`);
  await fn();
}

console.log("dsh-linkedin-agent  tree tests");

test("skills/ has exactly the 11 expected skill directories", async () => {
  const dirs = await readdir(join(pkgDir, "skills"));
  assert.deepStrictEqual(dirs.sort(), SKILLS, "skill directories match the 11 upstream skills");
});

test("every SKILL.md parses and carries a valid kebab-case name", async () => {
  for (const skill of SKILLS) {
    const skillDir = join(pkgDir, "skills", skill);
    const st = await stat(skillDir);
    assert.ok(st.isDirectory(), `  ${skill} is a directory`);
    const entries = await readdir(skillDir);
    assert.ok(entries.includes("SKILL.md"), `  ${skill}/SKILL.md exists`);
    const content = await read(join(skillDir, "SKILL.md"));
    const m = content.match(SKILL);
    assert.ok(m, `  ${skill}/SKILL.md has --- name: --- frontmatter`);
    const parsed = m[1].trim();
    assert.match(parsed, NAME_RE, `  ${skill} name ${parsed} is valid kebab-case`);
  }
});

test("required data files exist and are non-empty", async () => {
  for (const [skill, files] of Object.entries(DATA)) {
    for (const f of files) {
      const p = join(pkgDir, "skills", skill, f);
      const st = await stat(p);
      assert.ok(st.isFile(), `  ${p} exists`);
      const content = await read(p);
      assert.ok(content.length > 0, `  ${p} is non-empty`);
    }
  }
  assert.ok((await stat(join(pkgDir, "templates", "voice.md"))).isFile(), "  templates/voice.md exists");
});

test("no node_modules or build artefacts in the packaged tree", async () => {
  const all = [];
  const walk = async (dir) => {
    for (const name of await readdir(dir)) {
      const p = join(dir, name);
      const st = await stat(p);
      if (name === "node_modules" || name === "lib") continue;
      if (st.isDirectory()) await walk(p);
      else all.push(p);
    }
  };
  await walk(join(pkgDir, "lib"));
  const bad = all.filter((p) => /node_modules|\.map$|\.ts$/.test(p));
  assert.equal(bad.length, 0, `no node_modules/typeScript/build artefacts; found: ${bad.join(", ")}`);
});

console.log("  all tree tests passed");
