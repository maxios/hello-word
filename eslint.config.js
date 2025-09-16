// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tailwindcss = require('eslint-plugin-tailwindcss');

module.exports = defineConfig([
  expoConfig,
  {
    plugins: { 
      tailwindcss: tailwindcss
    },
    rules: {
      "react/display-name": "off",
      ...tailwindcss.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "off",
    },
    ignores: ['dist/*', 'node_modules/*', 'ios/*', 'android/*', './**/*.playground.tsx'],
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
