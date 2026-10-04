import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { apply as skillFs } from "@deepseek-ai/dsh-skill-filesystem";

const __dirname = dirname(fileURLToPath(import.meta.url));
const name = "linkedin-agent";
const inject = ["skills"];

/**
 * Apply this plugin: register the `linkedin-agent` skill provider over the
 * bundled `skills/` directory.
 *
 * Declared inject: ["skills"] (in lib/index.js) so this layer applies only
 * after @deepseek-ai/dsh-skill has registered the `skills` service, making
 * ctx.skills available for dsh-skill-filesystem.apply().
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
