import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettierConfig from "@vue/eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  {
    plugins: {
      vue,
    },
    files: ["**/*.vue"],
    languageOptions: {
      parser: await import("vue-eslint-parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...vue.configs.recommended.rules,
    },
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  prettierConfig,
]);
