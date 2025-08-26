import { useForm } from "react-hook-form";
import { CheckboxField } from "./CheckboxField";

export const components: PlaygroundComponent[] = [
  // === Basic CheckboxField ===
  {
    id: "basic-checkboxfield",
    name: "Basic CheckboxField",
    description: "Checkbox with label and description",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <CheckboxField
          control={control}
          name="basic"
          label="Remember me"
          description="Keep me signed in on this device"
        />
      );
    },
    code: `<CheckboxField
  control={control}
  name="basic"
  label="Remember me"
  description="Keep me signed in on this device"
/>`,
    variations: [
      {
        name: "Required Checkbox",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="required"
              label="Terms and Conditions"
              description="I agree to the terms and conditions"
              required
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="required"
  label="Terms and Conditions"
  description="I agree to the terms and conditions"
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
            <CheckboxField
              control={control}
              name="error"
              label="Privacy Policy"
              description="I have read and agree to the privacy policy"
              error={{ message: "You must agree to continue" }}
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="error"
  label="Privacy Policy"
  description="I have read and agree to the privacy policy"
  error={{ message: "You must agree to continue" }}
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
            <CheckboxField
              control={control}
              name="disabled"
              label="Disabled Option"
              description="This option is not available"
              disabled
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="disabled"
  label="Disabled Option"
  description="This option is not available"
  disabled
/>`,
      },
    ],
  },

  // === CheckboxField with Links ===
  {
    id: "checkboxfield-links",
    name: "CheckboxField with Links",
    description: "Checkbox with clickable links in description",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <CheckboxField
          control={control}
          name="withLinks"
          label="Terms and Conditions"
          description="I agree to the Terms & Conditions"
          linkText="Terms & Conditions"
          onLinkPress={() => console.log("Open terms")}
        />
      );
    },
    code: `<CheckboxField
  control={control}
  name="withLinks"
  label="Terms and Conditions"
  description="I agree to the Terms & Conditions"
  linkText="Terms & Conditions"
  onLinkPress={() => console.log("Open terms")}
/>`,
    variations: [
      {
        name: "Privacy Policy Link",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="privacyLink"
              label="Privacy Policy"
              description="I have read the Privacy Policy"
              linkText="Privacy Policy"
              onLinkPress={() => console.log("Open privacy policy")}
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="privacyLink"
  label="Privacy Policy"
  description="I have read the Privacy Policy"
  linkText="Privacy Policy"
  onLinkPress={() => console.log("Open privacy policy")}
/>`,
      },
      {
        name: "Multiple Links",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="multipleLinks"
              label="Legal Agreements"
              description="I agree to the Terms of Service and Privacy Policy"
              linkText="Terms of Service"
              onLinkPress={() => console.log("Open terms of service")}
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="multipleLinks"
  label="Legal Agreements"
  description="I agree to the Terms of Service and Privacy Policy"
  linkText="Terms of Service"
  onLinkPress={() => console.log("Open terms of service")}
/>`,
      },
    ],
  },

  // === CheckboxField Marketing ===
  {
    id: "checkboxfield-marketing",
    name: "CheckboxField Marketing",
    description: "Marketing and communication preferences",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <CheckboxField
          control={control}
          name="marketing"
          label="Marketing Communications"
          description="Receive updates about new features and promotions"
        />
      );
    },
    code: `<CheckboxField
  control={control}
  name="marketing"
  label="Marketing Communications"
  description="Receive updates about new features and promotions"
/>`,
    variations: [
      {
        name: "Email Notifications",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="emailNotifications"
              label="Email Notifications"
              description="Get notified about important updates via email"
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="emailNotifications"
  label="Email Notifications"
  description="Get notified about important updates via email"
/>`,
      },
      {
        name: "Push Notifications",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="pushNotifications"
              label="Push Notifications"
              description="Receive push notifications on your device"
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="pushNotifications"
  label="Push Notifications"
  description="Receive push notifications on your device"
/>`,
      },
      {
        name: "SMS Updates",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="smsUpdates"
              label="SMS Updates"
              description="Receive important updates via SMS"
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="smsUpdates"
  label="SMS Updates"
  description="Receive important updates via SMS"
/>`,
      },
    ],
  },

  // === CheckboxField Settings ===
  {
    id: "checkboxfield-settings",
    name: "CheckboxField Settings",
    description: "App settings and preferences",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <CheckboxField
          control={control}
          name="autoSave"
          label="Auto Save"
          description="Automatically save your work as you type"
        />
      );
    },
    code: `<CheckboxField
  control={control}
  name="autoSave"
  label="Auto Save"
  description="Automatically save your work as you type"
/>`,
    variations: [
      {
        name: "Dark Mode",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="darkMode"
              label="Dark Mode"
              description="Use dark theme for better viewing in low light"
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="darkMode"
  label="Dark Mode"
  description="Use dark theme for better viewing in low light"
/>`,
      },
      {
        name: "Analytics",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="analytics"
              label="Analytics"
              description="Help us improve by sharing anonymous usage data"
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="analytics"
  label="Analytics"
  description="Help us improve by sharing anonymous usage data"
/>`,
      },
      {
        name: "Two-Factor Authentication",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <CheckboxField
              control={control}
              name="twoFactor"
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="twoFactor"
  label="Two-Factor Authentication"
  description="Add an extra layer of security to your account"
/>`,
      },
    ],
  },

  // === CheckboxField with Helper Text ===
  {
    id: "checkboxfield-helper",
    name: "CheckboxField with Helper Text",
    description: "Checkbox with additional helper information",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <CheckboxField
          control={control}
          name="helper"
          label="Beta Features"
          description="Enable experimental features"
          helperText="Beta features may be unstable and could change"
        />
      );
    },
    code: `<CheckboxField
  control={control}
  name="helper"
  label="Beta Features"
  description="Enable experimental features"
  helperText="Beta features may be unstable and could change"
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
            <CheckboxField
              control={control}
              name="errorHelper"
              label="Age Verification"
              description="I confirm that I am 18 years or older"
              error={{ message: "You must be 18 or older to continue" }}
              helperText="This is required for legal compliance"
            />
          );
        },
        code: `<CheckboxField
  control={control}
  name="errorHelper"
  label="Age Verification"
  description="I confirm that I am 18 years or older"
  error={{ message: "You must be 18 or older to continue" }}
  helperText="This is required for legal compliance"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `CheckboxField is used for boolean selections, agreements, and preferences. Use it for terms and 
conditions, marketing opt-ins, settings toggles, and other yes/no choices. Always provide clear descriptions 
and consider using links for legal documents. Use helper text for additional context and error messages for 
validation feedback.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use CheckboxField for boolean selections and agreements",
    "Provide clear, descriptive labels and explanations",
    "Use links for legal documents and policies",
    "Make required checkboxes obvious with clear messaging",
    "Group related checkboxes logically",
    "Use helper text for additional context or warnings",
    "Provide clear error messages for required checkboxes",
    "Consider accessibility with proper labeling",
    "Use appropriate descriptions for different contexts",
    "Make marketing opt-ins clearly optional",
  ],
};

export const meta = {
  id: "checkboxfield",
  name: "CheckboxField",
  icon: "☑️",
  description: "Checkbox with support for description and links",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};

