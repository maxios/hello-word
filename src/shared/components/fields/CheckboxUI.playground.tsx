/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { CheckboxUI } from "./CheckboxUI";

export const components: PlaygroundComponent[] = [
  {
    id: "checkbox-ui-basic",
    name: "Basic CheckboxUI",
    description: "Checkbox component with label and description",
    component: () => {
      const [checked, setChecked] = useState(false);
      return (
        <CheckboxUI
          value={checked}
          onChange={setChecked}
          label="I agree to the terms"
        />
      );
    },
    code: `const [checked, setChecked] = useState(false);

<CheckboxUI
  value={checked}
  onChange={setChecked}
  label="I agree to the terms"
/>`,
    variations: [
      {
        name: "With Description",
        component: () => {
          const [checked, setChecked] = useState(false);
          return (
            <CheckboxUI
              value={checked}
              onChange={setChecked}
              label="Subscribe to newsletter"
              description="Get weekly updates about new features and promotions"
            />
          );
        },
        code: `<CheckboxUI
  value={checked}
  onChange={setChecked}
  label="Subscribe to newsletter"
  description="Get weekly updates about new features and promotions"
/>`,
      },
      {
        name: "With Link",
        component: () => {
          const [checked, setChecked] = useState(false);
          return (
            <CheckboxUI
              value={checked}
              onChange={setChecked}
              label="Terms and Conditions"
              description="I have read and agree to the"
              linkText="terms of service"
              onLinkPress={() => console.log("Open terms")}
            />
          );
        },
        code: `<CheckboxUI
  value={checked}
  onChange={setChecked}
  label="Terms and Conditions"
  description="I have read and agree to the"
  linkText="terms of service"
  onLinkPress={() => console.log("Open terms")}
/>`,
      },
      {
        name: "Required",
        component: () => {
          const [checked, setChecked] = useState(false);
          return (
            <CheckboxUI
              value={checked}
              onChange={setChecked}
              label="Accept Privacy Policy"
              required
            />
          );
        },
        code: `<CheckboxUI
  value={checked}
  onChange={setChecked}
  label="Accept Privacy Policy"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [checked, setChecked] = useState(false);
          return (
            <CheckboxUI
              value={checked}
              onChange={setChecked}
              label="Age Verification"
              description="I confirm that I am 18 years or older"
              error="You must confirm your age to continue"
            />
          );
        },
        code: `<CheckboxUI
  value={checked}
  onChange={setChecked}
  label="Age Verification"
  description="I confirm that I am 18 years or older"
  error="You must confirm your age to continue"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [checked, setChecked] = useState(false);
          return (
            <CheckboxUI
              value={checked}
              onChange={setChecked}
              label="Remember me"
              helperText="Stay signed in for 30 days"
            />
          );
        },
        code: `<CheckboxUI
  value={checked}
  onChange={setChecked}
  label="Remember me"
  helperText="Stay signed in for 30 days"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <CheckboxUI
              value={false}
              onChange={() => {}}
              label="Premium feature"
              description="This feature requires a premium subscription"
              disabled
            />
          );
        },
        code: `<CheckboxUI
  value={false}
  onChange={() => {}}
  label="Premium feature"
  description="This feature requires a premium subscription"
  disabled
/>`,
      },
      {
        name: "Checked State",
        component: () => {
          return (
            <CheckboxUI
              value={true}
              onChange={() => {}}
              label="Notifications enabled"
              description="You will receive push notifications"
            />
          );
        },
        code: `<CheckboxUI
  value={true}
  onChange={() => {}}
  label="Notifications enabled"
  description="You will receive push notifications"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `CheckboxUI is used for single boolean choices. Use it for agreements, preferences, and toggles
that require user confirmation. The component supports descriptions for additional context and links for
terms or policies. Always make the purpose of the checkbox clear through its label and description.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use clear, action-oriented labels",
    "Add descriptions for complex choices",
    "Include links to relevant policies or terms",
    "Mark required checkboxes clearly",
    "Provide error messages for validation",
    "Use helper text for additional context",
    "Group related checkboxes together",
    "Make touch targets large enough for mobile",
    "Ensure proper contrast for accessibility",
    "Use disabled state for unavailable options",
  ],
};

export const meta = {
  id: "checkbox-ui",
  name: "CheckboxUI",
  icon: "☑️",
  description: "Checkbox component for single boolean selections",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
