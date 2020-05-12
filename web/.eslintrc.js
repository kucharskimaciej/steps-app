module.exports = {
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "vue", "prettier", "jest"],
  env: {
    browser: true,
    node: true,
    es6: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/base",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "plugin:jest/recommended"
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    camelcase: "off",
    "@typescript-eslint/camelcase": ["off", { properties: "never" }],
    "vue/max-attributes-per-line": 0,
    "vue/html-indent": 0
  }
};
