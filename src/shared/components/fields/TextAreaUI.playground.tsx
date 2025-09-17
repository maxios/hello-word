/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { TextAreaUI } from "./TextAreaUI";

export const components: PlaygroundComponent[] = [
  {
    id: "textarea-ui-basic",
    name: "Basic TextAreaUI",
    description: "Multi-line text input component for longer text content",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <TextAreaUI
          value={value}
          onChange={setValue}
          label="Description"
          placeholder="Enter a detailed description..."
        />
      );
    },
    code: `const [value, setValue] = useState("");

<TextAreaUI
  value={value}
  onChange={setValue}
  label="Description"
  placeholder="Enter a detailed description..."
/>`,
    variations: [
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Project Details"
              placeholder="Describe your project requirements..."
              required
            />
          );
        },
        code: `<TextAreaUI
  value={value}
  onChange={setValue}
  label="Project Details"
  placeholder="Describe your project requirements..."
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("Too short");
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Review"
              placeholder="Write your review..."
              error="Review must be at least 20 characters long"
            />
          );
        },
        code: `<TextAreaUI
  value={value}
  onChange={setValue}
  label="Review"
  placeholder="Write your review..."
  error="Review must be at least 20 characters long"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Feedback"
              placeholder="Share your thoughts..."
              helperText="Your feedback helps us improve our services"
            />
          );
        },
        code: `<TextAreaUI
  value={value}
  onChange={setValue}
  label="Feedback"
  placeholder="Share your thoughts..."
  helperText="Your feedback helps us improve our services"
/>`,
      },
      {
        name: "Custom Rows",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Long Form Content"
              placeholder="Write your content here..."
              numberOfLines={6}
              helperText="More space for longer content"
            />
          );
        },
        code: `<TextAreaUI
  value={value}
  onChange={setValue}
  label="Long Form Content"
  placeholder="Write your content here..."
  numberOfLines={6}
  helperText="More space for longer content"
/>`,
      },
      {
        name: "With Character Limit",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Bio"
              placeholder="Tell us about yourself..."
              maxLength={200}
              helperText={`${value.length}/200 characters`}
            />
          );
        },
        code: `<TextAreaUI
  value={value}
  onChange={setValue}
  label="Bio"
  placeholder="Tell us about yourself..."
  maxLength={200}
  helperText={\`\${value.length}/200 characters\`}
/>`,
      },
      {
        name: "Comment Section",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Add Comment"
              placeholder="What are your thoughts?"
              numberOfLines={3}
              helperText="Be respectful and constructive in your comments"
            />
          );
        },
        code: `<TextAreaUI
  value={value}
  onChange={setValue}
  label="Add Comment"
  placeholder="What are your thoughts?"
  numberOfLines={3}
  helperText="Be respectful and constructive in your comments"
/>`,
      },
      {
        name: "Contact Form",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Message"
              placeholder="How can we help you?"
              required
              numberOfLines={5}
              helperText="Please provide as much detail as possible"
            />
          );
        },
        code: `<TextAreaUI
  value={value}
  onChange={setValue}
  label="Message"
  placeholder="How can we help you?"
  required
  numberOfLines={5}
  helperText="Please provide as much detail as possible"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <TextAreaUI
              value="This content cannot be edited. It has been locked for review and approval by the moderation team."
              onChange={() => {}}
              label="Moderated Content"
              placeholder="Cannot edit"
              disabled
              numberOfLines={3}
              helperText="Content is under review"
            />
          );
        },
        code: `<TextAreaUI
  value="This content cannot be edited..."
  onChange={() => {}}
  label="Moderated Content"
  placeholder="Cannot edit"
  disabled
  numberOfLines={3}
  helperText="Content is under review"
/>`,
      },
      {
        name: "Pre-filled Content",
        component: () => {
          const [value, setValue] = useState(
            "This is some initial content that can be edited and expanded upon by the user.",
          );
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Edit Content"
              placeholder="Edit the content..."
              numberOfLines={4}
            />
          );
        },
        code: `const [value, setValue] = useState("This is some initial content...");

<TextAreaUI
  value={value}
  onChange={setValue}
  label="Edit Content"
  placeholder="Edit the content..."
  numberOfLines={4}
/>`,
      },
      {
        name: "Note Taking",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <TextAreaUI
              value={value}
              onChange={setValue}
              label="Notes"
              placeholder="Jot down your thoughts..."
              numberOfLines={8}
              helperText="Your notes are automatically saved"
            />
          );
        },
        code: `<TextAreaUI
  value={value}
  onChange={setValue}
  label="Notes"
  placeholder="Jot down your thoughts..."
  numberOfLines={8}
  helperText="Your notes are automatically saved"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `TextAreaUI is designed for multi-line text input where users need to enter longer content
such as descriptions, comments, reviews, or messages. It extends TextFieldUI with multiline support
and includes a subject icon to indicate text content entry. Perfect for forms requiring detailed text input.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use for text that typically exceeds one line",
    "Set appropriate numberOfLines for the expected content length",
    "Consider character limits for social media or review content",
    "Provide clear placeholder text showing expected content type",
    "Use helper text to guide users on content expectations",
    "Include character count feedback for limited fields",
    "Validate content length on both client and server",
    "Consider auto-save functionality for important content",
    "Provide clear error messages for validation failures",
    "Make resize behavior intuitive on different platforms",
  ],
};

export const meta = {
  id: "textarea-ui",
  name: "TextAreaUI",
  icon: "📝",
  description: "Multi-line text input component for longer text content",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
