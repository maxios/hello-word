import { useColorScheme } from '@/hooks/useColorScheme';
import { clsx } from 'clsx';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Component categories overview
const categories = [
  {
    id: 'buttons',
    name: 'Buttons',
    icon: '🔘',
    description: 'Interactive button components with various styles and states',
    componentCount: 4,
  },
  {
    id: 'typography',
    name: 'Typography',
    icon: '📝',
    description: 'Text components with different styles and hierarchies',
    componentCount: 4,
  },
  {
    id: 'icons',
    name: 'Icons',
    icon: '🎨',
    description: 'Icon components for various UI elements',
    componentCount: 4,
  },
];

const CategoryCard: React.FC<{
  category: typeof categories[0];
  onPress: () => void;
}> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4 p-6 bg-card rounded-xl border border-border active:bg-muted"
    >
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Text className="text-2xl mr-3">{category.icon}</Text>
            <Text className="text-xl font-bold text-foreground">
              {category.name}
            </Text>
          </View>
          <Text className="text-muted-foreground leading-6 mb-3">
            {category.description}
          </Text>
          <View className="bg-primary/10 px-3 py-1 rounded-full self-start">
            <Text className="text-primary text-sm font-medium">
              {category.componentCount} components
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function PlaygroundOverview() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <View className={clsx('flex-1 bg-background', colorScheme === 'dark' && 'dark')}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 p-4">
          {/* Welcome Section */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-foreground mb-4">
              🧪 Component Playground
            </Text>
            <Text className="text-muted-foreground text-lg leading-6">
              Explore and test your design system components in an interactive environment. 
              Use the drawer menu to navigate between different component categories.
            </Text>
          </View>

          {/* Features Section */}
          <View className="mb-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <Text className="text-blue-900 dark:text-blue-100 font-bold text-lg mb-3">
              ✨ Features
            </Text>
            <View className="space-y-2">
              <Text className="text-blue-800 dark:text-blue-200">
                • Live component rendering with real-time updates
              </Text>
              <Text className="text-blue-800 dark:text-blue-200">
                • Code examples for each component variation
              </Text>
              <Text className="text-blue-800 dark:text-blue-200">
                • Dark mode and theme testing
              </Text>
              <Text className="text-blue-800 dark:text-blue-200">
                • Responsive design testing on devices
              </Text>
            </View>
          </View>

          {/* Categories Overview */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-foreground mb-4">
              Component Categories
            </Text>
            <Text className="text-muted-foreground mb-6">
              Tap on a category below or use the drawer menu to explore components.
            </Text>
            
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => router.push(`/playground/${category.id}`)}
              />
            ))}
          </View>

          {/* Getting Started */}
          <View className="mb-8 p-4 bg-muted rounded-xl">
            <Text className="text-foreground font-bold text-lg mb-3">
              🚀 Getting Started
            </Text>
            <Text className="text-muted-foreground leading-6">
              Open the drawer menu (☰) or swipe from the left to navigate between component categories. 
              Each category contains live examples of components with their code implementations.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
