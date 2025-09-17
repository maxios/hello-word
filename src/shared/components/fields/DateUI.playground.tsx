/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { DateUI } from "./DateUI";

export const components: PlaygroundComponent[] = [
  {
    id: "date-ui-basic",
    name: "Basic DateUI",
    description: "Date picker component with calendar interface",
    component: () => {
      const [value, setValue] = useState<Date | null>(null);
      return (
        <DateUI
          value={value}
          onChange={setValue}
          label="Birth Date"
          placeholder="Select your birth date"
        />
      );
    },
    code: `const [value, setValue] = useState<Date | null>(null);

<DateUI
  value={value}
  onChange={setValue}
  label="Birth Date"
  placeholder="Select your birth date"
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState<Date | null>(null);
          return (
            <DateUI
              value={value}
              onChange={setValue}
              label="Event Date"
              placeholder="Choose event date"
              required
            />
          );
        },
        code: `<DateUI
  value={value}
  onChange={setValue}
  label="Event Date"
  placeholder="Choose event date"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState<Date | null>(null);
          return (
            <DateUI
              value={value}
              onChange={setValue}
              label="Appointment Date"
              placeholder="Select appointment date"
              error="Please select a future date"
            />
          );
        },
        code: `<DateUI
  value={value}
  onChange={setValue}
  label="Appointment Date"
  placeholder="Select appointment date"
  error="Please select a future date"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState<Date | null>(null);
          return (
            <DateUI
              value={value}
              onChange={setValue}
              label="Deadline"
              placeholder="Set project deadline"
              helperText="Choose a realistic deadline for project completion"
            />
          );
        },
        code: `<DateUI
  value={value}
  onChange={setValue}
  label="Deadline"
  placeholder="Set project deadline"
  helperText="Choose a realistic deadline for project completion"
/>`,
      },
      {
        name: "Time Mode",
        component: () => {
          const [value, setValue] = useState<Date | null>(null);
          return (
            <DateUI
              value={value}
              onChange={setValue}
              label="Meeting Time"
              placeholder="Select meeting time"
              mode="time"
            />
          );
        },
        code: `<DateUI
  value={value}
  onChange={setValue}
  label="Meeting Time"
  placeholder="Select meeting time"
  mode="time"
/>`,
      },
      {
        name: "DateTime Mode",
        component: () => {
          const [value, setValue] = useState<Date | null>(null);
          return (
            <DateUI
              value={value}
              onChange={setValue}
              label="Event Start"
              placeholder="Select date and time"
              mode="datetime"
            />
          );
        },
        code: `<DateUI
  value={value}
  onChange={setValue}
  label="Event Start"
  placeholder="Select date and time"
  mode="datetime"
/>`,
      },
      {
        name: "With Date Restrictions",
        component: () => {
          const [value, setValue] = useState<Date | null>(null);
          const today = new Date();
          const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
          return (
            <DateUI
              value={value}
              onChange={setValue}
              label="Booking Date"
              placeholder="Select booking date"
              minimumDate={today}
              maximumDate={maxDate}
              helperText="Available dates: today to 30 days ahead"
            />
          );
        },
        code: `const today = new Date();
const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

<DateUI
  value={value}
  onChange={setValue}
  label="Booking Date"
  placeholder="Select booking date"
  minimumDate={today}
  maximumDate={maxDate}
  helperText="Available dates: today to 30 days ahead"
/>`,
      },
      {
        name: "Age Verification",
        component: () => {
          const [value, setValue] = useState<Date | null>(null);
          const eighteenYearsAgo = new Date();
          eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
          return (
            <DateUI
              value={value}
              onChange={setValue}
              label="Date of Birth"
              placeholder="Verify you are 18 or older"
              maximumDate={eighteenYearsAgo}
              required
              helperText="Must be 18 years or older to register"
            />
          );
        },
        code: `const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

<DateUI
  value={value}
  onChange={setValue}
  label="Date of Birth"
  placeholder="Verify you are 18 or older"
  maximumDate={eighteenYearsAgo}
  required
  helperText="Must be 18 years or older to register"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          const fixedDate = new Date(2024, 5, 15); // June 15, 2024
          return (
            <DateUI
              value={fixedDate}
              onChange={() => {}}
              label="Registration Date"
              placeholder="Cannot change"
              disabled
              helperText="Registration date is locked"
            />
          );
        },
        code: `const fixedDate = new Date(2024, 5, 15);

<DateUI
  value={fixedDate}
  onChange={() => {}}
  label="Registration Date"
  placeholder="Cannot change"
  disabled
  helperText="Registration date is locked"
/>`,
      },
      {
        name: "Pre-selected Date",
        component: () => {
          const [value, setValue] = useState<Date | null>(new Date());
          return (
            <DateUI
              value={value}
              onChange={setValue}
              label="Start Date"
              placeholder="Select start date"
              helperText="Defaults to today's date"
            />
          );
        },
        code: `const [value, setValue] = useState<Date | null>(new Date());

<DateUI
  value={value}
  onChange={setValue}
  label="Start Date"
  placeholder="Select start date"
  helperText="Defaults to today's date"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `DateUI provides a user-friendly date and time picker interface using the native platform pickers.
It supports date, time, and datetime modes, with optional minimum and maximum date restrictions.
The component displays the selected value in a readable format and shows a calendar icon for clarity.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Always validate selected dates on both client and server",
    "Use appropriate mode (date, time, datetime) for the context",
    "Set minimum and maximum dates when there are logical constraints",
    "Provide clear labels indicating what date is being selected",
    "Include helper text explaining date restrictions or requirements",
    "Consider time zones for datetime inputs in global applications",
    "Use consistent date formatting throughout your application",
    "Provide meaningful error messages for invalid date selections",
    "Consider accessibility for users with different date preferences",
    "Pre-select reasonable default dates when appropriate",
  ],
};

export const meta = {
  id: "date-ui",
  name: "DateUI",
  icon: "📅",
  description: "Date and time picker with calendar interface and validation",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
