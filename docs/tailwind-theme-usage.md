# Tailwind CSS Theme Usage Guide

Your Tamagui theme has been successfully converted to Tailwind CSS! Here's how to use your new theme system.

## Color Usage

### Utility Classes
```tsx
// Background colors
<View className="bg-surface-0" />
<View className="bg-brand-mid" />
<View className="bg-primary" />

// Text colors
<Text className="text-foreground" />
<Text className="text-muted-foreground" />
<Text className="text-brand-mid" />

// Border colors
<View className="border border-surface-48" />
```

### CSS Variables (for custom styles)
```tsx
// Using CSS variables in style props
<View style={{ backgroundColor: 'var(--color-surface-0)' }} />

// Or import theme constants
import { colors } from '@/theme';
<View style={{ backgroundColor: colors.surface[0] }} />
```

## Typography

### Font Families
```tsx
<Text className="font-heading" />
<Text className="font-body" />
<Text className="font-sans" />
```

### Font Sizes
```tsx
<Text className="text-heading-xl" />    {/* 60px */}
<Text className="text-heading-lg" />    {/* 40px */}
<Text className="text-body-large" />    {/* 22px */}
<Text className="text-ui-default" />    {/* 16px */}
```

### Complete Typography Example
```tsx
<Text className="font-heading text-heading-xl text-foreground">
  Main Heading
</Text>
<Text className="font-body text-body-medium text-muted-foreground">
  Body text content
</Text>
```

## Layout & Spacing

### Padding & Margin
```tsx
<View className="p-4 m-2" />
<View className="px-6 py-8" />
<View className="mb-input-height" /> {/* Custom input height spacing */}
```

### Border Radius
```tsx
<View className="rounded-lg" />
<View className="rounded-2xl" />
<View className="rounded-full" />
```

## Component Migration Examples

### Before (Tamagui)
```tsx
import { Stack, Text } from 'tamagui';

<Stack backgroundColor="$surface0" padding="$4" borderRadius="$lg">
  <Text fontSize="$bodyLarge" color="$textHighEmphasis">
    Hello World
  </Text>
</Stack>
```

### After (NativeWind)
```tsx
import { View, Text } from 'react-native';

<View className="bg-surface-0 p-4 rounded-lg">
  <Text className="text-body-large text-foreground">
    Hello World
  </Text>
</View>
```

## Custom Components

### Using Theme Constants
```tsx
import { colors, spacing } from '@/theme';

const CustomButton = ({ children }) => (
  <Pressable
    style={{
      backgroundColor: colors.primary,
      padding: spacing[4],
      borderRadius: spacing[2],
    }}
  >
    <Text className="text-primary-foreground font-body text-ui-default">
      {children}
    </Text>
  </Pressable>
);
```

### Using Tailwind Classes
```tsx
const CustomButton = ({ children, variant = 'primary' }) => (
  <Pressable
    className={clsx(
      'p-4 rounded-lg',
      variant === 'primary' && 'bg-primary',
      variant === 'secondary' && 'bg-surface-8'
    )}
  >
    <Text className="text-center font-body text-ui-default text-white">
      {children}
    </Text>
  </Pressable>
);
```

## Available Color Palette

### Surface Colors
- `surface-0` - Main background (#141414)
- `surface-4` - Card background (#1d1d1d)
- `surface-8` - Elevated surface (#272727)
- `surface-12` - Higher elevation (#303030)
- `surface-16` - Button background (#3a3a3a)
- `surface-20` - Active state (#434343)
- `surface-48` - Border color (#858585)

### Brand Colors
- `brand-light` - Light brand (#C3F4FF)
- `brand-mid` - Main brand (#33C4EB)
- `brand-dark` - Dark brand (#204098)
- `brand-darkest` - Darkest brand (#13265A)

### Semantic Colors
- `error` - Error red (#F25D5D)
- `warning` - Warning orange (#F2B55A)
- `success` - Success green (#85D97E)

### Text Colors
- `text-high-emphasis` - Primary text (#FFFFFF)
- `text-medium-emphasis` - Secondary text (#b3b3b3)
- `text-low-emphasis` - Tertiary text (#858585)

## Dark Mode Support

Your theme is dark-first, but you can add light mode variants:

```tsx
<View className="bg-background dark:bg-surface-0">
  <Text className="text-foreground dark:text-white">
    Content that adapts to theme
  </Text>
</View>
```

## Migration Tips

1. Replace `$` token references with Tailwind classes
2. Use `className` instead of styled components
3. Import theme constants for programmatic access
4. Use conditional classes with `clsx` for variants
5. Test on both iOS and Android
6. Verify dark mode support works correctly

## Need Help?

- Check the [NativeWind documentation](https://www.nativewind.dev/)
- Reference your theme constants in `theme/tailwind-theme.ts`
- Use the migration patterns in your workspace rules
