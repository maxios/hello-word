import { Text, TouchableOpacity, View } from "react-native";

export const CategoryCard: React.FC<{
  category: PlaygroundCategory;
  onPress: () => void;
}> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-card active:bg-muted mb-4 rounded-xl border border-border p-6"
    >
      <View className="mb-4 flex-row items-start justify-between">
        <View className="flex-1">
          <View className="mb-2 flex-row items-center">
            <Text className="mr-3 text-2xl">{category.icon}</Text>
            <Text className="text-xl font-bold text-foreground">
              {category.name}
            </Text>
          </View>
          <Text className="mb-3 leading-6 text-muted-foreground">
            {category.description}
          </Text>
          <View className="self-start rounded-full bg-primary/10 px-3 py-1">
            <Text className="text-sm font-medium text-primary">
              {category.componentCount} components
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
