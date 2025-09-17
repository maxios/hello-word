import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://strng-payloadcms.vercel.app/api/graphql',
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
    // Generate React Query hooks
    './src/gql/hooks.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query'
      ],
      config: {
        useTypeImports: true,
        fetcher: 'graphql-request',
        scalars: {
          DateTime: 'string',
          JSON: 'any',
          JSONObject: 'Record<string, any>'
        },
        addInfiniteQuery: true,
        exposeQueryKeys: true,
        exposeMutationKeys: true
      }
    },
  },
  ignoreNoDocuments: true
};

export default config;