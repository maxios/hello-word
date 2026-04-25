import { graphqlClient } from "@/lib/graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

type Variables = Record<string, unknown>;

type BaseOptions<TData, TError> = Omit<
  UseQueryOptions<TData, TError, TData, readonly unknown[]>,
  "queryKey" | "queryFn"
>;

export interface GraphQLQueryConfig<TData, TVariables extends Variables, TError> {
  document: TypedDocumentNode<TData, TVariables>;
  variables?: TVariables;
  queryKey?: readonly unknown[];
  options?: BaseOptions<TData, TError>;
}

/**
 * Generic GraphQL query hook that pairs `graphql-request` with `@tanstack/react-query`.
 *
 * Pass a `TypedDocumentNode` from the generated `src/gql` and the data/variable
 * types are inferred for free.
 */
export function useGraphQLQuery<
  TData,
  TVariables extends Variables = Variables,
  TError = Error,
>(
  config: GraphQLQueryConfig<TData, TVariables, TError>,
): UseQueryResult<TData, TError> {
  const operationName =
    (config.document as unknown as {
      definitions?: Array<{ name?: { value: string } }>;
    }).definitions?.[0]?.name?.value ?? "anonymous";

  const queryKey =
    config.queryKey ??
    (config.variables ? [operationName, config.variables] : [operationName]);

  return useQuery<TData, TError, TData, readonly unknown[]>({
    queryKey,
    queryFn: () =>
      graphqlClient.request<TData>(
        config.document,
        (config.variables ?? {}) as Variables,
      ),
    ...config.options,
  });
}
