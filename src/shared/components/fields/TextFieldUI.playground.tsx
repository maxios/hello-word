/* eslint-disable react-hooks/rules-of-hooks */

import { MagnifyingGlassIcon, XIcon } from "@/components/icons";
import { useState } from "react";
import { TextFieldUI } from "./TextFieldUI";

export const components: PlaygroundComponent[] = [
  {
    id: "textfield-ui-basic",
    name: "Basic TextFieldUI",
    description: "Standard text input component",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <TextFieldUI
          value={value}
          onChange={setValue}
          label="Full Name"
          placeholder="Enter your full name"
        />
      );
    },
    code: `const [value, setValue] = useState("");

<TextFieldUI
  value={value}
  onChange={setValue}
  label="Full Name"
  placeholder="Enter your full name"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextFieldUI
              value={value}
              onChange={setValue}
              label="Email Address"
              placeholder="Enter your email"
              required
            />
          );
        },
        code: `<TextFieldUI
  value={value}
  onChange={setValue}
  label="Email Address"
  placeholder="Enter your email"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextFieldUI
              value={value}
              onChange={setValue}
              label="Username"
              placeholder="Choose a username"
              error="Username already taken"
            />
          );
        },
        code: `<TextFieldUI
  value={value}
  onChange={setValue}
  label="Username"
  placeholder="Choose a username"
  error="Username already taken"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextFieldUI
              value={value}
              onChange={setValue}
              label="Password"
              placeholder="Create a strong password"
              helperText="Must be at least 8 characters"
              secureTextEntry
            />
          );
        },
        code: `<TextFieldUI
  value={value}
  onChange={setValue}
  label="Password"
  placeholder="Create a strong password"
  helperText="Must be at least 8 characters"
  secureTextEntry
/>`,
      },
      {
        name: "With Left Icon",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextFieldUI
              value={value}
              onChange={setValue}
              placeholder="Search..."
              leftIcon={
                <MagnifyingGlassIcon className="text-muted-foreground" />
              }
            />
          );
        },
        code: `<TextFieldUI
  value={value}
  onChange={setValue}
  placeholder="Search..."
  leftIcon={<MagnifyingGlassIcon className="text-muted-foreground" />}
/>`,
      },
      {
        name: "With Right Icon",
        component: () => {
          const [value, setValue] = useState("Clear me");
          return (
            <TextFieldUI
              value={value}
              onChange={setValue}
              placeholder="Type something..."
              rightIcon={<XIcon className="text-muted-foreground" />}
              onRightIconPress={() => setValue("")}
            />
          );
        },
        code: `<TextFieldUI
  value={value}
  onChange={setValue}
  placeholder="Type something..."
  rightIcon={<XIcon className="text-muted-foreground" />}
  onRightIconPress={() => setValue("")}
/>`,
      },
      {
        name: "Multiline",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextFieldUI
              value={value}
              onChange={setValue}
              label="Description"
              placeholder="Tell us about yourself..."
              multiline
              numberOfLines={4}
            />
          );
        },
        code: `<TextFieldUI
  value={value}
  onChange={setValue}
  label="Description"
  placeholder="Tell us about yourself..."
  multiline
  numberOfLines={4}
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <TextFieldUI
              value="Cannot edit this"
              onChange={() => {}}
              label="Readonly Field"
              disabled
            />
          );
        },
        code: `<TextFieldUI
  value="Cannot edit this"
  onChange={() => {}}
  label="Readonly Field"
  disabled
/>`,
      },
      {
        name: "Numeric Keyboard",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextFieldUI
              value={value}
              onChange={setValue}
              label="Phone Number"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          );
        },
        code: `<TextFieldUI
  value={value}
  onChange={setValue}
  label="Phone Number"
  placeholder="Enter phone number"
  keyboardType="phone-pad"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `TextFieldUI is the base text input component. Use it directly when you don't need form integration.
It supports various input types, icons, multiline text, and different keyboard types. This component handles
its own focus state and provides full control over the value and change handlers.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Always provide clear labels for accessibility",
    "Use placeholder text to show expected input format",
    "Add helper text for complex validation rules",
    "Use appropriate keyboard types for better UX",
    "Provide clear error messages when validation fails",
    "Use left icons to indicate input type",
    "Use right icons for actions like clear or show/hide",
    "Set maxLength for inputs with character limits",
    "Use multiline for longer text inputs",
    "Disable fields that shouldn't be edited",
  ],
};

export const meta = {
  id: "textfield-ui",
  name: "TextFieldUI",
  icon: "📝",
  description: "Base text input component for various text entry needs",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
