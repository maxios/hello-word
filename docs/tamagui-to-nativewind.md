# Migration Knowledge Base: Tamagui to NativeWind v4

## Introduction

This knowledge base serves as a comprehensive guide for an AI agent to assist in migrating React Native projects from Tamagui to NativeWind v4. Tamagui is a UI kit and styling library that provides styled components, theming, variants, and optimizations for React Native and web. NativeWind v4 integrates Tailwind CSS into React Native, allowing the use of Tailwind utility classes via the `className` prop on React Native components.

### Key Differences

- **Styling Approach**: Tamagui uses a `styled()` function to create components with inline styles, variants, and theme tokens. NativeWind uses string-based Tailwind classes in `className` for atomic CSS styling.
- **Components**: Tamagui includes pre-built components (e.g., Button, Input) with props for sizing, theming, etc. NativeWind does not provide components; it styles standard React Native primitives (e.g., View, Text) or third-party components.
- **Theming**: Tamagui has a built-in theme system with nested themes and tokens. NativeWind extends Tailwind's theme via `tailwind.config.js` and supports dark mode via `dark:` prefixes.
- **Performance**: Tamagui includes an optimizing compiler for flattening styles. NativeWind v4 focuses on runtime efficiency with improved TypeScript support but no compiler.
- **Variants**: Tamagui supports prop-based variants for conditional styling. NativeWind handles this via conditional class strings (e.g., using `clsx` library) or Tailwind's arbitrary values.
- **Animations and Media Queries**: Tamagui has built-in support. NativeWind supports responsive breakpoints and hover/focus states via Tailwind utilities.

Migration involves:

1. Removing Tamagui dependencies and configurations.
2. Installing NativeWind v4.
3. Converting styled components to className-based styling.
4. Mapping themes and variants.
5. Handling any Tamagui-specific features (e.g., use custom hooks or libraries if needed).

No direct migration tools exist, so conversions must be manual or AI-assisted based on syntax rules below.

## Installation and Setup

### Removing Tamagui

- Uninstall dependencies: Run `npm uninstall tamagui @tamagui/core` (or yarn/pnpm equivalent).
- Remove Tamagui config: Delete `tamagui.config.ts` or any `createTamagui` setup in your app entry file.
- Clean up Babel config: Remove Tamagui plugin from `babel.config.js` (e.g., `'tamagui'`).
- Update imports: Replace Tamagui imports with React Native primitives (e.g., `import { View, Text } from 'react-native'` instead of 'tamagui').

### Installing NativeWind v4

- Install dependencies: `npm install nativewind tailwindcss` (v4 is the latest; ensure TailwindCSS >=3.3).
- Configure Babel: Add NativeWind plugin to `babel.config.js`:

  ```
  module.exports = {
    plugins: [
      ['nativewind/babel'],
    ],
  };
  ```

- Create `tailwind.config.js`:

  ```
  module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```

- Update TypeScript (if using): Add to `tsconfig.json`:

  ```
  "compilerOptions": {
    "jsxImportSource": "nativewind"
  }
  ```

- For dark mode: Use `useColorScheme` from React Native and apply `dark` class to root (e.g., via `className={colorScheme === 'dark' ? 'dark' : ''}`).

Restart your development server after setup.

## Syntax Conversion Rules

### Basic Styling

- Tamagui: Uses object styles or tokens (e.g., `backgroundColor: '$background'`).
- NativeWind: Convert to Tailwind classes (e.g., `className="bg-background"` where `background` is defined in theme).

**Conversion Table for Common Props**

| Tamagui Prop/Style | NativeWind Equivalent | Notes |
|--------------------|-----------------------|-------|
| `backgroundColor: '$color'` | `bg-[color]` | Use theme colors; e.g., `bg-red-500` or custom `bg-primary`. |
| `borderRadius: '$4'` | `rounded-[value]` | Map sizes: `$4` ≈ `rounded-lg` (extend theme for exact tokens). |
| `padding: '$2'` | `p-[value]` | `$2` ≈ `p-2`; use spacing scale. |
| `margin: '$sm'` | `m-[value]` | Map tokens to Tailwind spacing (e.g., `m-4`). |
| `alignItems: 'center'` | `items-center` | Direct mapping. |
| `justifyContent: 'center'` | `justify-center` | Direct mapping. |
| `width: '$full'` | `w-full` | For 100%. |
| `height: tokens.size[size]` | `h-[value]` | Use arbitrary values like `h-[100px]` or theme extensions. |
| `color: '$color'` (for Text) | `text-[color]` | e.g., `text-red-500`. |
| `fontSize: '$lg'` | `text-lg` | Map sizes accordingly. |

- For arbitrary values: Use Tailwind's `[value]` syntax, e.g., `bg-[#ff0000]` for hex colors.
- Pseudo-states: Tamagui uses `:hover`, etc., in variants. NativeWind: `hover:bg-red-600` (works on web; limited on native).

### Styled Components to ClassName

- Tamagui: `const StyledView = styled(View, { borderRadius: 20, variants: { ... } })`
- NativeWind: No `styled`; use inline `className` on primitives:

  ```
  <View className="rounded-xl" />
  ```

