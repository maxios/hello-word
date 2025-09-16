import { Text, View } from "react-native";
import { CodeBlock } from "./CodeBlock";

export const ComponentShowcase: React.FC<{
  component: PlaygroundComponent;
  showCode: boolean;
}> = ({ component, showCode }) => {
  return (
    <View className="bg-card mb-6 rounded-lg border border-border p-4">
      <View className="mb-4">
        <Text className="mb-1 text-lg font-semibold text-foreground">
          {component.name}
        </Text>
        <Text className="text-sm text-muted-foreground">
          {component.description}
        </Text>
      </View>

      {/* Main Component */}
      <View className="mb-3 min-h-[80px] items-center justify-center rounded-md bg-background p-4">
        <component.component />
      </View>
      <CodeBlock code={component.code} visible={showCode} />

      {/* Variations */}
      {component.variations && component.variations.length > 0 && (
        <View className="mt-4">
          <Text className="mb-3 text-base font-medium text-foreground">
            Variations
          </Text>
          {component.variations.map((variation, index) => (
            <View key={index} className="mb-3">
              <Text className="mb-2 text-sm font-medium text-muted-foreground">
                {variation.name}
              </Text>
              <View className="mb-2 min-h-[60px] items-center justify-center rounded-md bg-background p-3">
                <variation.component />
              </View>
              <CodeBlock code={variation.code} visible={showCode} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
