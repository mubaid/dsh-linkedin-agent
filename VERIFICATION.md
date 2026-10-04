# Verification — dsh-linkedin-agent

Verified against DeepSeek Harness `0.2.0-rc.2`.

## Gates

1. **`node --test` — green.** `test/provider.test.mjs` (name export,
   `inject === ["skills"]`, provider registration under the right name) and
   `test/tree.test.mjs` (exactly the 11 upstream skill dirs, kebab-case names,
   required data files, no build artefacts). Each test was driven red before
   the fix (missing `inject` assertion failed; a stray dir failed the tree
   test), so neither is vacuous.

2. **`dsh plugin add` — locally green, GitHub pending.** The plugin installs
   read-only from a local `file:` source (`dsh plugin --profile scratch list`
   shows `dsh-linkedin-agent` with no build step and no build permission
   prompts). The `github:mubaid/dsh-linkedin-agent` form is untestable until
   the repository exists on GitHub, so it stays pending to push.

3. **`dsh --profile scratch --dump-config` — green.** The composed tree shows
   `# == dsh-linkedin-agent` with `- id: linkedin-agent / name:
   dsh-linkedin-agent`, alongside the base bundle's `skill`,
   `skill-filesystem`, and `tool-skill` rows.

4. **Profile boots with the plugin active — green config/boot evidence; live
   agent turn not observed.** `--dump-config` and `--dump-config-schema`
   compose cleanly with the layer present (the schema dump carries the
   `linkedin-agent` row). A live `agent` boot against the local mock LLM was
   attempted repeatedly and stayed silent for 100s+ with no request reaching
   the mock server, so no session output can be claimed. What *was* observed
   live: the previous failure mode is gone — with `inject = []` the boot
   printed `warning: 1 entry did not activate` /
   `cannot get property "skills" without inject`; with `inject = ["skills"]`
   that warning no longer appears in boots that reach layer application.

5. **Behaviour — green via real skill-stack harness (no model call).** A real
   cordis `Context` was composed in DSH layer order: `SkillRegistry` (the
   `skills` service), then a `dsh-skill-filesystem.apply` row injecting
   `['skills']`, then the repo's *actual* plugin module (`name`, `inject`,
   `apply` all imported from `lib/index.js`). `ctx.skills.list()` returned
   all 11 skills (`li-audit li-carousel li-comment li-dm li-human li-inbox
   li-plan li-post li-profile li-reply li-repurpose`) under provider
   `linkedin-agent`, nothing missing, nothing extra. This uses the real
   `SkillRegistry` and the real filesystem provider from the `0.2.0-rc.2`
   checkout — only the surrounding `Context` is a harness, and the harness
   asserts on discovery, not on a stub.

   Required finding, recorded so the next port does not repeat the detour:
   `inject: ["skills"]` is mandatory. Without it, `ctx.skills` access inside
   `apply()` throws `cannot get property "skills" without inject` because
   sibling fibers cannot see the skill row's service. Declaring the injection
   resolves the service into the plugin's own fiber. (PORTING-RULES.md §9
   carries the same lesson.)

6. **README records `engines.dsh: 0.2.0-rc.2` — green.** One line plus the
   pointer to this file, in both `README.md` and `README.zh-CN.md`;
   `package.json` pins the same version.

7. **`gh api repos/mubaid/dsh-linkedin-agent --jq '.license.spdx_id'` —
   pending (read after push).** Expected `MIT`. `LICENSE` holds the grant
   text plus one port-author copyright line and nothing else; upstream grant
   text is byte-identical per `UPSTREAM.md`. Detection is asynchronous, so
   re-read before claiming it.

## Not verified

- A live agent turn that invokes one of the 11 skills end-to-end (blocked on
  the silent-boot issue in gate 4, not on the plugin).
- The `/li-human` Python path in-session — the `detect.py` / `humanize.py`
  scripts ship byte-identical as data files and run wherever a Python
  execution tool exists.
- Collision with another DSH plugin's skill name. The R3 sweep found zero
  existing `dsh-linkedin-agent` ports; re-sweep at publish.

## What this port does not do

- It does not post to LinkedIn. That is the upstream design and it is
  intentional: no approved API exists for posting to a personal profile, and
  browser automation violates LinkedIn's User Agreement.
- It does not re-implement `humanize.py` / `detect.py` in JavaScript. That is
  a capability extension, not a port gap. The scripts ship as data files.
- It does not replace the `~/.claude/skills/` global install path. DSH has no
  equivalent; use `dsh plugin add`.
