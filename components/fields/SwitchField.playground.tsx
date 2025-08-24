import { useForm } from "react-hook-form";
import { SwitchField } from "./SwitchField";

export const components: PlaygroundComponent[] = [
  // === Basic SwitchField ===
  {
    id: "basic-switchfield",
    name: "Basic SwitchField",
    description: "Toggle switch for boolean settings",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SwitchField
          control={control}
          name="notifications"
          label="Push Notifications"
        />
      );
    },
    code: `<SwitchField
  control={control}
  name="notifications"
  label="Push Notifications"
/>`,
    variations: [
      {
        name: "Required Switch",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="requiredSwitch"
              label="Terms Agreement"
              required
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="requiredSwitch"
  label="Terms Agreement"
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
            <SwitchField
              control={control}
              name="errorSwitch"
              label="Age Verification"
              error={{
                message: "You must be 18 or older",
                type: "required",
              }}
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="errorSwitch"
  label="Age Verification"
  error={{ message: "You must be 18 or older" }}
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
            <SwitchField
              control={control}
              name="disabledSwitch"
              label="Premium Feature"
              disabled
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="disabledSwitch"
  label="Premium Feature"
  disabled
/>`,
      },
    ],
  },

  // === SwitchField Notifications ===
  {
    id: "switchfield-notifications",
    name: "SwitchField Notifications",
    description: "Notification and communication settings",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SwitchField
          control={control}
          name="emailNotifications"
          label="Email Notifications"
        />
      );
    },
    code: `<SwitchField
  control={control}
  name="emailNotifications"
  label="Email Notifications"
/>`,
    variations: [
      {
        name: "Push Notifications",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="pushNotifications"
              label="Push Notifications"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="pushNotifications"
  label="Push Notifications"
/>`,
      },
      {
        name: "SMS Notifications",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="smsNotifications"
              label="SMS Notifications"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="smsNotifications"
  label="SMS Notifications"
/>`,
      },
      {
        name: "Marketing Emails",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="marketingEmails"
              label="Marketing Emails"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="marketingEmails"
  label="Marketing Emails"
/>`,
      },
    ],
  },

  // === SwitchField Settings ===
  {
    id: "switchfield-settings",
    name: "SwitchField Settings",
    description: "App settings and preferences",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SwitchField control={control} name="darkMode" label="Dark Mode" />
      );
    },
    code: `<SwitchField
  control={control}
  name="darkMode"
  label="Dark Mode"
/>`,
    variations: [
      {
        name: "Auto Save",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField control={control} name="autoSave" label="Auto Save" />
          );
        },
        code: `<SwitchField
  control={control}
  name="autoSave"
  label="Auto Save"
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
            <SwitchField control={control} name="analytics" label="Analytics" />
          );
        },
        code: `<SwitchField
  control={control}
  name="analytics"
  label="Analytics"
/>`,
      },
      {
        name: "Two-Factor Auth",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="twoFactor"
              label="Two-Factor Authentication"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="twoFactor"
  label="Two-Factor Authentication"
/>`,
      },
    ],
  },

  // === SwitchField Privacy ===
  {
    id: "switchfield-privacy",
    name: "SwitchField Privacy",
    description: "Privacy and security settings",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SwitchField
          control={control}
          name="locationSharing"
          label="Location Sharing"
        />
      );
    },
    code: `<SwitchField
  control={control}
  name="locationSharing"
  label="Location Sharing"
/>`,
    variations: [
      {
        name: "Profile Visibility",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="profileVisibility"
              label="Public Profile"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="profileVisibility"
  label="Public Profile"
/>`,
      },
      {
        name: "Data Collection",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="dataCollection"
              label="Data Collection"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="dataCollection"
  label="Data Collection"
/>`,
      },
      {
        name: "Third-Party Sharing",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="thirdPartySharing"
              label="Third-Party Data Sharing"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="thirdPartySharing"
  label="Third-Party Data Sharing"
/>`,
      },
    ],
  },

  // === SwitchField with Helper Text ===
  {
    id: "switchfield-helper",
    name: "SwitchField with Helper Text",
    description: "Switch with additional guidance",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SwitchField
          control={control}
          name="helperSwitch"
          label="Beta Features"
          helperText="Enable experimental features that may be unstable"
        />
      );
    },
    code: `<SwitchField
  control={control}
  name="helperSwitch"
  label="Beta Features"
  helperText="Enable experimental features that may be unstable"
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
            <SwitchField
              control={control}
              name="errorHelperSwitch"
              label="Age Verification"
              error={{
                message: "You must be 18 or older to continue",
                type: "required",
              }}
              helperText="This is required for legal compliance"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="errorHelperSwitch"
  label="Age Verification"
  error={{ message: "You must be 18 or older to continue" }}
  helperText="This is required for legal compliance"
/>`,
      },
    ],
  },

  // === SwitchField Features ===
  {
    id: "switchfield-features",
    name: "SwitchField Features",
    description: "Feature toggles and experimental settings",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SwitchField
          control={control}
          name="advancedFeatures"
          label="Advanced Features"
        />
      );
    },
    code: `<SwitchField
  control={control}
  name="advancedFeatures"
  label="Advanced Features"
/>`,
    variations: [
      {
        name: "Voice Commands",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="voiceCommands"
              label="Voice Commands"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="voiceCommands"
  label="Voice Commands"
/>`,
      },
      {
        name: "Gesture Controls",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="gestureControls"
              label="Gesture Controls"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="gestureControls"
  label="Gesture Controls"
/>`,
      },
      {
        name: "AI Suggestions",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SwitchField
              control={control}
              name="aiSuggestions"
              label="AI Suggestions"
            />
          );
        },
        code: `<SwitchField
  control={control}
  name="aiSuggestions"
  label="AI Suggestions"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `SwitchField is used for boolean toggles and settings. Use it for enabling/disabling features, 
notification preferences, privacy settings, and other on/off choices. Switches are ideal for settings that 
have immediate effect and don't require additional configuration. Always provide clear labels that indicate 
what the switch controls.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use SwitchField for boolean settings and feature toggles",
    "Provide clear, descriptive labels that indicate the setting's purpose",
    "Use switches for settings that have immediate effect",
    "Group related switches logically in settings sections",
    "Use helper text for additional context when needed",
    "Provide clear error messages for required switches",
    "Consider accessibility with proper labeling",
    "Use switches for simple on/off choices, not complex selections",
    "Make the default state clear and logical",
    "Use switches for settings that users frequently change",
  ],
};

export const meta = {
  id: "switchfield",
  name: "SwitchField",
  icon: "🔘",
  description: "Toggle switch component for boolean settings",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
