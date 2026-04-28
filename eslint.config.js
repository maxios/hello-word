// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tailwindcss = require('eslint-plugin-tailwindcss');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['src/gql/**', 'dist/**', 'ios/**', 'android/**', '**/*.playground.tsx'],
  },
  {
    plugins: {
      tailwindcss: tailwindcss
    },
    rules: {
      "react/display-name": "off",
      ...tailwindcss.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      "import/resolver": {
        "typescript": {
          rules: {
            "tailwindcss/no-custom-classname": "off",
          }
        }
      }
    }
  }
]);