- For reusable components: Create wrapper components with default classes:

  ```
  const RoundedView = ({ className, ...props }) => (
    <View className={`rounded-xl ${className}`} {...props} />
  );
  ```

### Variants Handling

- Tamagui variants: Prop-based conditionals, e.g., `variants: { size: { small: { height: 20 }, large: { height: 40 } } }`
- NativeWind: Use conditional classes with libraries like `clsx` or `tailwind-merge`:

  ```
  import { clsx } from 'clsx';

  <View className={clsx(
    'h-5', // default
    size === 'small' && 'h-5',
    size === 'large' && 'h-10'
  )} />
  ```

- Install `clsx` if needed: `npm install clsx`.

### Component Mapping

Tamagui components map to React Native primitives or custom implementations.

| Tamagui Component | NativeWind Equivalent | Migration Notes |
|-------------------|-----------------------|-----------------|
| `Stack` or `View` | `View` from 'react-native' | Add `className` for styles. |
| `Text` | `Text` from 'react-native' | Use `text-*` classes. |
| `Button` | Custom or `TouchableOpacity` | Create a wrapper: `<TouchableOpacity className="bg-blue-500 p-4 rounded"><Text className="text-white">Button</Text></TouchableOpacity>`. Map `size` prop to conditional classes. |
| `Input` | `TextInput` from 'react-native' | `<TextInput className="border border-gray-300 p-2 rounded" />`. Handle focus states with `focus:border-blue-500`. |
| `Circle` (custom) | Custom View | `<View className="rounded-full" />`. |

- For icons in buttons: Use libraries like `react-native-vector-icons` and style with classes.

## Theming Conversion

- Tamagui: Themes defined in `createTamagui` with objects like `dark: { background: '#000' }`. Use `<Theme name="dark">` to switch.
- NativeWind: Extend `tailwind.config.js`:

  ```
  module.exports = {
    theme: {
      extend: {
        colors: {
          background: '#000', // dark background
          // Map Tamagui tokens here
        },
      },
    },
  };
  ```

- Dark Mode: Add `darkMode: 'class'` to config. Apply `dark` class to root View:

  ```
  <View className={colorScheme === 'dark' ? 'dark' : ''}>
    <Text className="text-black dark:text-white">Hello</Text>
  </View>
  ```

- Sub-themes: Use custom classes or multiple config files (advanced); otherwise, rely on `dark:` and custom color palettes.
- Accessing Theme Values: In JS, use Tailwind's `resolveConfig` if needed, but prefer class-based.

## Common Pitfalls and Best Practices

- **TypeScript**: NativeWind v4 has strong TS support; ensure `jsxImportSource: "nativewind"` in tsconfig.
- **Performance**: Avoid long className strings; use memoization if conditional.
- **Web vs Native**: NativeWind supports both; test hover/focus on web.
- **Animations**: Tamagui has built-ins; use React Native's `Animated` or `reanimated` with NativeWind classes.
- **Media Queries**: NativeWind supports `sm:`, `md:` prefixes for responsive design.
- **Debugging**: Use Tailwind's IntelliSense VSCode extension for class suggestions.
- **Partial Migration**: If keeping some Tamagui, isolate components, but full removal is recommended.
- **Testing**: After conversion, test on iOS/Android/web for style consistency.

## Migration Examples

### Example 1: Basic Styled Component

**Tamagui:**

```
const RoundedSquare = styled(View, {
  borderRadius: 20,
  variants: { size: { small: { width: 50, height: 50 } } }
});

<RoundedSquare size="small" backgroundColor="red" />
```

**NativeWind:**

```
const RoundedSquare = ({ size, className, ...props }) => (
  <View
    className={clsx(
      'rounded-xl bg-red-500',
      size === 'small' && 'w-[50px] h-[50px]',
      className
    )}
    {...props}
  />
);

<RoundedSquare size="small" />
```

### Example 2: Themed Button

**Tamagui:**

```
<Theme name="dark">
  <Button size="$large">Hello</Button>
</Theme>
```

**NativeWind (with custom Button):**

```
// In tailwind.config.js: extend colors for dark/light

const Button = ({ size, children, className, ...props }) => (
  <TouchableOpacity
    className={clsx(
      'bg-blue-500 p-4 rounded dark:bg-blue-700',
      size === 'large' && 'p-6 text-lg',
      className
    )}
    {...props}
  >
    <Text className="text-white text-center">{children}</Text>
  </TouchableOpacity>
);

// Usage with dark mode hook
const colorScheme = useColorScheme();
<View className={colorScheme === 'dark' ? 'dark' : ''}>
  <Button size="large">Hello</Button>
</View>
```

### Example 3: Text with Variants

**Tamagui:**

```
const StyledText = styled(Text, {
  variants: { centered: { true: { textAlign: 'center' } } }
});

<StyledText centered color="$color">Hello</StyledText>
```

**NativeWind:**

```
<Text className="text-center text-primary">Hello</Text> // primary from theme
```

Use this knowledge base to analyze user code snippets, identify Tamagui patterns, and generate equivalent NativeWind code. Always preserve functionality and suggest improvements where NativeWind excels (e.g., rapid prototyping with utilities).
