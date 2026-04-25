/**
 * Minimal Jest config for pure-function unit tests.
 *
 * Mappers, collections, and utils are the easiest things to test — they have
 * no React, no native module dependencies, and run in a vanilla Node runtime.
 *
 * For React Native component tests add the `jest-expo` preset and module
 * transformers (see Expo's testing docs). Keeping that out of this starter by
 * default keeps the test-run fast.
 */

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.expo/", "/dist/"],
  moduleNameMapper: {
    "^@/gql/(.*)$": "<rootDir>/src/gql/$1",
    "^@/features/(.*)$": "<rootDir>/src/features/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/shared/hooks/$1",
    "^@/components/(.*)$": "<rootDir>/src/shared/components/$1",
    "^@/constants/(.*)$": "<rootDir>/src/shared/constants/$1",
    "^@/assets/(.*)$": "<rootDir>/src/shared/assets/$1",
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["babel-jest", { presets: ["babel-preset-expo"] }],
  },
};
