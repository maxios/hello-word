/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { NumberFieldUI } from "./NumberFieldUI";

export const components: PlaygroundComponent[] = [
  {
    id: "number-field-ui-basic",
    name: "Basic NumberFieldUI",
    description: "Numeric input field with proper keyboard and validation",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <NumberFieldUI
          value={value}
          onChange={setValue}
          label="Age"
          placeholder="Enter your age"
        />
      );
    },
    code: `const [value, setValue] = useState("");

<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Age"
  placeholder="Enter your age"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Quantity"
              placeholder="Enter quantity"
              required
            />
          );
        },
        code: `<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Quantity"
  placeholder="Enter quantity"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("-5");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Price"
              placeholder="Enter price"
              error="Price must be a positive number"
            />
          );
        },
        code: `<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Price"
  placeholder="Enter price"
  error="Price must be a positive number"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Weight (kg)"
              placeholder="Enter weight in kilograms"
              helperText="Enter your weight for calorie calculations"
            />
          );
        },
        code: `<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Weight (kg)"
  placeholder="Enter weight in kilograms"
  helperText="Enter your weight for calorie calculations"
/>`,
      },
      {
        name: "Price Input",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Product Price"
              placeholder="0.00"
              helperText="Enter price in USD (e.g., 29.99)"
            />
          );
        },
        code: `<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Product Price"
  placeholder="0.00"
  helperText="Enter price in USD (e.g., 29.99)"
/>`,
      },
      {
        name: "Inventory Count",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Stock Quantity"
              placeholder="Available units"
              required
              helperText="Current number of items in stock"
            />
          );
        },
        code: `<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Stock Quantity"
  placeholder="Available units"
  required
  helperText="Current number of items in stock"
/>`,
      },
      {
        name: "Percentage",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Discount (%)"
              placeholder="Enter discount percentage"
              helperText="Enter value between 0 and 100"
            />
          );
        },
        code: `<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Discount (%)"
  placeholder="Enter discount percentage"
  helperText="Enter value between 0 and 100"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <NumberFieldUI
              value="25"
              onChange={() => {}}
              label="Current Age"
              placeholder="Cannot edit"
              disabled
              helperText="Age is calculated from birth date"
            />
          );
        },
        code: `<NumberFieldUI
  value="25"
  onChange={() => {}}
  label="Current Age"
  placeholder="Cannot edit"
  disabled
  helperText="Age is calculated from birth date"
/>`,
      },
      {
        name: "Pre-filled",
        component: () => {
          const [value, setValue] = useState("150");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Height (cm)"
              placeholder="Enter height"
            />
          );
        },
        code: `const [value, setValue] = useState("150");

<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Height (cm)"
  placeholder="Enter height"
/>`,
      },
      {
        name: "Score Input",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Test Score"
              placeholder="Enter score (0-100)"
              required
              helperText="Score must be between 0 and 100"
            />
          );
        },
        code: `<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Test Score"
  placeholder="Enter score (0-100)"
  required
  helperText="Score must be between 0 and 100"
/>`,
      },
      {
        name: "Duration Minutes",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <NumberFieldUI
              value={value}
              onChange={setValue}
              label="Duration (minutes)"
              placeholder="Exercise duration"
              helperText="How long did the exercise take?"
            />
          );
        },
        code: `<NumberFieldUI
  value={value}
  onChange={setValue}
  label="Duration (minutes)"
  placeholder="Exercise duration"
  helperText="How long did the exercise take?"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `NumberFieldUI is optimized for numeric input with the numeric keyboard on mobile devices.
It includes a trending up icon to indicate numeric data entry and disables auto-capitalization and auto-correction.
Use this component for any numeric data including ages, quantities, prices, scores, and measurements.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Always validate numeric input ranges on both client and server",
    "Use clear placeholder text showing expected format or range",
    "Include unit information in labels or helper text",
    "Provide meaningful error messages for out-of-range values",
    "Consider decimal places for prices and measurements",
    "Use appropriate step values for different numeric types",
    "Include minimum and maximum value guidance",
    "Consider using stepper components for small ranges",
    "Format displayed numbers appropriately (commas, decimals)",
    "Provide context about what the number represents",
  ],
};

export const meta = {
  id: "number-field-ui",
  name: "NumberFieldUI",
  icon: "🔢",
  description:
    "Specialized input field for numeric values with proper keyboard",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
