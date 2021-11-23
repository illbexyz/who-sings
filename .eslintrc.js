module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/extensions": ["error", "never"],
    "no-use-before-define": 0,
    "react/jsx-filename-extension": [2, { extensions: [".tsx"] }],
    "react/function-component-definition": [
      2,
      { nameComponents: "function-declaration" },
    ],
  },
};
