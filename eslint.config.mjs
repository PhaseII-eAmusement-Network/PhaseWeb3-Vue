import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import prettierConfig from "@vue/eslint-config-prettier";
import globalsPkg from "globals";

const { browser: globalsBrowser, node: globalsNode } = globalsPkg;

export default defineConfig([
  js.configs.recommended,

  {
    files: ["**/*.vue"],
    plugins: {
      vue,
    },
    languageOptions: {
      parser: await import("vue-eslint-parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globalsBrowser,
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
      globals: {
        ...globalsNode,
        ...globalsBrowser,
      },
    },
  },

  prettierConfig,
]);
