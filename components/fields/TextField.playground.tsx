import { MagnifyingGlassIcon, XIcon } from "@/components/icons";
import { useForm } from "react-hook-form";
import { TextField } from "./TextField";

export const components: PlaygroundComponent[] = [
  // === Basic TextField ===
  {
    id: "basic-textfield",
    name: "Basic TextField",
    description: "Standard text input with label and placeholder",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <TextField
          control={control}
          name="basic"
          label="Full Name"
          placeholder="Enter your full name"
        />
      );
    },
    code: `<TextField
  control={control}
  name="basic"
  label="Full Name"
  placeholder="Enter your full name"
/>`,
    variations: [
      {
        name: "Required Field",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="required"
              label="Email Address"
              placeholder="Enter your email"
              required
            />
          );
        },
        code: `<TextField
  control={control}
  name="required"
  label="Email Address"
  placeholder="Enter your email"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="withError"
              label="Username"
              placeholder="Enter username"
              error={{ message: "Username is already taken", type: "custom" }}
            />
          );
        },
        code: `<TextField
  control={control}
  name="withError"
  label="Username"
  placeholder="Enter username"
  error={{ message: "Username is already taken" }}
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="disabled"
              label="Read Only Field"
              placeholder="This field is disabled"
              disabled
            />
          );
        },
        code: `<TextField
  control={control}
  name="disabled"
  label="Read Only Field"
  placeholder="This field is disabled"
  disabled
/>`,
      },
    ],
  },

  // === TextField with Icons ===
  {
    id: "textfield-with-icons",
    name: "TextField with Icons",
    description: "Text input with left and right icons",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <TextField
          control={control}
          name="withIcons"
          label="Search"
          placeholder="Search for something..."
          leftIcon={<MagnifyingGlassIcon className="text-muted-foreground" />}
          rightIcon={<XIcon className="text-muted-foreground" />}
          onRightIconPress={() => console.log("Clear search")}
        />
      );
    },
    code: `<TextField
  control={control}
  name="withIcons"
  label="Search"
  placeholder="Search for something..."
  leftIcon={<SearchIcon className="text-muted-foreground" />}
  rightIcon={<XIcon className="text-muted-foreground" />}
  onRightIconPress={() => console.log("Clear search")}
/>`,
    variations: [
      {
        name: "Left Icon Only",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="leftIcon"
              label="Username"
              placeholder="Enter your username"
              leftIcon={
                <MagnifyingGlassIcon className="text-muted-foreground" />
              }
            />
          );
        },
        code: `<TextField
  control={control}
  name="leftIcon"
  label="Username"
  placeholder="Enter your username"
  leftIcon={<UserIcon className="text-muted-foreground" />}
/>`,
      },
      {
        name: "Right Icon Only",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="rightIcon"
              label="Clearable Field"
              placeholder="Type and clear"
              rightIcon={<XIcon className="text-muted-foreground" />}
              onRightIconPress={() => console.log("Clear field")}
            />
          );
        },
        code: `<TextField
  control={control}
  name="rightIcon"
  label="Clearable Field"
  placeholder="Type and clear"
  rightIcon={<XIcon className="text-muted-foreground" />}
  onRightIconPress={() => console.log("Clear field")}
/>`,
      },
    ],
  },

  // === TextField Variants ===
  {
    id: "textfield-variants",
    name: "TextField Variants",
    description: "Different keyboard types and input configurations",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <TextField
          control={control}
          name="numeric"
          label="Phone Number"
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          returnKeyType="done"
        />
      );
    },
    code: `<TextField
  control={control}
  name="numeric"
  label="Phone Number"
  placeholder="Enter phone number"
  keyboardType="phone-pad"
  returnKeyType="done"
/>`,
    variations: [
      {
        name: "Email Keyboard",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="email"
              label="Email"
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          );
        },
        code: `<TextField
  control={control}
  name="email"
  label="Email"
  placeholder="Enter email address"
  keyboardType="email-address"
  autoCapitalize="none"
  autoCorrect={false}
/>`,
      },
      {
        name: "Numeric Keyboard",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="number"
              label="Age"
              placeholder="Enter your age"
              keyboardType="numeric"
              maxLength={3}
            />
          );
        },
        code: `<TextField
  control={control}
  name="number"
  label="Age"
  placeholder="Enter your age"
  keyboardType="numeric"
  maxLength={3}
/>`,
      },
      {
        name: "Multi-line Text",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="multiline"
              label="Bio"
              placeholder="Tell us about yourself..."
              multiline
              numberOfLines={4}
              autoCapitalize="sentences"
            />
          );
        },
        code: `<TextField
  control={control}
  name="multiline"
  label="Bio"
  placeholder="Tell us about yourself..."
  multiline
  numberOfLines={4}
  autoCapitalize="sentences"
/>`,
      },
    ],
  },

  // === TextField with Helper Text ===
  {
    id: "textfield-helper",
    name: "TextField with Helper Text",
    description: "Text input with additional helper information",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <TextField
          control={control}
          name="helper"
          label="Password"
          placeholder="Enter your password"
          helperText="Password must be at least 8 characters long"
        />
      );
    },
    code: `<TextField
  control={control}
  name="helper"
  label="Password"
  placeholder="Enter your password"
  helperText="Password must be at least 8 characters long"
/>`,
    variations: [
      {
        name: "With Error and Helper",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <TextField
              control={control}
              name="errorHelper"
              label="Confirm Password"
              placeholder="Confirm your password"
              error={{ message: "Passwords do not match", type: "custom" }}
              helperText="Make sure both passwords are identical"
            />
          );
        },
        code: `<TextField
  control={control}
  name="errorHelper"
  label="Confirm Password"
  placeholder="Confirm your password"
  error={{ message: "Passwords do not match" }}
  helperText="Make sure both passwords are identical"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `TextField is the base component for text input. Use it for collecting user input like names, 
usernames, and general text. Add icons for better visual context, use appropriate keyboard types for 
different input types, and always provide clear labels and placeholders. Use helper text for additional 
guidance and error messages for validation feedback.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Always provide a clear, descriptive label for each field",
    "Use appropriate keyboard types for different input types (email, numeric, etc.)",
    "Include helpful placeholder text that guides user input",
    "Use icons sparingly and only when they add value",
    "Provide clear error messages that explain how to fix the issue",
    "Use helper text for additional context or requirements",
    "Consider accessibility by using proper autoComplete attributes",
    "Use returnKeyType to guide users through form flow",
    "Implement proper validation with meaningful error messages",
  ],
};

export const meta = {
  id: "textfield",
  name: "TextField",
  icon: "📝",
  description:
    "Base text input component with icons, validation, and various keyboard types",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};

