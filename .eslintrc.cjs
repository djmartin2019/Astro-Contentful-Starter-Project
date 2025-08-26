module.exports = {
  extends: ["eslint:recommended", "plugin:astro/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  rules: {
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
