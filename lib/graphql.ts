import { GraphQLClient } from 'graphql-request';

const DEFAULT_ENDPOINT = 'https://countries.trevorblades.com/graphql';

export const GRAPHQL_ENDPOINT =
  process.env.EXPO_PUBLIC_GRAPHQL_URL ?? DEFAULT_ENDPOINT;

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export const request = graphqlClient.request.bind(graphqlClient);
