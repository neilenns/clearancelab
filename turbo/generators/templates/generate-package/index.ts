import { PlopTypes } from "@turbo/gen";
import { execSync } from "child_process";
import { toKebabCase } from "../utils/toKebabCase";

interface PackageAnswers {
  name: string;
}
const installDependencies: PlopTypes.CustomActionFunction = async (answers) => {
  const { name } = answers as PackageAnswers;
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
};

export default function generatePackage(plop: PlopTypes.NodePlopAPI) {
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
        path: "packages/{{kebabCase name}}/package.json",
        templateFile: "templates/generate-package/package.hbs",
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/eslint.config.js",
        templateFile: "templates/generate-package/eslint.config.hbs",
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/tsconfig.json",
        templateFile: "templates/generate-package/tsconfig.hbs",
      },
      {
        type: "add",
        path: "packages/{{kebabCase name}}/src/index.ts",
        templateFile: "templates/generate-package/src/index.hbs",
      },
      installDependencies,
    ],
  });
}
