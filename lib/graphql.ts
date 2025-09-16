import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'https://strng-payloadcms.vercel.app/api/graphql';

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export const request = graphqlClient.request.bind(graphqlClient);