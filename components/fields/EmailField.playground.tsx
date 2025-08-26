import { useForm } from "react-hook-form";
import { EmailField } from "./EmailField";

export const components: PlaygroundComponent[] = [
  // === Basic EmailField ===
  {
    id: "basic-emailfield",
    name: "Basic EmailField",
    description: "Email input with email keyboard and validation",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <EmailField
          control={control}
          name="email"
          label="Email Address"
          placeholder="Enter your email address"
        />
      );
    },
    code: `<EmailField
  control={control}
  name="email"
  label="Email Address"
  placeholder="Enter your email address"
/>`,
    variations: [
      {
        name: "Required Email",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <EmailField
              control={control}
              name="requiredEmail"
              label="Email Address"
              placeholder="Enter your email address"
              required
            />
          );
        },
        code: `<EmailField
  control={control}
  name="requiredEmail"
  label="Email Address"
  placeholder="Enter your email address"
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
            <EmailField
              control={control}
              name="errorEmail"
              label="Email Address"
              placeholder="Enter your email address"
              error={{
                message: "Please enter a valid email address",
                type: "custom",
              }}
            />
          );
        },
        code: `<EmailField
  control={control}
  name="errorEmail"
  label="Email Address"
  placeholder="Enter your email address"
  error={{ message: "Please enter a valid email address" }}
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
            <EmailField
              control={control}
              name="disabledEmail"
              label="Email Address"
              placeholder="Email is disabled"
              disabled
            />
          );
        },
        code: `<EmailField
  control={control}
  name="disabledEmail"
  label="Email Address"
  placeholder="Email is disabled"
  disabled
/>`,
      },
    ],
  },

  // === EmailField with Helper Text ===
  {
    id: "emailfield-helper",
    name: "EmailField with Helper Text",
    description: "Email input with additional guidance",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <EmailField
          control={control}
          name="helperEmail"
          label="Work Email"
          placeholder="Enter your work email"
          helperText="We'll use this for important notifications"
        />
      );
    },
    code: `<EmailField
  control={control}
  name="helperEmail"
  label="Work Email"
  placeholder="Enter your work email"
  helperText="We'll use this for important notifications"
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
            <EmailField
              control={control}
              name="errorHelperEmail"
              label="Email Address"
              placeholder="Enter your email"
              error={{
                message: "This email is already registered",
                type: "custom",
              }}
              helperText="Use a different email address"
            />
          );
        },
        code: `<EmailField
  control={control}
  name="errorHelperEmail"
  label="Email Address"
  placeholder="Enter your email"
  error={{ message: "This email is already registered" }}
  helperText="Use a different email address"
/>`,
      },
    ],
  },

  // === EmailField Variants ===
  {
    id: "emailfield-variants",
    name: "EmailField Variants",
    description: "Different email field configurations",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <EmailField
          control={control}
          name="primaryEmail"
          label="Primary Email"
          placeholder="your.email@example.com"
          returnKeyType="next"
        />
      );
    },
    code: `<EmailField
  control={control}
  name="primaryEmail"
  label="Primary Email"
  placeholder="your.email@example.com"
  returnKeyType="next"
/>`,
    variations: [
      {
        name: "Secondary Email",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <EmailField
              control={control}
              name="secondaryEmail"
              label="Secondary Email (Optional)"
              placeholder="backup.email@example.com"
              helperText="For backup notifications"
            />
          );
        },
        code: `<EmailField
  control={control}
  name="secondaryEmail"
  label="Secondary Email (Optional)"
  placeholder="backup.email@example.com"
  helperText="For backup notifications"
/>`,
      },
      {
        name: "Business Email",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <EmailField
              control={control}
              name="businessEmail"
              label="Business Email"
              placeholder="name@company.com"
              helperText="Use your company email for business features"
            />
          );
        },
        code: `<EmailField
  control={control}
  name="businessEmail"
  label="Business Email"
  placeholder="name@company.com"
  helperText="Use your company email for business features"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `EmailField is a specialized text input for email addresses. It automatically configures the 
email keyboard and disables auto-correct for better user experience. Use it whenever you need to collect 
email addresses from users. Always provide clear labels and consider using helper text for additional 
context about how the email will be used.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use EmailField specifically for email address collection",
    "Provide clear labels that indicate the purpose of the email",
    "Use helper text to explain how the email will be used",
    "Implement proper email validation on the backend",
    "Consider using different email fields for different purposes (primary, backup, etc.)",
    "Use appropriate returnKeyType for form flow",
    "Provide clear error messages for invalid email formats",
    "Consider accessibility by using proper autoComplete attributes",
  ],
};

export const meta = {
  id: "emailfield",
  name: "EmailField",
  icon: "📧",
  description: "Specialized email input with email keyboard and validation",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};

