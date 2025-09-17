# Form Fields Components

A comprehensive collection of form field components built with React Hook Form and NativeWind, designed for React Native applications.

## Architecture

This library follows a **separation of concerns** pattern:

- **UI Components** (`*UI.tsx`) - Pure presentation components that handle all UI logic, state, and rendering
- **Field Wrappers** (`*Field.tsx`) - Thin wrappers that integrate UI components with React Hook Form using `Controller`

This architecture provides:

- 🎯 **Flexibility** - Use UI components standalone or with form integration
- 🧪 **Testability** - Test UI logic independently from form logic
- ♻️ **Reusability** - Reuse UI components in non-form contexts
- 🎨 **Consistency** - All components follow the same pattern

## Features

- ✅ **React Hook Form Integration** - All Field components use `Controller` for seamless form management
- ✅ **Pure UI Components** - All UI components work independently without form dependencies
- ✅ **NativeWind Styling** - Consistent design system with Tailwind CSS classes
- ✅ **TypeScript Support** - Full type safety with generic types
- ✅ **Accessibility** - Proper labels, error states, and keyboard navigation
- ✅ **Dark Mode Support** - All components support light/dark themes
- ✅ **Customizable** - Extensive props for customization
- ✅ **Error Handling** - Built-in error display and validation support
- ✅ **Interactive Playgrounds** - Each UI component has its own playground for testing

## Components

Each component has two versions:

- **UI Component** - For standalone usage with direct state management
- **Field Component** - For React Hook Form integration

### TextField / TextFieldUI

Basic text input with support for icons, validation, and various keyboard types.

**With React Hook Form:**

```tsx
<TextField
  control={control}
  name="firstName"
  label="First Name"
  placeholder="Enter your first name"
  required
  error={errors.firstName}
/>
```

**Standalone UI Component:**

```tsx
const [value, setValue] = useState("");

<TextFieldUI
  value={value}
  onChange={setValue}
  label="First Name"
  placeholder="Enter your first name"
  required
  leftIcon={<UserIcon />}
  rightIcon={<ClearIcon />}
  onRightIconPress={() => setValue("")}
/>;
```

**Props:**

- `control` - React Hook Form control object
- `name` - Field name (must match form schema)
- `label` - Field label (optional)
- `placeholder` - Placeholder text
- `required` - Show required indicator
- `disabled` - Disable the field
- `error` - Error object from form state
- `helperText` - Additional helper text
- `autoCapitalize` - Text capitalization
- `keyboardType` - Keyboard type (email, numeric, etc.)
- `secureTextEntry` - Hide text (for passwords)
- `multiline` - Multi-line input
- `leftIcon` - Icon on the left side
- `rightIcon` - Icon on the right side
- `onRightIconPress` - Callback for right icon press

### EmailField

Specialized email input with email keyboard and validation.

```tsx
<EmailField
  control={control}
  name="email"
  label="Email Address"
  placeholder="Enter your email"
  required
  error={errors.email}
/>
```

### PasswordField

Password input with show/hide toggle functionality.

```tsx
<PasswordField
  control={control}
  name="password"
  label="Password"
  placeholder="Enter your password"
  required
  error={errors.password}
/>
```

### PhoneField

Phone number input with phone keyboard.

```tsx
<PhoneField
  control={control}
  name="phone"
  label="Phone Number"
  placeholder="Enter your phone number"
  error={errors.phone}
/>
```

### NumberField

Numeric input with number keyboard.

```tsx
<NumberField
  control={control}
  name="age"
  label="Age"
  placeholder="Enter your age"
  error={errors.age}
/>
```

### TextAreaField

Multi-line text input for longer content.

```tsx
<TextAreaField
  control={control}
  name="bio"
  label="Biography"
  placeholder="Tell us about yourself..."
  error={errors.bio}
/>
```

### CheckboxField

Checkbox with support for description and links.

```tsx
<CheckboxField
  control={control}
  name="terms"
  description="I agree to the terms and conditions"
  linkText="Terms & Conditions"
  onLinkPress={() => openTerms()}
  required
  error={errors.terms}
/>
```

### RadioField

Radio button group for single selection.

```tsx
<RadioField
  control={control}
  name="gender"
  label="Gender"
  options={[
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]}
  direction="horizontal"
  error={errors.gender}
/>
```

### SelectField

Dropdown select with search functionality.

```tsx
<SelectField
  control={control}
  name="country"
  label="Country"
  options={countryOptions}
  placeholder="Select your country"
  searchable
  multiple={false}
  error={errors.country}
/>
```

### DateField

Date/time picker using native date picker.

```tsx
<DateField
  control={control}
  name="birthDate"
  label="Birth Date"
  mode="date"
  minimumDate={new Date("1900-01-01")}
  maximumDate={new Date()}
  error={errors.birthDate}
/>
```

### SearchField

Search input with clear functionality.

```tsx
<SearchField
  control={control}
  name="search"
  placeholder="Search..."
  error={errors.search}
/>
```

### SwitchField

Toggle switch component.

```tsx
<SwitchField
  control={control}
  name="notifications"
  label="Enable Notifications"
  error={errors.notifications}
/>
```

### SliderField

Range slider with value display.

```tsx
<SliderField
  control={control}
  name="rating"
  label="Rating"
  minimumValue={1}
  maximumValue={10}
  step={1}
  showValue
  valueSuffix=" stars"
  error={errors.rating}
/>
```

### FileField

File upload with image picker integration.

```tsx
<FileField
  control={control}
  name="avatar"
  label="Profile Picture"
  multiple={false}
  accept={["image/*"]}
  maxSize={5 * 1024 * 1024} // 5MB
  onFileSelect={(files) => console.log("Files selected:", files)}
  error={errors.avatar}
/>
```

## Usage Example

```tsx
import { useForm } from "react-hook-form";
import {
  TextField,
  EmailField,
  PasswordField,
  CheckboxField,
} from "@/components/fields";

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = (data: SignupForm) => {
    console.log("Form data:", data);
  };

  return (
    <View className="space-y-4 p-4">
      <TextField
        control={control}
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        required
        error={errors.firstName}
      />

      <TextField
        control={control}
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        required
        error={errors.lastName}
      />

      <EmailField
        control={control}
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        required
        error={errors.email}
      />

      <PasswordField
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        required
        error={errors.password}
      />

      <CheckboxField
        control={control}
        name="terms"
        description="I agree to the terms and conditions"
        required
        error={errors.terms}
      />

      <TouchableOpacity
        className="bg-primary items-center rounded-md px-6 py-3"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="font-semibold text-white">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Validation

All components work seamlessly with React Hook Form validation:

```tsx
const {
  control,
  formState: { errors },
} = useForm<FormData>({
  defaultValues,
  resolver: yupResolver(schema), // or any other resolver
});

// Pass errors to components
<TextField control={control} name="email" error={errors.email} />;
```

## Styling

All components use NativeWind classes and support:

- Dark mode with `dark:` variants
- Custom className props
- Consistent spacing and typography
- Focus and error states
- Disabled states

## Dependencies

- `react-hook-form` - Form management
- `nativewind` - Styling
- `clsx` - Conditional classes
- `@react-native-community/datetimepicker` - Date picker
- `@react-native-community/slider` - Slider component
- `expo-image-picker` - File picker

## Playground

See `Fields.playground.tsx` for a complete example of all components in action.
