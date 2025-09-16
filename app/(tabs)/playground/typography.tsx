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
    <View className="bg-muted mt-3 rounded-md p-3">
      <Text className="font-mono text-sm text-muted-foreground">{code}</Text>
    </View>
  );
};

const ComponentShowcase: React.FC<{
  component: typeof typographyComponents[0];
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
      <View className="mb-3 rounded-md bg-background p-4">
        <component.component />
      </View>
      <CodeBlock code={component.code} visible={showCode} />

      {/* Variations */}
      {component.variations && component.variations.length > 0 && (
        <View className="mt-4">
          <Text className="mb-3 text-base font-medium text-foreground">Variations</Text>
          {component.variations.map((variation, index) => (
            <View key={index} className="mb-3">
              <Text className="mb-2 text-sm font-medium text-muted-foreground">
                {variation.name}
              </Text>
              <View className="mb-2 rounded-md bg-background p-3">
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
        <View className="flex-row items-center justify-between border-b border-border p-4">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">📝 Typography</Text>
            <Text className="text-muted-foreground">Text components and styles</Text>
          </View>
          
          <TouchableOpacity
            onPress={() => setShowCode(!showCode)}
            className="bg-card ml-4 flex-row items-center rounded-md border border-border px-3 py-2"
          >
            {showCode ? (
              <EyeSlashIcon className="mr-2 size-4 text-foreground" />
            ) : (
              <EyeIcon className="mr-2 size-4 text-foreground" />
            )}
            <Text className="text-sm font-medium text-foreground">
              {showCode ? 'Hide Code' : 'Show Code'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Typography Scale */}
          <View className="mb-6 rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20">
            <Text className="mb-2 font-semibold text-purple-900 dark:text-purple-100">
              📐 Typography Scale
            </Text>
            <Text className="mb-3 text-sm leading-5 text-purple-800 dark:text-purple-200">
              Our typography system uses a consistent scale to maintain visual hierarchy and readability.
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Text className="flex-1 text-heading-xl">H1</Text>
                <Text className="text-xs text-purple-700 dark:text-purple-300">32px / Bold</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="flex-1 text-heading-lg">H2</Text>
                <Text className="text-xs text-purple-700 dark:text-purple-300">24px / SemiBold</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="flex-1 text-body-large">Body</Text>
                <Text className="text-xs text-purple-700 dark:text-purple-300">16px / Regular</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="flex-1 text-body-small">Caption</Text>
                <Text className="text-xs text-purple-700 dark:text-purple-300">14px / Regular</Text>
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
          <View className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
            <Text className="mb-2 font-semibold text-green-900 dark:text-green-100">
              ✅ Typography Best Practices
            </Text>
            <View className="space-y-1">
              <Text className="text-sm text-green-800 dark:text-green-200">
                • Maintain consistent hierarchy with heading levels
              </Text>
              <Text className="text-sm text-green-800 dark:text-green-200">
                • Use body text for readable paragraphs and content
              </Text>
              <Text className="text-sm text-green-800 dark:text-green-200">
                • Apply muted colors for secondary information
              </Text>
              <Text className="text-sm text-green-800 dark:text-green-200">
                • Ensure sufficient contrast for accessibility
              </Text>
              <Text className="text-sm text-green-800 dark:text-green-200">
                • Test readability across different screen sizes
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
