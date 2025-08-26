module.exports = {
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:astro/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",

    // General rules
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error",

    // Astro specific rules
    "astro/no-conflict-set-directives": "error",
    "astro/no-unused-define-vars-in-style": "error",
  },
  overrides: [
    {
      files: ["*.astro"],
      globals: {
        Astro: "readonly",
      },
    },
  ],
};
