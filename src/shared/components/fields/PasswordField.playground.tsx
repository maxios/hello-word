import { useForm } from "react-hook-form";
import { PasswordField } from "./PasswordField";

export const components: PlaygroundComponent[] = [
  // === Basic PasswordField ===
  {
    id: "basic-passwordfield",
    name: "Basic PasswordField",
    description: "Password input with show/hide toggle functionality",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <PasswordField
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />
      );
    },
    code: `<PasswordField
  control={control}
  name="password"
  label="Password"
  placeholder="Enter your password"
/>`,
    variations: [
      {
        name: "Required Password",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <PasswordField
              control={control}
              name="requiredPassword"
              label="Password"
              placeholder="Enter your password"
              required
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="requiredPassword"
  label="Password"
  placeholder="Enter your password"
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
            <PasswordField
              control={control}
              name="errorPassword"
              label="Password"
              placeholder="Enter your password"
              error={{
                message: "Password must be at least 8 characters",
                type: "required",
              }}
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="errorPassword"
  label="Password"
  placeholder="Enter your password"
  error={{ message: "Password must be at least 8 characters" }}
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
            <PasswordField
              control={control}
              name="disabledPassword"
              label="Password"
              placeholder="Password field is disabled"
              disabled
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="disabledPassword"
  label="Password"
  placeholder="Password field is disabled"
  disabled
/>`,
      },
    ],
  },

  // === PasswordField with Helper Text ===
  {
    id: "passwordfield-helper",
    name: "PasswordField with Helper Text",
    description: "Password input with password requirements",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <PasswordField
          control={control}
          name="helperPassword"
          label="Create Password"
          placeholder="Enter a strong password"
          helperText="Must be at least 8 characters with uppercase, lowercase, and number"
        />
      );
    },
    code: `<PasswordField
  control={control}
  name="helperPassword"
  label="Create Password"
  placeholder="Enter a strong password"
  helperText="Must be at least 8 characters with uppercase, lowercase, and number"
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
            <PasswordField
              control={control}
              name="errorHelperPassword"
              label="Password"
              placeholder="Enter your password"
              error={{
                message: "Password is too weak",
                type: "custom",
              }}
              helperText="Include uppercase, lowercase, number, and special character"
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="errorHelperPassword"
  label="Password"
  placeholder="Enter your password"
  error={{ message: "Password is too weak" }}
  helperText="Include uppercase, lowercase, number, and special character"
/>`,
      },
    ],
  },

  // === PasswordField Variants ===
  {
    id: "passwordfield-variants",
    name: "PasswordField Variants",
    description: "Different password field configurations",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <PasswordField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          returnKeyType="done"
        />
      );
    },
    code: `<PasswordField
  control={control}
  name="confirmPassword"
  label="Confirm Password"
  placeholder="Confirm your password"
  returnKeyType="done"
/>`,
    variations: [
      {
        name: "Current Password",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <PasswordField
              control={control}
              name="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
              helperText="Required to change your password"
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="currentPassword"
  label="Current Password"
  placeholder="Enter your current password"
  helperText="Required to change your password"
/>`,
      },
      {
        name: "New Password",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <PasswordField
              control={control}
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              helperText="Choose a strong, unique password"
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="newPassword"
  label="New Password"
  placeholder="Enter your new password"
  helperText="Choose a strong, unique password"
/>`,
      },
      {
        name: "PIN Code",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <PasswordField
              control={control}
              name="pinCode"
              label="PIN Code"
              placeholder="Enter 4-digit PIN"
              helperText="Used for quick access"
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="pinCode"
  label="PIN Code"
  placeholder="Enter 4-digit PIN"
  helperText="Used for quick access"
/>`,
      },
    ],
  },

  // === PasswordField Security Levels ===
  {
    id: "passwordfield-security",
    name: "PasswordField Security Levels",
    description: "Password fields with different security requirements",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <PasswordField
          control={control}
          name="strongPassword"
          label="Strong Password"
          placeholder="Enter a strong password"
          helperText="Include uppercase, lowercase, number, and special character"
        />
      );
    },
    code: `<PasswordField
  control={control}
  name="strongPassword"
  label="Strong Password"
  placeholder="Enter a strong password"
  helperText="Include uppercase, lowercase, number, and special character"
/>`,
    variations: [
      {
        name: "Medium Security",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <PasswordField
              control={control}
              name="mediumPassword"
              label="Password"
              placeholder="Enter your password"
              helperText="At least 6 characters"
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="mediumPassword"
  label="Password"
  placeholder="Enter your password"
  helperText="At least 6 characters"
/>`,
      },
      {
        name: "High Security",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <PasswordField
              control={control}
              name="highSecurityPassword"
              label="Master Password"
              placeholder="Enter your master password"
              helperText="Must be 12+ characters with mixed case, numbers, and symbols"
            />
          );
        },
        code: `<PasswordField
  control={control}
  name="highSecurityPassword"
  label="Master Password"
  placeholder="Enter your master password"
  helperText="Must be 12+ characters with mixed case, numbers, and symbols"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `PasswordField is a specialized input for password entry with built-in show/hide toggle functionality. 
Use it whenever you need to collect passwords, PINs, or other sensitive information. The component automatically 
configures secure text entry and provides a toggle to show/hide the password for user convenience. Always provide 
clear password requirements in helper text.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use PasswordField for all password, PIN, and sensitive data entry",
    "Always provide clear password requirements in helper text",
    "Use appropriate labels that indicate the purpose (current, new, confirm, etc.)",
    "Implement proper password validation on the backend",
    "Consider password strength indicators for better UX",
    "Use returnKeyType='done' for final password fields",
    "Provide clear error messages for password validation failures",
    "Consider accessibility by using proper autoComplete attributes",
    "Use different helper text for different password contexts",
  ],
};

export const meta = {
  id: "passwordfield",
  name: "PasswordField",
  icon: "🔒",
  description: "Password input with show/hide toggle functionality",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
