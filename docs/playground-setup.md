# Component Playground Setup Guide

## Overview

This custom component playground provides a React Native/Expo alternative to Storybook, built directly into your app using Expo Router. It allows you to view, test, and iterate on components without external dependencies.

## Features

✅ **Native Expo Integration** - Works seamlessly with Expo Router and development workflow  
✅ **Environment-based Access** - Conditionally shown based on development mode or config  
✅ **Device Testing** - Test components directly on iOS/Android devices via Expo Go  
✅ **Responsive Design** - Adapts to tablet and mobile layouts  
✅ **Live Code Preview** - View component code alongside rendered examples  
✅ **Component Variations** - Showcase different props and states  
✅ **Fast Refresh Support** - Real-time updates during development

## File Structure

```
app/
├── playground/
│   ├── _layout.tsx          # Playground navigation layout
│   ├── index.tsx            # Main component browser
│   └── component/
│       └── [id].tsx         # Component detail view
components/
└── PlaygroundButton.tsx     # Access button component
```

## Configuration

### 1. Environment Setup

The playground is controlled via `app.json`:

```json
{
  "expo": {
    "extra": {
      "enablePlayground": true
    }
  }
}
```

### 2. Conditional Access

The playground automatically appears when:

- `__DEV__` is true (development mode)
- `enablePlayground` is explicitly set to `true` in app config

## Usage

### Accessing the Playground

#### Option 1: Floating Button

```tsx
import { PlaygroundButton } from "@/components/PlaygroundButton";

export default function Screen() {
  return (
    <View className="flex-1">
      {/* Your screen content */}
      <PlaygroundButton variant="floating" />
    </View>
  );
}
```

#### Option 2: Inline Button

```tsx
import { PlaygroundButton } from "@/components/PlaygroundButton";

export default function SettingsScreen() {
  return (
    <ScrollView>
      {/* Other settings */}
      <PlaygroundButton variant="inline" className="m-4" />
    </ScrollView>
  );
}
```

#### Option 3: Direct Navigation

```tsx
import { useRouter } from "expo-router";

const router = useRouter();
router.push("/playground");
```

### Adding Components to Playground

Edit `/app/playground/index.tsx` and `/app/playground/component/[id].tsx` to add your components:

```tsx
// 1. Import your component
import { YourComponent } from '@/components/YourComponent';

// 2. Add to componentCategories array
{
  id: 'your-category',
  name: 'Your Category',
  icon: '🎨',
  description: 'Your category description',
  components: [
    {
      id: 'your-component',
      name: 'Your Component',
      description: 'Component description',
      component: () => <YourComponent prop="value" />,
      code: `<YourComponent prop="value" />`,
    },
  ],
}

// 3. Add to componentRegistry in [id].tsx
'your-component': {
  name: 'Your Component',
  description: 'Detailed description',
  component: () => <YourComponent prop="value" />,
  code: `<YourComponent prop="value" />`,
  category: 'your-category',
  variations: [
    {
      name: 'Variation Name',
      component: () => <YourComponent variant="alt" />,
      code: `<YourComponent variant="alt" />`,
    },
  ],
},
```

## Development Workflow

### 1. Component Development

1. Create/modify component in `/components`
2. Add to playground registry
3. Use Expo's fast refresh to see changes instantly
4. Test on multiple devices via Expo Go

### 2. Testing on Devices

```bash
# Start development server
expo start

# Scan QR code with Expo Go app
# Navigate to playground in the app
```

### 3. Team Collaboration

- Share Expo publish URL with playground enabled
- Team members can test components on their devices
- No additional setup required for reviewers

## Comparison with Storybook

| Feature          | Component Playground       | Storybook          |
| ---------------- | -------------------------- | ------------------ |
| Expo Integration | ✅ Native                  | ⚠️ Complex setup   |
| Device Testing   | ✅ Direct via Expo Go      | ❌ Simulator only  |
| Dependencies     | ✅ Zero additional         | ❌ Heavy toolchain |
| Managed Workflow | ✅ Full support            | ⚠️ Limited         |
| Setup Time       | ✅ < 10 minutes            | ❌ Hours           |
| Bundle Size      | ✅ No impact on production | ❌ Separate bundle |

## Best Practices

### 1. Component Organization

- Group related components in logical categories
- Use clear, descriptive names and descriptions
- Include multiple variations showing different states

### 2. Code Examples

- Keep code snippets concise and readable
- Show practical usage examples
- Include important props and styling

### 3. Performance

- Components are rendered live, so optimize for performance
- Use React.memo for expensive components
- Consider lazy loading for large component sets

### 4. Testing Strategy

- Use playground for visual testing and QA
- Test on both iOS and Android devices
- Verify dark mode and responsive behavior

## Production Deployment

The playground is automatically disabled in production unless explicitly enabled:

```json
{
  "expo": {
    "extra": {
      "enablePlayground": false // or omit for auto-disable
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Playground not showing**
   - Check `__DEV__` mode or `enablePlayground` setting
   - Verify imports are correct

2. **Components not rendering**
   - Check component imports in playground files
   - Verify component registry entries

3. **Navigation issues**
   - Ensure Expo Router is properly configured
   - Check route naming and nesting

### Debug Mode

Add logging to verify configuration:

```tsx
console.log("DEV mode:", __DEV__);
console.log(
  "Playground enabled:",
  Constants.expoConfig?.extra?.enablePlayground,
);
```

## Advanced Features

### Custom Component Categories

Create specialized categories for your app's needs:

```tsx
const customCategories = [
  {
    id: "forms",
    name: "Form Components",
    icon: "📝",
    description: "Input fields, validation, and form controls",
  },
  {
    id: "data-display",
    name: "Data Display",
    icon: "📊",
    description: "Charts, tables, and data visualization",
  },
];
```

### Theme Testing

Test components across different themes:

```tsx
const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  return (
    <View className={theme === "dark" ? "dark" : ""}>
      <YourComponent />
    </View>
  );
};
```

### Integration with React Native Cosmos

You can run both systems side by side:

```bash
# Run React Native Cosmos
npm run cosmos

# Run Expo playground
expo start
```

This gives you the flexibility to use Cosmos for isolated component development and the Expo playground for device testing and team collaboration.
