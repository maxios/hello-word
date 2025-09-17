/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { EmailFieldUI } from "./EmailFieldUI";

export const components: PlaygroundComponent[] = [
  {
    id: "email-field-ui-basic",
    name: "Basic EmailFieldUI",
    description: "Email input field with validation and formatting",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <EmailFieldUI
          value={value}
          onChange={setValue}
          label="Email Address"
          placeholder="Enter your email"
        />
      );
    },
    code: `const [value, setValue] = useState("");

<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Email Address"
  placeholder="Enter your email"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <EmailFieldUI
              value={value}
              onChange={setValue}
              label="Work Email"
              placeholder="your.name@company.com"
              required
            />
          );
        },
        code: `<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Work Email"
  placeholder="your.name@company.com"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("invalid-email");
          return (
            <EmailFieldUI
              value={value}
              onChange={setValue}
              label="Email Address"
              placeholder="Enter a valid email"
              error="Please enter a valid email address"
            />
          );
        },
        code: `<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Email Address"
  placeholder="Enter a valid email"
  error="Please enter a valid email address"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <EmailFieldUI
              value={value}
              onChange={setValue}
              label="Recovery Email"
              placeholder="backup@example.com"
              helperText="Used for account recovery and security notifications"
            />
          );
        },
        code: `<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Recovery Email"
  placeholder="backup@example.com"
  helperText="Used for account recovery and security notifications"
/>`,
      },
      {
        name: "Login Form",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <EmailFieldUI
              value={value}
              onChange={setValue}
              label="Email"
              placeholder="Enter your email to sign in"
              helperText="We'll never share your email address"
            />
          );
        },
        code: `<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Email"
  placeholder="Enter your email to sign in"
  helperText="We'll never share your email address"
/>`,
      },
      {
        name: "Newsletter Signup",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <EmailFieldUI
              value={value}
              onChange={setValue}
              label="Subscribe to Newsletter"
              placeholder="your@email.com"
              helperText="Get weekly updates and exclusive offers"
            />
          );
        },
        code: `<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Subscribe to Newsletter"
  placeholder="your@email.com"
  helperText="Get weekly updates and exclusive offers"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <EmailFieldUI
              value="user@example.com"
              onChange={() => {}}
              label="Verified Email"
              placeholder="Cannot edit verified email"
              disabled
              helperText="Email verification completed"
            />
          );
        },
        code: `<EmailFieldUI
  value="user@example.com"
  onChange={() => {}}
  label="Verified Email"
  placeholder="Cannot edit verified email"
  disabled
  helperText="Email verification completed"
/>`,
      },
      {
        name: "Pre-filled",
        component: () => {
          const [value, setValue] = useState("john.doe@example.com");
          return (
            <EmailFieldUI
              value={value}
              onChange={setValue}
              label="Current Email"
              placeholder="Enter email address"
            />
          );
        },
        code: `const [value, setValue] = useState("john.doe@example.com");

<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Current Email"
  placeholder="Enter email address"
/>`,
      },
      {
        name: "Contact Form",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <EmailFieldUI
              value={value}
              onChange={setValue}
              label="Your Email"
              placeholder="How can we reach you?"
              required
              helperText="We'll respond within 24 hours"
            />
          );
        },
        code: `<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Your Email"
  placeholder="How can we reach you?"
  required
  helperText="We'll respond within 24 hours"
/>`,
      },
      {
        name: "Invite User",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <EmailFieldUI
              value={value}
              onChange={setValue}
              label="Invite by Email"
              placeholder="colleague@company.com"
              helperText="They'll receive an invitation link"
            />
          );
        },
        code: `<EmailFieldUI
  value={value}
  onChange={setValue}
  label="Invite by Email"
  placeholder="colleague@company.com"
  helperText="They'll receive an invitation link"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `EmailFieldUI is a specialized text input optimized for email addresses. It automatically sets
the correct keyboard type (email-address), disables auto-capitalization and auto-correction,
and includes a mail icon for visual clarity. Use this component whenever you need users to input email addresses.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Always validate email format on both client and server",
    "Use clear placeholder text showing email format",
    "Provide helpful error messages for invalid emails",
    "Consider email verification for critical flows",
    "Use descriptive labels that indicate purpose",
    "Include privacy information when collecting emails",
    "Pre-fill with known email when appropriate",
    "Use required field markers for mandatory emails",
    "Provide helper text for context and expectations",
    "Consider auto-complete support for returning users",
  ],
};

export const meta = {
  id: "email-field-ui",
  name: "EmailFieldUI",
  icon: "📧",
  description:
    "Specialized input field for email addresses with proper formatting",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
