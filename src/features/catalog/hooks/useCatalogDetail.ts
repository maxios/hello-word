/**
 * Action hook: loads a single item's detail and syncs into the collection.
 */

import { GetCountryDocument } from "@/gql/graphql";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { useEffect } from "react";
import {
  countryCollection,
  useCountryDetail as useCollectionDetail,
} from "../collections/countryCollection";
import { mapCountryToDetail } from "../mappers/catalogMapper";
import type { CatalogDetail } from "../schemas/catalog.types";

export interface UseCatalogDetailResult {
  detail: CatalogDetail | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useCatalogDetail = (code: string): UseCatalogDetailResult => {
  const query = useGraphQLQuery({
    document: GetCountryDocument,
    variables: { code },
    options: {
      enabled: Boolean(code),
    },
  });

  useEffect(() => {
    if (query.data?.country) {
      countryCollection.upsertDetail(mapCountryToDetail(query.data.country));
    }
  }, [query.data]);

  const detail = useCollectionDetail(code);

  return {
    detail,
    isLoading: query.isLoading,
    error: (query.error as Error | null) ?? null,
    refetch: () => {
      query.refetch();
    },
  };
};
