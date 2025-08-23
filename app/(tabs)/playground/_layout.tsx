import { useColorScheme } from '@/hooks/useColorScheme';
import { clsx } from 'clsx';
import Constants from 'expo-constants';
import { Drawer } from 'expo-router/drawer';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function PlaygroundLayout() {
  const colorScheme = useColorScheme();
  
  // Only show playground in development or if explicitly enabled
  const showPlayground = Constants.expoConfig?.extra?.enablePlayground || __DEV__;

  if (!showPlayground) {
    return (
      <View className={clsx('flex-1 bg-background items-center justify-center p-4', colorScheme === 'dark' && 'dark')}>
        <Text className="text-lg text-muted-foreground text-center mb-4">
          Component Playground is not available in this environment
        </Text>
        <Text className="text-sm text-muted-foreground text-center">
          Enable it by setting enablePlayground: true in your app config
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={clsx('flex-1', colorScheme === 'dark' && 'dark')}>
        <Drawer
          screenOptions={{
            headerShown: true,
            headerTitle: '🧪 Component Playground',
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
            },
            headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
            drawerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
              width: 280,
            },
            drawerActiveTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
            drawerInactiveTintColor: colorScheme === 'dark' ? '#666666' : '#666666',
            drawerActiveBackgroundColor: colorScheme === 'dark' ? '#333333' : '#f0f0f0',
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Overview',
              title: 'Component Overview',
              drawerIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size * 0.8 }}>🏠</Text>
              ),
            }}
          />
          <Drawer.Screen
            name="buttons"
            options={{
              drawerLabel: 'Buttons',
              title: 'Button Components',
              drawerIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size * 0.8 }}>🔘</Text>
              ),
            }}
          />
          <Drawer.Screen
            name="typography"
            options={{
              drawerLabel: 'Typography',
              title: 'Typography Components',
              drawerIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size * 0.8 }}>📝</Text>
              ),
            }}
          />
          <Drawer.Screen
            name="icons"
            options={{
              drawerLabel: 'Icons',
              title: 'Icon Components',
              drawerIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size * 0.8 }}>🎨</Text>
              ),
            }}
          />
        </Drawer>
      </View>
    </GestureHandlerRootView>
  );
}
