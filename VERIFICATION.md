# Verification — dsh-linkedin-agent

Verified against DeepSeek Harness `0.2.0-rc.2`.

## Gates

1. **`node --test` — green.** `test/provider.test.mjs` (name export,
   `inject === ["skills"]`, provider registration under the right name) and
   `test/tree.test.mjs` (exactly the 11 upstream skill dirs, kebab-case names,
   required data files, no build artefacts). Each test was driven red before
   the fix (missing `inject` assertion failed; a stray dir failed the tree
   test), so neither is vacuous.

2. **`dsh plugin add github:mubaid/dsh-linkedin-agent` — green.** Installed
   into a clean `ghcheck` profile (`dsh-base` + `dsh-headless` bundles) with
   no build step and no build permission prompts (`Packages: +1`,
   `Done in 2.8s`). The installed tree carries the final code
   (`inject = ["skills"]`).

3. **`dsh --profile scratch --dump-config` — green.** The composed tree shows
   `# == dsh-linkedin-agent` with `- id: linkedin-agent / name:
   dsh-linkedin-agent`, alongside the base bundle's `skill`,
   `skill-filesystem`, and `tool-skill` rows.

4. **Profile boots with the plugin active — green.** A live `agent` boot of
   the `ghcheck` profile (with the GitHub-installed copy) against the local
   mock LLM completed turns: the mock server logged completed `/v1/messages`
   requests and the run printed its result. No `did not activate` warning in
   the boot log or the persisted session transcript — with `inject = []` the
   same shape of boot printed `warning: 1 entry did not activate` /
   `cannot get property "skills" without inject`; with `inject = ["skills"]`
   that failure mode is gone.

5. **Behaviour — green, twice over.** (a) A real cordis `Context` was
   composed in DSH layer order: `SkillRegistry` (the `skills` service), then
   a `dsh-skill-filesystem.apply` row injecting `['skills']`, then the repo's
   *actual* plugin module (`name`, `inject`, `apply` all imported from
   `lib/index.js`). `ctx.skills.list()` returned all 11 skills (`li-audit
   li-carousel li-comment li-dm li-human li-inbox li-plan li-post li-profile
   li-reply li-repurpose`) under provider `linkedin-agent`, nothing missing,
   nothing extra. This uses the real `SkillRegistry` and the real filesystem
   provider from the `0.2.0-rc.2` checkout — only the surrounding `Context`
   is a harness, and the harness asserts on discovery, not on a stub.
   (b) In the live session above, the model prompt's `<available_skills>`
   block served all 11 `li-*` skills with their full upstream descriptions.
   The mock's reply text itself is canned (`mock response recovered`), so the
   transcript proves prompt availability, and (a) proves registry discovery.

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
   green.** Returns `MIT` (`key: mit`, read 2026-10-04, no detection lag
   observed). `LICENSE` holds the grant text plus one port-author copyright
   line and nothing else; upstream grant text is byte-identical per
   `UPSTREAM.md`.

8. **Human acceptance on a real DSH web instance — pending (new
   non-waivable gate, PORTING-RULES.md §7).** No port is done, published, or
   listed without an explicit human accept recorded here (date,
   instance/profile, version or commit, what was tried, accept or reject
   with reasons). This plugin has not yet had that session.

## Compat contract (gate 6 strong form, PORTING-RULES.md §7/§12)

`test/compat.test.mjs` calls the real `evaluatePluginCompatibility` from
`@deepseek-ai/dsh-app-boot` (devDependency, never a stub): the shipped peer
range passes on `0.2.0-rc.2` with no exemption, a bogus `>=9.9.9` range is
rejected (record returned, `exempted: false`), and the shipped range passes
on `0.2.1-alpha.1`. Non-vacuity: poisoning the shipped manifest to
`>=9.9.9` flips the suite red. No CI matrix — no second SDK leg exists on
npm to run it against, and the sibling shipped ports carry no workflows
either.

## Not verified

- A live agent turn that *invokes* one of the 11 skills end-to-end — the
  session proves the skills are served in the prompt, not that the mock model
  chose to call one.
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
