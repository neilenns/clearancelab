/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  plugins: [
    "prettier-plugin-multiline-arrays",
    "prettier-plugin-organize-imports",
    "prettier-plugin-sort-json",
    "prettier-plugin-packagejson",
  ],
  multilineArraysWrapThreshold: 6,
};
