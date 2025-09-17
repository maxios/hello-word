/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { SelectUI } from "./SelectUI";

const colorOptions = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Yellow", value: "yellow" },
  { label: "Purple", value: "purple" },
];

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp", disabled: true },
  { label: "Australia", value: "au" },
];

const skillOptions = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "React", value: "react" },
  { label: "Node.js", value: "node" },
  { label: "Python", value: "python" },
  { label: "Go", value: "go" },
];

export const components: PlaygroundComponent[] = [
  {
    id: "select-ui-basic",
    name: "Basic SelectUI",
    description: "Standard select dropdown component",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <SelectUI
          value={value}
          onChange={setValue}
          options={colorOptions}
          label="Favorite Color"
          placeholder="Choose a color"
        />
      );
    },
    code: `const [value, setValue] = useState("");

<SelectUI
  value={value}
  onChange={setValue}
  options={colorOptions}
  label="Favorite Color"
  placeholder="Choose a color"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SelectUI
              value={value}
              onChange={setValue}
              options={countryOptions}
              label="Country"
              placeholder="Select your country"
              required
            />
          );
        },
        code: `<SelectUI
  value={value}
  onChange={setValue}
  options={countryOptions}
  label="Country"
  placeholder="Select your country"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SelectUI
              value={value}
              onChange={setValue}
              options={colorOptions}
              label="Theme Color"
              placeholder="Pick a theme color"
              error="Please select a valid color"
            />
          );
        },
        code: `<SelectUI
  value={value}
  onChange={setValue}
  options={colorOptions}
  label="Theme Color"
  placeholder="Pick a theme color"
  error="Please select a valid color"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SelectUI
              value={value}
              onChange={setValue}
              options={countryOptions}
              label="Shipping Country"
              placeholder="Select country"
              helperText="Shipping rates vary by country"
            />
          );
        },
        code: `<SelectUI
  value={value}
  onChange={setValue}
  options={countryOptions}
  label="Shipping Country"
  placeholder="Select country"
  helperText="Shipping rates vary by country"
/>`,
      },
      {
        name: "Multiple Selection",
        component: () => {
          const [value, setValue] = useState([]);
          return (
            <SelectUI
              value={value}
              onChange={setValue}
              options={skillOptions}
              label="Skills"
              placeholder="Select your skills"
              multiple
            />
          );
        },
        code: `const [value, setValue] = useState([]);

<SelectUI
  value={value}
  onChange={setValue}
  options={skillOptions}
  label="Skills"
  placeholder="Select your skills"
  multiple
/>`,
      },
      {
        name: "With Disabled Options",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SelectUI
              value={value}
              onChange={setValue}
              options={countryOptions}
              label="Available Countries"
              placeholder="Select country"
              helperText="Some countries are temporarily unavailable"
            />
          );
        },
        code: `<SelectUI
  value={value}
  onChange={setValue}
  options={countryOptions}
  label="Available Countries"
  placeholder="Select country"
  helperText="Some countries are temporarily unavailable"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <SelectUI
              value="red"
              onChange={() => {}}
              options={colorOptions}
              label="Locked Selection"
              placeholder="Cannot change"
              disabled
            />
          );
        },
        code: `<SelectUI
  value="red"
  onChange={() => {}}
  options={colorOptions}
  label="Locked Selection"
  placeholder="Cannot change"
  disabled
/>`,
      },
      {
        name: "Pre-selected Value",
        component: () => {
          const [value, setValue] = useState("blue");
          return (
            <SelectUI
              value={value}
              onChange={setValue}
              options={colorOptions}
              label="Default Color"
              placeholder="Choose a color"
            />
          );
        },
        code: `const [value, setValue] = useState("blue");

<SelectUI
  value={value}
  onChange={setValue}
  options={colorOptions}
  label="Default Color"
  placeholder="Choose a color"
/>`,
      },
      {
        name: "Multiple with Pre-selection",
        component: () => {
          const [value, setValue] = useState(["js", "react"]);
          return (
            <SelectUI
              value={value}
              onChange={setValue}
              options={skillOptions}
              label="Your Skills"
              placeholder="Add more skills"
              multiple
              helperText="Select all that apply"
            />
          );
        },
        code: `const [value, setValue] = useState(["js", "react"]);

<SelectUI
  value={value}
  onChange={setValue}
  options={skillOptions}
  label="Your Skills"
  placeholder="Add more skills"
  multiple
  helperText="Select all that apply"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `SelectUI provides a dropdown interface for selecting one or multiple options from a list.
It supports both single and multiple selections, disabled options, and shows selected values clearly.
The component uses a modal on mobile for better user experience and touch interaction.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Provide clear, descriptive labels for accessibility",
    "Use placeholder text to indicate the expected selection",
    "Include helper text for complex selection rules",
    "Mark required fields clearly with asterisk",
    "Provide error messages for validation failures",
    "Use disabled state for unavailable options",
    "Keep option labels concise but descriptive",
    "Group related options when you have many choices",
    "Consider search functionality for long option lists",
    "Use multiple selection sparingly to avoid complexity",
  ],
};

export const meta = {
  id: "select-ui",
  name: "SelectUI",
  icon: "📋",
  description: "Dropdown component for single or multiple option selection",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
