import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { apply as skillFs } from "@deepseek-ai/dsh-skill-filesystem";

/**
 * lib directory. The plugin scans `../skills/` for the bundled upstream
 * SKILL.md files.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));

const name = "linkedin-agent";
const inject = [];

/**
 * dsh-linkedin-agent — Eleven LinkedIn agent skills for DeepSeek Harness,
 * ported from Jakeschincariol/linkedin-agent-skill (MIT).
 *
 * Registers `dsh-skill-filesystem` as a skill provider named 'linkedin-agent'
 * that scans the `skills/` directory next to `lib/`. The 11 skills then
 * surface in the `/` composer menu and are invoked through the `skill` tool:
 *   /li-post, /li-comment, /li-reply, /li-profile, /li-plan,
 *   /li-carousel, /li-repurpose, /li-dm, /li-inbox, /li-audit, /li-human
 *
 * The skill bodies ship byte-identical to upstream (see UPSTREAM.md).
 */
function apply(ctx) {
  skillFs(ctx, {
    providerName: "linkedin-agent",
    includeDefaultRoots: false,
    customSkillDirs: [join(__dirname, "../skills")],
  });
}

export { name, inject, apply };
export default { name, inject, apply };
