module.exports = {
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "vue", "prettier"],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/base",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0
  }
};
