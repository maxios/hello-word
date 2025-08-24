import {
  ApolloClient,
  InMemoryCache,
  defaultDataIdFromObject,
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';
// import {config} from './config';
// import {StrictTypedTypePolicies} from '../graphql/apollo-helpers';
// import tron from './reactotronConfig';

const batchHttpLink = new BatchHttpLink({
  uri: 'https://localhost:3000/graphql',
  batchMax: 5,
  batchInterval: 50,
});

const authLink: any = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
    },
  };
});

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    // eslint-disable-next-line no-underscore-dangle
    if (object.__typename === 'ResponsiveImage') {
      return `ResponsiveImage:${object.src}`;
    }
    return defaultDataIdFromObject(object);
  },
  typePolicies: {
    Query: {
      fields: {
        // ingredient: {
        //   read(_, {args, toReference}) {
        //     return toReference({
        //       __typename: 'IngredientRecord',
        //       id: args?.filter?.id?.eq,
        //     });
        //   },
        // },
        exercise: {
          read(_, {args, toReference}) {
            return toReference({
              __typename: 'ExerciseRecord',
              id: args?.filter?.id?.eq,
            });
          },
        },
        meal: {
          read(_, {args, toReference}) {
            return toReference({
              __typename: 'MealRecord',
              id: args?.filter?.id?.eq,
            });
          },
        },
        videoSeries: {
          read(_, {args, toReference}) {
            return toReference({
              __typename: 'VideoSeriesRecord',
              id: args?.filter?.id?.eq,
            });
          },
        },
        videoClass: {
          read(_, {args, toReference}) {
            return toReference({
              __typename: 'VideoClassRecord',
              id: args?.filter?.id?.eq,
            });
          },
        },
        workout: {
          read(_, {args, toReference}) {
            return toReference({
              __typename: 'WorkoutRecord',
              id: args?.filter?.id?.eq,
            });
          },
        },
        guide: {
          read(_, {args, toReference}) {
            return toReference({
              __typename: 'GuideRecord',
              id: args?.filter?.id?.eq,
            });
          },
        },
      },
    },
  } as const,
});

export const client = new ApolloClient({
  link: authLink.concat(batchHttpLink),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
  },
  cache,
});

export const hydrateApolloClient = async () => {
  await persistCache({
    cache,
    debug: false,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });
};
