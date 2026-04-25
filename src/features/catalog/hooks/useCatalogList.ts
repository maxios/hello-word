/**
 * Action hook: loads the catalog list and syncs it into the collection.
 *
 * The container calls this hook once — nothing else. All the wiring between
 * GraphQL, the mapper, react-query, and the collection lives here.
 */

import { GetCountriesDocument } from "@/gql/graphql";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { useEffect } from "react";
import { countryCollection, useCountryList as useCollectionList } from "../collections/countryCollection";
import { mapCountriesToListItems } from "../mappers/catalogMapper";
import type { CatalogListItem } from "../schemas/catalog.types";

export interface UseCatalogListResult {
  items: CatalogListItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useCatalogList = (): UseCatalogListResult => {
  const query = useGraphQLQuery({
    document: GetCountriesDocument,
  });

  useEffect(() => {
    if (query.data?.countries) {
      countryCollection.upsertList(
        mapCountriesToListItems(query.data.countries),
      );
    }
  }, [query.data]);

  const items = useCollectionList();

  return {
    items,
    isLoading: query.isLoading,
    error: (query.error as Error | null) ?? null,
    refetch: () => {
      query.refetch();
    },
  };
};
