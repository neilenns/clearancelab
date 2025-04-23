import { execSync } from "child_process";
import path from "path";
import { NodePlopAPI } from "plop";
import { getMonorepoRoot } from "../utils/getMonorepoRoot";
import { toKebabCase } from "../utils/toKebabCase";

export default function generatePackage(plop: NodePlopAPI) {
  const installPath = getMonorepoRoot("packages", "{{kebabCase name}}");

  plop.setActionType("installDependencies", function (answers, config, plop) {
    const { name } = answers;
    const kebabName = toKebabCase(name);

    if (!/^[a-z0-9-]+$/.test(kebabName)) {
      throw new Error(`Invalid package name: "${name}"`);
    }

    console.log(`Installing dependencies for ${kebabName}...`);

    const pnpmCommand = `pnpm --filter @workspace/${kebabName} install`;

    try {
      execSync(pnpmCommand, { stdio: "inherit" });
      return "Dependency install completed";
    } catch (err: unknown) {
      return `❌ Dependency install failed: ${err}`;
    }
  });

  plop.setGenerator("package", {
    description: "Generate a new monorepo package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Package name (without scope, don't include @workspace/):",
        validate: (input) => {
          if (!input) return "Package name is required";

          console.log(input);

          if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(input)) {
            return "Package name must contain only letters, numbers, and hyphens, and cannot start with a hyphen";
          }

          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(installPath, "package.json"),
        templateFile: "generate-package/package.hbs",
      },
      {
        type: "add",
        path: path.join(installPath, "eslint.config.js"),
        templateFile: "generate-package/eslint.config.hbs",
      },
      {
        type: "add",
        path: path.join(installPath, "tsconfig.json"),
        templateFile: "generate-package/tsconfig.hbs",
      },
      {
        type: "add",
        path: path.join(installPath, "src", "index.ts"),
        templateFile: "generate-package/src/index.hbs",
      },
      {
        type: "installDependencies",
      },
    ],
  });
}
