import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginSecurity from "eslint-plugin-security";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "eslint.config.js",
      "tsup.config.js",
      "prettier.config.js",
    ],
  },
  eslintConfigPrettier,
  eslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginSecurity.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  }
);
