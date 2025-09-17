/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { PasswordFieldUI } from "./PasswordFieldUI";

export const components: PlaygroundComponent[] = [
  {
    id: "password-field-ui-basic",
    name: "Basic PasswordFieldUI",
    description: "Password input field with show/hide toggle functionality",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <PasswordFieldUI
          value={value}
          onChange={setValue}
          label="Password"
          placeholder="Enter your password"
        />
      );
    },
    code: `const [value, setValue] = useState("");

<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="Password"
  placeholder="Enter your password"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PasswordFieldUI
              value={value}
              onChange={setValue}
              label="Account Password"
              placeholder="Create a secure password"
              required
            />
          );
        },
        code: `<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="Account Password"
  placeholder="Create a secure password"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("123");
          return (
            <PasswordFieldUI
              value={value}
              onChange={setValue}
              label="Password"
              placeholder="Enter a strong password"
              error="Password must be at least 8 characters long"
            />
          );
        },
        code: `<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="Password"
  placeholder="Enter a strong password"
  error="Password must be at least 8 characters long"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PasswordFieldUI
              value={value}
              onChange={setValue}
              label="New Password"
              placeholder="Create a strong password"
              helperText="Must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number"
            />
          );
        },
        code: `<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="New Password"
  placeholder="Create a strong password"
  helperText="Must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number"
/>`,
      },
      {
        name: "Login Form",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PasswordFieldUI
              value={value}
              onChange={setValue}
              label="Password"
              placeholder="Enter your password to sign in"
            />
          );
        },
        code: `<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="Password"
  placeholder="Enter your password to sign in"
/>`,
      },
      {
        name: "Confirm Password",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PasswordFieldUI
              value={value}
              onChange={setValue}
              label="Confirm Password"
              placeholder="Re-enter your password"
              required
              helperText="Must match the password above"
            />
          );
        },
        code: `<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="Confirm Password"
  placeholder="Re-enter your password"
  required
  helperText="Must match the password above"
/>`,
      },
      {
        name: "Current Password",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PasswordFieldUI
              value={value}
              onChange={setValue}
              label="Current Password"
              placeholder="Enter your current password"
              required
              helperText="Required to change your password"
            />
          );
        },
        code: `<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="Current Password"
  placeholder="Enter your current password"
  required
  helperText="Required to change your password"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <PasswordFieldUI
              value="••••••••••••"
              onChange={() => {}}
              label="Locked Password"
              placeholder="Cannot edit"
              disabled
              helperText="Password is locked for security"
            />
          );
        },
        code: `<PasswordFieldUI
  value="••••••••••••"
  onChange={() => {}}
  label="Locked Password"
  placeholder="Cannot edit"
  disabled
  helperText="Password is locked for security"
/>`,
      },
      {
        name: "With Strong Password",
        component: () => {
          const [value, setValue] = useState("MySecure123!");
          return (
            <PasswordFieldUI
              value={value}
              onChange={setValue}
              label="Password"
              placeholder="Enter password"
              helperText="Password strength: Strong"
            />
          );
        },
        code: `const [value, setValue] = useState("MySecure123!");

<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="Password"
  placeholder="Enter password"
  helperText="Password strength: Strong"
/>`,
      },
      {
        name: "Signup Form",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <PasswordFieldUI
              value={value}
              onChange={setValue}
              label="Create Password"
              placeholder="Choose a secure password"
              required
              helperText="Use a mix of letters, numbers, and symbols for better security"
            />
          );
        },
        code: `<PasswordFieldUI
  value={value}
  onChange={setValue}
  label="Create Password"
  placeholder="Choose a secure password"
  required
  helperText="Use a mix of letters, numbers, and symbols for better security"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `PasswordFieldUI is a specialized input for password entry with built-in security features.
It includes a toggle button to show/hide password text, uses secure text entry by default,
and includes a lock icon for visual clarity. The component helps users verify their input while maintaining security.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Always validate password strength on both client and server",
    "Provide clear requirements for password creation",
    "Use show/hide toggle for user convenience",
    "Include helpful error messages for validation failures",
    "Consider password strength indicators for new passwords",
    "Use different labels for different contexts (login vs signup)",
    "Implement proper security measures on the backend",
    "Consider autocomplete settings for password managers",
    "Provide forgot password functionality for login forms",
    "Use confirmation fields for critical password changes",
  ],
};

export const meta = {
  id: "password-field-ui",
  name: "PasswordFieldUI",
  icon: "🔒",
  description:
    "Secure password input field with show/hide toggle functionality",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
