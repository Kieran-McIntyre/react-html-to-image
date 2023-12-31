module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  rules: {
    "object-curly-spacing": ["error", "always"],
    "quotes": [2, "double", "avoid-escape"],
    "semi": [2, "always"],
    "react/jsx-max-props-per-line": ["error", { "maximum": 1 }],
    "@typescript-eslint/indent": ["error", 2],
    "react/react-in-jsx-scope": "off",
  },
};