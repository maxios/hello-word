/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { SliderUI } from "./SliderUI";

export const components: PlaygroundComponent[] = [
  {
    id: "slider-ui-basic",
    name: "Basic SliderUI",
    description: "Slider component for selecting numeric values within a range",
    component: () => {
      const [value, setValue] = useState(50);
      return (
        <SliderUI
          value={value}
          onChange={setValue}
          label="Volume"
          minimumValue={0}
          maximumValue={100}
          valueSuffix="%"
        />
      );
    },
    code: `const [value, setValue] = useState(50);

<SliderUI
  value={value}
  onChange={setValue}
  label="Volume"
  minimumValue={0}
  maximumValue={100}
  valueSuffix="%"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState(0);
          return (
            <SliderUI
              value={value}
              onChange={setValue}
              label="Priority Level"
              minimumValue={1}
              maximumValue={10}
              required
            />
          );
        },
        code: `<SliderUI
  value={value}
  onChange={setValue}
  label="Priority Level"
  minimumValue={1}
  maximumValue={10}
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState(15);
          return (
            <SliderUI
              value={value}
              onChange={setValue}
              label="Age"
              minimumValue={18}
              maximumValue={100}
              error="Must be 18 or older"
            />
          );
        },
        code: `<SliderUI
  value={value}
  onChange={setValue}
  label="Age"
  minimumValue={18}
  maximumValue={100}
  error="Must be 18 or older"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState(2500);
          return (
            <SliderUI
              value={value}
              onChange={setValue}
              label="Daily Calorie Goal"
              minimumValue={1200}
              maximumValue={4000}
              step={50}
              valueSuffix=" cal"
              helperText="Recommended daily calorie intake"
            />
          );
        },
        code: `<SliderUI
  value={value}
  onChange={setValue}
  label="Daily Calorie Goal"
  minimumValue={1200}
  maximumValue={4000}
  step={50}
  valueSuffix=" cal"
  helperText="Recommended daily calorie intake"
/>`,
      },
      {
        name: "Price Range",
        component: () => {
          const [value, setValue] = useState(250);
          return (
            <SliderUI
              value={value}
              onChange={setValue}
              label="Budget"
              minimumValue={50}
              maximumValue={1000}
              step={25}
              valueSuffix="$"
              helperText="Set your maximum budget"
            />
          );
        },
        code: `<SliderUI
  value={value}
  onChange={setValue}
  label="Budget"
  minimumValue={50}
  maximumValue={1000}
  step={25}
  valueSuffix="$"
  helperText="Set your maximum budget"
/>`,
      },
      {
        name: "Temperature",
        component: () => {
          const [value, setValue] = useState(22);
          return (
            <SliderUI
              value={value}
              onChange={setValue}
              label="Room Temperature"
              minimumValue={16}
              maximumValue={30}
              step={0.5}
              valueSuffix="°C"
              helperText="Adjust room temperature"
            />
          );
        },
        code: `<SliderUI
  value={value}
  onChange={setValue}
  label="Room Temperature"
  minimumValue={16}
  maximumValue={30}
  step={0.5}
  valueSuffix="°C"
  helperText="Adjust room temperature"
/>`,
      },
      {
        name: "Workout Intensity",
        component: () => {
          const [value, setValue] = useState(7);
          return (
            <SliderUI
              value={value}
              onChange={setValue}
              label="Workout Intensity"
              minimumValue={1}
              maximumValue={10}
              step={1}
              valueSuffix="/10"
              helperText="Rate your workout intensity (1-10)"
            />
          );
        },
        code: `<SliderUI
  value={value}
  onChange={setValue}
  label="Workout Intensity"
  minimumValue={1}
  maximumValue={10}
  step={1}
  valueSuffix="/10"
  helperText="Rate your workout intensity (1-10)"
/>`,
      },
      {
        name: "Without Value Display",
        component: () => {
          const [value, setValue] = useState(3);
          return (
            <SliderUI
              value={value}
              onChange={setValue}
              label="Difficulty Level"
              minimumValue={1}
              maximumValue={5}
              showValue={false}
              helperText="Slide to adjust difficulty"
            />
          );
        },
        code: `<SliderUI
  value={value}
  onChange={setValue}
  label="Difficulty Level"
  minimumValue={1}
  maximumValue={5}
  showValue={false}
  helperText="Slide to adjust difficulty"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <SliderUI
              value={75}
              onChange={() => {}}
              label="System Volume"
              minimumValue={0}
              maximumValue={100}
              valueSuffix="%"
              disabled
              helperText="Volume is locked by administrator"
            />
          );
        },
        code: `<SliderUI
  value={75}
  onChange={() => {}}
  label="System Volume"
  minimumValue={0}
  maximumValue={100}
  valueSuffix="%"
  disabled
  helperText="Volume is locked by administrator"
/>`,
      },
      {
        name: "Exercise Duration",
        component: () => {
          const [value, setValue] = useState(30);
          return (
            <SliderUI
              value={value}
              onChange={setValue}
              label="Exercise Duration"
              minimumValue={5}
              maximumValue={120}
              step={5}
              valueSuffix=" min"
              helperText="How long do you want to exercise?"
            />
          );
        },
        code: `<SliderUI
  value={value}
  onChange={setValue}
  label="Exercise Duration"
  minimumValue={5}
  maximumValue={120}
  step={5}
  valueSuffix=" min"
  helperText="How long do you want to exercise?"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `SliderUI provides an intuitive way to select numeric values within a defined range.
It's ideal for settings, preferences, ratings, and any numeric input where users need to see
the relative position within a range. The component shows min/max values and current selection clearly.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use for numeric values where relative position matters",
    "Set appropriate minimum and maximum values for the context",
    "Choose step values that make sense for your use case",
    "Include value suffixes (%, $, °C) to clarify units",
    "Use helper text to explain what the value controls",
    "Consider hiding value display for subjective scales",
    "Provide meaningful labels that describe what's being adjusted",
    "Test on both mobile and desktop for proper touch interaction",
    "Use reasonable default values when possible",
    "Validate selected values on both client and server",
  ],
};

export const meta = {
  id: "slider-ui",
  name: "SliderUI",
  icon: "🎚️",
  description: "Interactive slider for selecting numeric values within a range",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
