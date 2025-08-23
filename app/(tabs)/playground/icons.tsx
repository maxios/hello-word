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

// Import icons to showcase
import {
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    EyeIcon,
    EyeSlashIcon,
    HeartIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    SettingsIcon,
    StarIcon
} from '@/components/icons';

// Icon components data
const iconComponents = [
  {
    id: 'home-icon',
    name: 'Home Icon',
    description: 'Navigation icon for home screen',
    component: () => <HomeIcon className="w-8 h-8 text-foreground" />,
    code: `<HomeIcon className="w-8 h-8 text-foreground" />`,
    variations: [
      {
        name: 'Small Home Icon',
        component: () => <HomeIcon className="w-4 h-4 text-foreground" />,
        code: `<HomeIcon className="w-4 h-4 text-foreground" />`,
      },
      {
        name: 'Large Home Icon',
        component: () => <HomeIcon className="w-12 h-12 text-primary" />,
        code: `<HomeIcon className="w-12 h-12 text-primary" />`,
      },
    ],
  },
  {
    id: 'settings-icon',
    name: 'Settings Icon',
    description: 'Settings and configuration icon',
    component: () => <SettingsIcon className="w-8 h-8 text-foreground" />,
    code: `<SettingsIcon className="w-8 h-8 text-foreground" />`,
    variations: [
      {
        name: 'Small Settings Icon',
        component: () => <SettingsIcon className="w-4 h-4 text-foreground" />,
        code: `<SettingsIcon className="w-4 h-4 text-foreground" />`,
      },
      {
        name: 'Large Settings Icon',
        component: () => <SettingsIcon className="w-12 h-12 text-primary" />,
        code: `<SettingsIcon className="w-12 h-12 text-primary" />`,
      },
    ],
  },
  {
    id: 'heart-icon',
    name: 'Heart Icon',
    description: 'Like or favorite action icon',
    component: () => <HeartIcon className="w-8 h-8 text-red-500" />,
    code: `<HeartIcon className="w-8 h-8 text-red-500" />`,
    variations: [
      {
        name: 'Small Heart Icon',
        component: () => <HeartIcon className="w-4 h-4 text-red-500" />,
        code: `<HeartIcon className="w-4 h-4 text-red-500" />`,
      },
      {
        name: 'Large Heart Icon',
        component: () => <HeartIcon className="w-12 h-12 text-red-500" />,
        code: `<HeartIcon className="w-12 h-12 text-red-500" />`,
      },
    ],
  },
  {
    id: 'star-icon',
    name: 'Star Icon',
    description: 'Rating or bookmark icon',
    component: () => <StarIcon className="w-8 h-8 text-yellow-500" />,
    code: `<StarIcon className="w-8 h-8 text-yellow-500" />`,
    variations: [
      {
        name: 'Small Star Icon',
        component: () => <StarIcon className="w-4 h-4 text-yellow-500" />,
        code: `<StarIcon className="w-4 h-4 text-yellow-500" />`,
      },
      {
        name: 'Large Star Icon',
        component: () => <StarIcon className="w-12 h-12 text-yellow-500" />,
        code: `<StarIcon className="w-12 h-12 text-yellow-500" />`,
      },
    ],
  },
];

