/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { PhoneFieldUI } from "./PhoneFieldUI";

export const components: PlaygroundComponent[] = [
  {
    id: "phone-field-ui-basic",
    name: "Basic PhoneFieldUI",
    description: "Phone number input field with proper keyboard and formatting",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <PhoneFieldUI
          value={value}
          onChange={setValue}
          label="Phone Number"
          placeholder="Enter your phone number"
        />
      );
    },
    code: `const [value, setValue] = useState("");

<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Phone Number"
  placeholder="Enter your phone number"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PhoneFieldUI
              value={value}
              onChange={setValue}
              label="Contact Number"
              placeholder="(555) 123-4567"
              required
            />
          );
        },
        code: `<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Contact Number"
  placeholder="(555) 123-4567"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("123-45");
          return (
            <PhoneFieldUI
              value={value}
              onChange={setValue}
              label="Phone Number"
              placeholder="Enter a valid phone number"
              error="Please enter a complete phone number"
            />
          );
        },
        code: `<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Phone Number"
  placeholder="Enter a valid phone number"
  error="Please enter a complete phone number"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PhoneFieldUI
              value={value}
              onChange={setValue}
              label="Mobile Number"
              placeholder="+1 (555) 123-4567"
              helperText="Include country code for international numbers"
            />
          );
        },
        code: `<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Mobile Number"
  placeholder="+1 (555) 123-4567"
  helperText="Include country code for international numbers"
/>`,
      },
      {
        name: "Emergency Contact",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PhoneFieldUI
              value={value}
              onChange={setValue}
              label="Emergency Contact"
              placeholder="Emergency contact number"
              required
              helperText="This will be used in case of emergency"
            />
          );
        },
        code: `<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Emergency Contact"
  placeholder="Emergency contact number"
  required
  helperText="This will be used in case of emergency"
/>`,
      },
      {
        name: "Business Phone",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PhoneFieldUI
              value={value}
              onChange={setValue}
              label="Business Phone"
              placeholder="Office or business number"
              helperText="Optional: Include extension if applicable"
            />
          );
        },
        code: `<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Business Phone"
  placeholder="Office or business number"
  helperText="Optional: Include extension if applicable"
/>`,
      },
      {
        name: "Verification Setup",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PhoneFieldUI
              value={value}
              onChange={setValue}
              label="Phone for SMS Verification"
              placeholder="Mobile number for 2FA"
              required
              helperText="We'll send verification codes to this number"
            />
          );
        },
        code: `<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Phone for SMS Verification"
  placeholder="Mobile number for 2FA"
  required
  helperText="We'll send verification codes to this number"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <PhoneFieldUI
              value="+1 (555) 123-4567"
              onChange={() => {}}
              label="Verified Phone"
              placeholder="Cannot edit verified number"
              disabled
              helperText="Phone number verified and locked"
            />
          );
        },
        code: `<PhoneFieldUI
  value="+1 (555) 123-4567"
  onChange={() => {}}
  label="Verified Phone"
  placeholder="Cannot edit verified number"
  disabled
  helperText="Phone number verified and locked"
/>`,
      },
      {
        name: "Pre-filled",
        component: () => {
          const [value, setValue] = useState("+1 (555) 987-6543");
          return (
            <PhoneFieldUI
              value={value}
              onChange={setValue}
              label="Current Phone"
              placeholder="Update your phone number"
            />
          );
        },
        code: `const [value, setValue] = useState("+1 (555) 987-6543");

<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Current Phone"
  placeholder="Update your phone number"
/>`,
      },
      {
        name: "Delivery Contact",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PhoneFieldUI
              value={value}
              onChange={setValue}
              label="Delivery Contact Number"
              placeholder="Phone for delivery updates"
              helperText="Courier will call this number if needed"
            />
          );
        },
        code: `<PhoneFieldUI
  value={value}
  onChange={setValue}
  label="Delivery Contact Number"
  placeholder="Phone for delivery updates"
  helperText="Courier will call this number if needed"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `PhoneFieldUI is optimized for phone number input with the numeric keyboard on mobile devices.
It disables auto-capitalization and auto-correction, and includes appropriate autocomplete settings.
Use this component for any phone number collection including personal, business, and emergency contacts.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Always validate phone number format and completeness",
    "Consider international number formats in validation",
    "Use clear placeholder text showing expected format",
    "Provide context about why the phone number is needed",
    "Include country code guidance for international users",
    "Consider SMS verification for critical phone numbers",
    "Use appropriate labels for different phone types",
    "Provide clear error messages for invalid formats",
    "Consider auto-formatting as user types",
    "Include privacy information about phone number usage",
  ],
};

export const meta = {
  id: "phone-field-ui",
  name: "PhoneFieldUI",
  icon: "📞",
  description:
    "Specialized input field for phone numbers with numeric keyboard",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
