/**
 * Container: wires the action hook to the pure UI component.
 * No rendering logic; no business logic. Just glue.
 */

import { router } from "expo-router";
import { CatalogListView } from "../components/CatalogListView";
import { useCatalogList } from "../hooks/useCatalogList";

export const CatalogListContainer = () => {
  const { items, isLoading, error, refetch } = useCatalogList();

  return (
    <CatalogListView
      items={items}
      isLoading={isLoading}
      error={error}
      onItemPress={(code) => router.push(`/catalog/${code}`)}
      onRetry={refetch}
    />
  );
};
