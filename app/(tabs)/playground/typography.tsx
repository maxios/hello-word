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
import { EyeIcon, EyeSlashIcon } from '@/components/icons';

// Typography components data
const typographyComponents = [
  {
    id: 'heading1',
    name: 'Heading 1',
    description: 'Primary page heading for major sections and page titles',
    component: () => (
      <Text className="text-heading-xl">This is Heading 1</Text>
    ),
    code: `<Text variant="heading1">This is Heading 1</Text>`,
    variations: [
      {
        name: 'Heading 1 with Color',
        component: () => <Text className="text-heading-xl text-primary">Colored Heading 1</Text>,
        code: `<Text className="text-heading-xl text-primary">Colored Heading 1</Text>`,
      },
    ],
  },
  {
    id: 'heading2',
    name: 'Heading 2',
    description: 'Secondary section heading for subsections',
    component: () => (
      <Text className="text-heading-lg">This is Heading 2</Text>
    ),
    code: `<Text className="text-heading-lg">This is Heading 2</Text>`,
    variations: [
      {
        name: 'Heading 2 with Color',
        component: () => <Text className="text-heading-lg text-primary">Colored Heading 2</Text>,
        code: `<Text className="text-heading-lg text-primary">Colored Heading 2</Text>`,
      },
    ],
  },
  {
    id: 'body-text',
    name: 'Body Text',
    description: 'Standard body content text for paragraphs and general content',
    component: () => (
      <Text className="text-body-large">
        This is body text content that flows naturally and provides readable information to users. 
        It supports multiple lines and maintains good readability across different screen sizes.
      </Text>
    ),
    code: `<Text variant="body">This is body text content</Text>`,
    variations: [
      {
        name: 'Muted Body Text',
        component: () => (
          <Text className="text-body-large text-muted-foreground">
            This is muted body text for secondary information
          </Text>
        ),
        code: `<Text variant="body" className="text-muted-foreground">This is muted body text</Text>`,
      },
    ],
  },
  {
    id: 'caption',
    name: 'Caption',
    description: 'Small explanatory text for captions and labels',
    component: () => (
      <Text className="text-body-small">This is caption text</Text>
    ),
    code: `<Text variant="caption">This is caption text</Text>`,
    variations: [
      {
        name: 'Muted Caption',
        component: () => (
          <Text className="text-body-small text-muted-foreground">
            Muted caption text
          </Text>
        ),
        code: `<Text variant="caption" className="text-muted-foreground">Muted caption</Text>`,
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
  component: typeof typographyComponents[0];
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
      <View className="bg-background rounded-md p-4 mb-3">
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
              <View className="bg-background rounded-md p-3 mb-2">
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

export default function TypographyScreen() {
  const colorScheme = useColorScheme();
  const [showCode, setShowCode] = useState(false);

  return (
    <View className={clsx('flex-1 bg-background', colorScheme === 'dark' && 'dark')}>
      <SafeAreaView className="flex-1">
        {/* Header Controls */}
        <View className="flex-row items-center justify-between p-4 border-b border-border">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">📝 Typography</Text>
            <Text className="text-muted-foreground">Text components and styles</Text>
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
          {/* Typography Scale */}
          <View className="mb-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <Text className="text-purple-900 dark:text-purple-100 font-semibold mb-2">
              📐 Typography Scale
            </Text>
            <Text className="text-purple-800 dark:text-purple-200 text-sm leading-5 mb-3">
              Our typography system uses a consistent scale to maintain visual hierarchy and readability.
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Text className="text-heading-xl flex-1">H1</Text>
                <Text className="text-purple-700 dark:text-purple-300 text-xs">32px / Bold</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-heading-lg flex-1">H2</Text>
                <Text className="text-purple-700 dark:text-purple-300 text-xs">24px / SemiBold</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-body-large flex-1">Body</Text>
                <Text className="text-purple-700 dark:text-purple-300 text-xs">16px / Regular</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-body-small flex-1">Caption</Text>
                <Text className="text-purple-700 dark:text-purple-300 text-xs">14px / Regular</Text>
              </View>
            </View>
          </View>

          {/* Components */}
          {typographyComponents.map((comp) => (
            <ComponentShowcase
              key={comp.id}
              component={comp}
              showCode={showCode}
            />
          ))}

          {/* Best Practices */}
          <View className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <Text className="text-green-900 dark:text-green-100 font-semibold mb-2">
              ✅ Typography Best Practices
            </Text>
            <View className="space-y-1">
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Maintain consistent hierarchy with heading levels
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Use body text for readable paragraphs and content
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Apply muted colors for secondary information
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Ensure sufficient contrast for accessibility
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Test readability across different screen sizes
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
