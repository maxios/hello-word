import { router } from "expo-router";
import { CatalogDetailView } from "../components/CatalogDetailView";
import { useCatalogDetail } from "../hooks/useCatalogDetail";

export interface CatalogDetailContainerProps {
  code: string;
}

export const CatalogDetailContainer = ({ code }: CatalogDetailContainerProps) => {
  const { detail, isLoading, error, refetch } = useCatalogDetail(code);

  return (
    <CatalogDetailView
      detail={detail}
      isLoading={isLoading}
      error={error}
      onBack={() => router.back()}
      onRetry={refetch}
    />
  );
};
