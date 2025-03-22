import pluginVue from "eslint-plugin-vue"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import vueParser from "vue-eslint-parser"
import prettierRecommended from "eslint-plugin-prettier/recommended"

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    prettierRecommended
  ],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tseslint.parser,
      sourceType: "module"
    }
  },
  settings: {
    "import/resolver": [".ts", ".tsx", ".vue"]
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-undef": "off",
    "vue/multi-word-component-names": "off",
    "prettier/prettier": [
      "warn",
      {
        printWidth: 120,
        tabWidth: 2,
        semi: false,
        singleQuote: false,
        jsxSingleQuote: true,
        trailingComma: "none"
      }
    ]
  },
  ignores: ["node_modules", "dist"]
})
