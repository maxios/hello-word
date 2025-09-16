import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://strng-payloadcms.vercel.app/api/graphql',
  documents: [
    'src/**/*.graphql',
    'src/**/*.gql',
    'src/**/*.{ts,tsx}',
    '!src/gql/**/*',
    '!src/**/BlurUpImage/**/*',
    '!src/**/BlurUpImage.tsx'
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
  },
  ignoreNoDocuments: true
};

export default config;