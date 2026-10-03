# Verification — dsh-linkedin-agent

Verified against DeepSeek Harness `0.2.0-rc.2`. See `PORTING-RULES.md` §7.

## Gates

1. **`node --test` — green.** `test/provider.test.mjs` (exports + provider
   registration) and `test/tree.test.mjs` (the 11 skills, valid kebab-case
   names, required data files, no build artefacts). Both tests were
   intentionally driven red before the implementation fixed them, so they are
   non-vacuous.
2. **`dsh plugin add github:mubaid/dsh-linkedin-agent` — pending.** Install is
   read-only from GitHub sources; no build step. To be run against a real DSH
   profile at publish.
3. **`dsh --profile <scratch> --dump-config` — pending.** Shows the
   `dsh-linkedin-agent` layer under the `dsh-linkedin-agent` patch row.
4. **Profile boots; Settings renders — pending.** No `Config` schema to poison
   the settings document; the skill provider registers synchronously.
5. **Behaviour in a real session — partially green.** Exercised with a real
   cordis `Context`: `new SystemPrompt(ctx, SystemPrompt.Config({}))`
   self-registers the `systemPrompt` service; `apply()` the plugin;
   `renderPrompt(await registry.assemble())` and assert the 11 skill names
   `li-*` appear. No model call, no credentials. Live model sessions blocked
   until a DSH runtime with a Python-capable `run.exec` tool is available.
6. **README records `engines.dsh: 0.2.0-rc.2` — green.** (one line; linked above)
7. **`gh api repos/mubaid/dsh-linkedin-agent --jq '.license.spdx_id'` — pending
   (read after push).** Expected `MIT`. The detection is asynchronous.

## Not verified

- Live end-to-end sessions that actually run the skills against a model, and
  the `/li-human` Python path, until the harness exposes a Python execution
  tool (`run.exec` or equivalent). The scripts are bundled so they work once
  such a tool exists.
- Collision with another DSH plugin's skill name. The R3 sweep was clean;
  re-verified at publish.

## What this port does not do

- It does not post to LinkedIn. That is the upstream design and it is
  intentional: no approved API exists for posting to a personal profile, and
  browser automation violates LinkedIn's User Agreement.
- It does not re-implement `humanize.py` / `detect.py` in JavaScript. That is
  a capability extension, not a port gap. The scripts ship as data files.
- It does not replace the `~/.claude/skills/` global install path. DSH has no
  equivalent; use `dsh plugin add`.

## Project status

Early, and honest about it.

- Verified against DeepSeek Harness `0.2.0-rc.2`.
- Skills: 11 of 11 load (see VERIFICATION.md).
- The `skill` tool is the invocation surface; these are not installed into a
  global skills directory.
- `/li-human` runs `python3 humanize.py` / `python3 detect.py` per the
  upstream. A host needs a Python execution tool for those; the two scripts
  are bundled so they run where a Python tool exists. Documented, not hidden.
- `/li-plan` writes `~/.claude/linkedin/plan.md` per the upstream skill
  bodies; in DSH the session cwd differs — see VERIFICATION.md.

## Contributing

Issues and pull requests are welcome on the DSH repo. If you are adding
behaviour, please add a test and keep the byte-for-byte fidelity of the
bundled skill bodies intact.
