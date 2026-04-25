import type { CodegenConfig } from '@graphql-codegen/cli';

const GRAPHQL_SCHEMA_URL =
  process.env.EXPO_PUBLIC_GRAPHQL_URL ?? 'https://countries.trevorblades.com/graphql';

const config: CodegenConfig = {
  schema: GRAPHQL_SCHEMA_URL,
  documents: [
    'src/**/*.graphql',
    'src/**/*.gql',
    'src/**/*.{ts,tsx}',
    '!src/gql/**/*',
  ],
  generates: {
    // Generate introspection file
    './src/gql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    },
    // Generate introspection JSON (useful for tools)
    './src/gql/introspection.json': {
      plugins: ['introspection'],
      config: {
        minify: true
      }
    },
    // Generate TypeScript types and hooks
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        dedupeFragments: true,
        scalars: {
          DateTime: 'string',
          JSON: 'any',
          JSONObject: 'Record<string, any>'
        }
      },
      plugins: []
    },
    // (Removed) typescript-react-query plugin — its generated hooks use the
    // react-query v3/v4 positional API, which conflicts with the installed
    // @tanstack/react-query v5. We use the `client` preset's TypedDocumentNode
    // output instead and compose our own thin hooks in src/shared/hooks/.
  },
  ignoreNoDocuments: true
};

export default config;