import { SwitchUI } from "./SwitchUI";

export const components: PlaygroundComponent[] = [
  // === Basic SwitchField ===
  {
    id: "basic-switchfield",
    name: "Basic SwitchField",
    description: "Toggle switch for boolean settings",
    component: () => {
      return (
        <SwitchUI
          value={false}
          onChange={() => {}}
          disabled={false}
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
          return (
            <SwitchUI
              label="Terms Agreement"
              value={false}
              onChange={() => {}}
              disabled={false}
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
          return (
            <SwitchUI
              label="Age Verification"
              value={false}
              onChange={() => {}}
              disabled={false}
              error="You must be 18 or older"
              helperText="You must be 18 or older"
              className="w-full"
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
          return (
            <SwitchUI
              value={false}
              onChange={() => {}}
              disabled={true}
              label="Premium Feature"
              className="w-full"
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
      {
        name: "Active",
        component: () => {
          return (
            <SwitchUI
              value={true}
              onChange={() => {}}
              label="Active toggle"
              className="w-full"
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
