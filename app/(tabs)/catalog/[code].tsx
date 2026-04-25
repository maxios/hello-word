import { CatalogDetailContainer } from "@/features/catalog/containers/CatalogDetailContainer";
import { useLocalSearchParams } from "expo-router";

export default function CatalogDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  return <CatalogDetailContainer code={code} />;
}