// Icon grid for quick reference
const iconGrid = [
  { name: 'HomeIcon', component: HomeIcon, color: 'text-foreground' },
  { name: 'SettingsIcon', component: SettingsIcon, color: 'text-foreground' },
  { name: 'HeartIcon', component: HeartIcon, color: 'text-red-500' },
  { name: 'StarIcon', component: StarIcon, color: 'text-yellow-500' },
  { name: 'EyeIcon', component: EyeIcon, color: 'text-foreground' },
  { name: 'EyeSlashIcon', component: EyeSlashIcon, color: 'text-foreground' },
  { name: 'CheckIcon', component: CheckIcon, color: 'text-green-500' },
  { name: 'PlusIcon', component: PlusIcon, color: 'text-foreground' },
  { name: 'ChevronLeftIcon', component: ChevronLeftIcon, color: 'text-foreground' },
  { name: 'ChevronRightIcon', component: ChevronRightIcon, color: 'text-foreground' },
  { name: 'ClockIcon', component: ClockIcon, color: 'text-foreground' },
  { name: 'MagnifyingGlassIcon', component: MagnifyingGlassIcon, color: 'text-foreground' },
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
  component: typeof iconComponents[0];
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
          <Text className="text-base font-medium text-foreground mb-3">Size Variations</Text>
          <View className="flex-row items-center justify-around">
            {component.variations.map((variation, index) => (
              <View key={index} className="items-center">
                <Text className="text-sm font-medium text-muted-foreground mb-2">
                  {variation.name.split(' ')[0]}
                </Text>
                <View className="items-center justify-center min-h-[60px] bg-background rounded-md p-3 mb-2">
                  <variation.component />
                </View>
                {showCode && (
                  <View className="mt-2 max-w-[120px]">
                    <CodeBlock code={variation.code} visible={showCode} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const IconGridItem: React.FC<{
  icon: typeof iconGrid[0];
  showCode: boolean;
}> = ({ icon, showCode }) => {
  const IconComponent = icon.component;
  
  return (
    <View className="items-center p-3 bg-card rounded-lg border border-border">
      <IconComponent className={`w-6 h-6 ${icon.color} mb-2`} />
      <Text className="text-xs font-medium text-foreground text-center mb-1">
        {icon.name}
      </Text>
      {showCode && (
        <Text className="text-xs text-muted-foreground text-center">
          {`<${icon.name} />`}
        </Text>
      )}
    </View>
  );
};

export default function IconsScreen() {
  const colorScheme = useColorScheme();
  const [showCode, setShowCode] = useState(false);

  return (
    <View className={clsx('flex-1 bg-background', colorScheme === 'dark' && 'dark')}>
      <SafeAreaView className="flex-1">
        {/* Header Controls */}
        <View className="flex-row items-center justify-between p-4 border-b border-border">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">🎨 Icons</Text>
            <Text className="text-muted-foreground">Icon components and variations</Text>
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
          {/* Icon Grid Overview */}
          <View className="mb-6">
            <Text className="text-xl font-semibold text-foreground mb-4">
              Icon Library
            </Text>
            <Text className="text-muted-foreground mb-4">
              Quick reference of all available icons in the design system.
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {iconGrid.map((icon, index) => (
                <View key={index} className="w-[calc(25%-9px)]">
                  <IconGridItem icon={icon} showCode={showCode} />
                </View>
              ))}
            </View>
          </View>

          {/* Size Guidelines */}
          <View className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <Text className="text-orange-900 dark:text-orange-100 font-semibold mb-2">
              📏 Size Guidelines
            </Text>
            <Text className="text-orange-800 dark:text-orange-200 text-sm leading-5 mb-3">
              Use consistent icon sizes for better visual harmony.
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-orange-700 dark:text-orange-300 text-sm">Small (16px)</Text>
                <HomeIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-orange-700 dark:text-orange-300 text-sm">Medium (24px)</Text>
                <HomeIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-orange-700 dark:text-orange-300 text-sm">Large (32px)</Text>
                <HomeIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-orange-700 dark:text-orange-300 text-sm">Extra Large (48px)</Text>
                <HomeIcon className="w-12 h-12 text-orange-600 dark:text-orange-400" />
              </View>
            </View>
          </View>

          {/* Detailed Components */}
          <Text className="text-xl font-semibold text-foreground mb-4">
            Featured Icons
          </Text>
          {iconComponents.map((comp) => (
            <ComponentShowcase
              key={comp.id}
              component={comp}
              showCode={showCode}
            />
          ))}

          {/* Best Practices */}
          <View className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <Text className="text-green-900 dark:text-green-100 font-semibold mb-2">
              ✅ Icon Best Practices
            </Text>
            <View className="space-y-1">
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Use consistent sizes throughout your interface
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Apply semantic colors (red for errors, green for success)
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Ensure icons have sufficient contrast
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Maintain visual alignment with text and other elements
              </Text>
              <Text className="text-green-800 dark:text-green-200 text-sm">
                • Test icon clarity at different sizes and screen densities
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
