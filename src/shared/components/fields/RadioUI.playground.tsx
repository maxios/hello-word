/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { RadioUI } from "./RadioUI";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "not_specified" },
];

const priorityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

const paymentOptions = [
  { label: "Credit Card", value: "credit" },
  { label: "PayPal", value: "paypal" },
  { label: "Bank Transfer", value: "bank", disabled: true },
  { label: "Cash", value: "cash" },
];

const sizeOptions = [
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
];

export const components: PlaygroundComponent[] = [
  {
    id: "radio-ui-basic",
    name: "Basic RadioUI",
    description: "Standard radio button group component",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <RadioUI
          value={value}
          onChange={setValue}
          options={genderOptions}
          label="Gender"
        />
      );
    },
    code: `const [value, setValue] = useState("");

<RadioUI
  value={value}
  onChange={setValue}
  options={genderOptions}
  label="Gender"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <RadioUI
              value={value}
              onChange={setValue}
              options={priorityOptions}
              label="Priority Level"
              required
            />
          );
        },
        code: `<RadioUI
  value={value}
  onChange={setValue}
  options={priorityOptions}
  label="Priority Level"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <RadioUI
              value={value}
              onChange={setValue}
              options={genderOptions}
              label="Gender Selection"
              error="Please select an option"
            />
          );
        },
        code: `<RadioUI
  value={value}
  onChange={setValue}
  options={genderOptions}
  label="Gender Selection"
  error="Please select an option"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <RadioUI
              value={value}
              onChange={setValue}
              options={paymentOptions}
              label="Payment Method"
              helperText="Choose your preferred payment option"
            />
          );
        },
        code: `<RadioUI
  value={value}
  onChange={setValue}
  options={paymentOptions}
  label="Payment Method"
  helperText="Choose your preferred payment option"
/>`,
      },
      {
        name: "Horizontal Layout",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <RadioUI
              value={value}
              onChange={setValue}
              options={sizeOptions}
              label="Size"
              direction="horizontal"
            />
          );
        },
        code: `<RadioUI
  value={value}
  onChange={setValue}
  options={sizeOptions}
  label="Size"
  direction="horizontal"
/>`,
      },
      {
        name: "Horizontal with Priority",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <RadioUI
              value={value}
              onChange={setValue}
              options={priorityOptions}
              label="Task Priority"
              direction="horizontal"
              helperText="Select task urgency level"
            />
          );
        },
        code: `<RadioUI
  value={value}
  onChange={setValue}
  options={priorityOptions}
  label="Task Priority"
  direction="horizontal"
  helperText="Select task urgency level"
/>`,
      },
      {
        name: "With Disabled Options",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <RadioUI
              value={value}
              onChange={setValue}
              options={paymentOptions}
              label="Available Payment Methods"
              helperText="Bank transfer is temporarily unavailable"
            />
          );
        },
        code: `<RadioUI
  value={value}
  onChange={setValue}
  options={paymentOptions}
  label="Available Payment Methods"
  helperText="Bank transfer is temporarily unavailable"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <RadioUI
              value="medium"
              onChange={() => {}}
              options={priorityOptions}
              label="Locked Priority"
              disabled
            />
          );
        },
        code: `<RadioUI
  value="medium"
  onChange={() => {}}
  options={priorityOptions}
  label="Locked Priority"
  disabled
/>`,
      },
      {
        name: "Pre-selected Value",
        component: () => {
          const [value, setValue] = useState("medium");
          return (
            <RadioUI
              value={value}
              onChange={setValue}
              options={priorityOptions}
              label="Default Priority"
            />
          );
        },
        code: `const [value, setValue] = useState("medium");

<RadioUI
  value={value}
  onChange={setValue}
  options={priorityOptions}
  label="Default Priority"
/>`,
      },
      {
        name: "Horizontal Pre-selected",
        component: () => {
          const [value, setValue] = useState("m");
          return (
            <RadioUI
              value={value}
              onChange={setValue}
              options={sizeOptions}
              label="Selected Size"
              direction="horizontal"
              helperText="Medium size is pre-selected"
            />
          );
        },
        code: `const [value, setValue] = useState("m");

<RadioUI
  value={value}
  onChange={setValue}
  options={sizeOptions}
  label="Selected Size"
  direction="horizontal"
  helperText="Medium size is pre-selected"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `RadioUI is used for mutually exclusive selections where only one option can be chosen.
Use it when you need users to pick exactly one option from a small to medium list.
For better space efficiency with short options, use horizontal layout.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use for mutually exclusive choices only",
    "Provide clear, descriptive option labels",
    "Keep options concise and scannable",
    "Use vertical layout for longer option labels",
    "Use horizontal layout for short options (4-5 max)",
    "Mark required groups clearly",
    "Provide error messages for validation",
    "Consider pre-selecting the most common option",
    "Group related options logically",
    "Use disabled state for unavailable options",
  ],
};

export const meta = {
  id: "radio-ui",
  name: "RadioUI",
  icon: "🔘",
  description: "Radio button group for mutually exclusive selections",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
