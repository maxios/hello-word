import { useColorScheme } from '@/hooks/useColorScheme';
import { clsx } from 'clsx';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Import components to showcase
import { Button } from '@/components/Button';
import { EyeIcon, EyeSlashIcon } from '@/components/icons';

// Button components data
const buttonComponents = [
  {
    id: 'primary-button',
    name: 'Primary Button',
    description: 'Main action button with primary styling',
    component: () => (
      <Button variant="primary" size="medium">
        Primary Button
      </Button>
    ),
    code: `<Button variant="primary" size="medium">
  Primary Button
</Button>`,
    variations: [
      {
        name: 'Small Primary',
        component: () => <Button variant="primary" size="small">Small</Button>,
        code: `<Button variant="primary" size="small">Small</Button>`,
      },
      {
        name: 'Large Primary',
        component: () => <Button variant="primary" size="large">Large Primary</Button>,
        code: `<Button variant="primary" size="large">Large Primary</Button>`,
      },
    ],
  },
  {
    id: 'secondary-button',
    name: 'Secondary Button',
    description: 'Secondary action button with subtle styling',
    component: () => (
      <Button variant="secondary" size="medium">
        Secondary Button
      </Button>
    ),
    code: `<Button variant="secondary" size="medium">
  Secondary Button
</Button>`,
    variations: [
      {
        name: 'Small Secondary',
        component: () => <Button variant="secondary" size="small">Small</Button>,
        code: `<Button variant="secondary" size="small">Small</Button>`,
      },
      {
        name: 'Large Secondary',
        component: () => <Button variant="secondary" size="large">Large Secondary</Button>,
        code: `<Button variant="secondary" size="large">Large Secondary</Button>`,
      },
    ],
  },
];

const CodeBlock: React.FC<{ code: string; visible: boolean }> = ({ code, visible }) => {
  if (!visible) return null;

  return (
    <View className="mt-3 p-3 bg-muted rounded-md">
      <Text className="text-sm font-mono text-muted-foreground">{code}</Text>
    </View>
  );
};

const ComponentShowcase: React.FC<{
  component: typeof buttonComponents[0];
  showCode: boolean;
}> = ({ component, showCode }) => {
  return (
    <View className="mb-6 p-4 bg-card rounded-lg border border-border">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-foreground mb-1">
          {component.name}
        </Text>
        <Text className="text-sm text-muted-foreground">
          {component.description}
        </Text>
      </View>

      {/* Main Component */}
      <View className="items-center justify-center min-h-[80px] bg-background rounded-md p-4 mb-3">
        <component.component />
      </View>
      <CodeBlock code={component.code} visible={showCode} />

      {/* Variations */}
      {component.variations && component.variations.length > 0 && (
        <View className="mt-4">
          <Text className="text-base font-medium text-foreground mb-3">Variations</Text>
          {component.variations.map((variation, index) => (
            <View key={index} className="mb-3">
              <Text className="text-sm font-medium text-muted-foreground mb-2">
                {variation.name}
              </Text>
              <View className="items-center justify-center min-h-[60px] bg-background rounded-md p-3 mb-2">
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

export default function ButtonsScreen() {
  const colorScheme = useColorScheme();
  const [showCode, setShowCode] = useState(false);

  return (
    <View className={clsx('flex-1 bg-background', colorScheme === 'dark' && 'dark')}>
      <SafeAreaView className="flex-1">
        {/* Header Controls */}
        <View className="flex-row items-center justify-between p-4 border-b border-border">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">🔘 Buttons</Text>
            <Text className="text-muted-foreground">Interactive button components</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => setShowCode(!showCode)}
            className="flex-row items-center ml-4 px-3 py-2 bg-card rounded-md border border-border"
          >
            {showCode ? (
              <EyeSlashIcon className="w-4 h-4 text-foreground mr-2" />
            ) : (
              <EyeIcon className="w-4 h-4 text-foreground mr-2" />
            )}
            <Text className="text-sm font-medium text-foreground">
              {showCode ? 'Hide Code' : 'Show Code'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Usage Guidelines */}
          <View className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Text className="text-blue-900 dark:text-blue-100 font-semibold mb-2">
              📋 Usage Guidelines
            </Text>
            <Text className="text-blue-800 dark:text-blue-200 text-sm leading-5">
              Use buttons for interactive elements that trigger actions. Primary buttons should be used for main actions, 
              while secondary buttons are for supporting actions. Consider size based on hierarchy and available space.
            </Text>
          </View>

          {/* Components */}
          {buttonComponents.map((comp) => (
            <ComponentShowcase
              key={comp.id}
              component={comp}
              showCode={showCode}
            />
          ))}

          {/* Best Practices */}
          <View className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <Text className="text-green-900 dark:text-green-100 font-semibold mb-2">
              ✅ Best Practices
            </Text>
            <View className="space-y-1">
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Use primary buttons for the most important action on a screen
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Limit primary buttons to one per section or screen
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Choose button size based on content hierarchy and touch targets
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Ensure sufficient contrast for accessibility
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
