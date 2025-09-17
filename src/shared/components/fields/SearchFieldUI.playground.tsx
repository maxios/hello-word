/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { SearchFieldUI } from "./SearchFieldUI";

export const components: PlaygroundComponent[] = [
  {
    id: "search-field-ui-basic",
    name: "Basic SearchFieldUI",
    description:
      "Search input field with magnifying glass icon and clear functionality",
    component: () => {
      const [value, setValue] = useState("");
      return (
        <SearchFieldUI
          value={value}
          onChange={setValue}
          placeholder="Search..."
        />
      );
    },
    code: `const [value, setValue] = useState("");

<SearchFieldUI
  value={value}
  onChange={setValue}
  placeholder="Search..."
/>`,
    variations: [
      {
        name: "With Label",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              label="Search Products"
              placeholder="Find products by name or category"
            />
          );
        },
        code: `<SearchFieldUI
  value={value}
  onChange={setValue}
  label="Search Products"
  placeholder="Find products by name or category"
/>`,
      },
      {
        name: "Required",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              label="Search Query"
              placeholder="Enter search terms"
              required
            />
          );
        },
        code: `<SearchFieldUI
  value={value}
  onChange={setValue}
  label="Search Query"
  placeholder="Enter search terms"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const [value, setValue] = useState("x");
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              label="Search"
              placeholder="Search for items"
              error="Search query must be at least 2 characters"
            />
          );
        },
        code: `<SearchFieldUI
  value={value}
  onChange={setValue}
  label="Search"
  placeholder="Search for items"
  error="Search query must be at least 2 characters"
/>`,
      },
      {
        name: "With Helper Text",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              label="Find Recipes"
              placeholder="Search by ingredient or recipe name"
              helperText="Try searching for 'chicken', 'pasta', or 'dessert'"
            />
          );
        },
        code: `<SearchFieldUI
  value={value}
  onChange={setValue}
  label="Find Recipes"
  placeholder="Search by ingredient or recipe name"
  helperText="Try searching for 'chicken', 'pasta', or 'dessert'"
/>`,
      },
      {
        name: "Global Search",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              placeholder="Search everything..."
              helperText="Search across all content, users, and settings"
            />
          );
        },
        code: `<SearchFieldUI
  value={value}
  onChange={setValue}
  placeholder="Search everything..."
  helperText="Search across all content, users, and settings"
/>`,
      },
      {
        name: "User Search",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              label="Find Users"
              placeholder="Search by name or username"
              helperText="Search for friends, colleagues, or new connections"
            />
          );
        },
        code: `<SearchFieldUI
  value={value}
  onChange={setValue}
  label="Find Users"
  placeholder="Search by name or username"
  helperText="Search for friends, colleagues, or new connections"
/>`,
      },
      {
        name: "With Clear Callback",
        component: () => {
          const [value, setValue] = useState("current search");
          const handleClear = () => {
            console.log("Search cleared");
          };
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              label="Search with Events"
              placeholder="Enter search terms"
              onClear={handleClear}
              helperText="Clear button triggers additional actions"
            />
          );
        },
        code: `const handleClear = () => {
  console.log("Search cleared");
};

<SearchFieldUI
  value={value}
  onChange={setValue}
  label="Search with Events"
  placeholder="Enter search terms"
  onClear={handleClear}
  helperText="Clear button triggers additional actions"
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          return (
            <SearchFieldUI
              value=""
              onChange={() => {}}
              label="Search Disabled"
              placeholder="Search is currently unavailable"
              disabled
              helperText="Search functionality is temporarily disabled"
            />
          );
        },
        code: `<SearchFieldUI
  value=""
  onChange={() => {}}
  label="Search Disabled"
  placeholder="Search is currently unavailable"
  disabled
  helperText="Search functionality is temporarily disabled"
/>`,
      },
      {
        name: "Active Search",
        component: () => {
          const [value, setValue] = useState("chocolate chip cookies");
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              label="Recipe Search"
              placeholder="Search for recipes"
              helperText="Currently searching for dessert recipes"
            />
          );
        },
        code: `const [value, setValue] = useState("chocolate chip cookies");

<SearchFieldUI
  value={value}
  onChange={setValue}
  label="Recipe Search"
  placeholder="Search for recipes"
  helperText="Currently searching for dessert recipes"
/>`,
      },
      {
        name: "Filter Search",
        component: () => {
          const [value, setValue] = useState("");
          return (
            <SearchFieldUI
              value={value}
              onChange={setValue}
              label="Filter Results"
              placeholder="Type to filter current results"
              helperText="Refine the list by typing keywords"
            />
          );
        },
        code: `<SearchFieldUI
  value={value}
  onChange={setValue}
  label="Filter Results"
  placeholder="Type to filter current results"
  helperText="Refine the list by typing keywords"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `SearchFieldUI is optimized for search interactions with a magnifying glass icon and automatic
clear button when text is entered. It uses search-specific keyboard settings and includes proper
placeholder text to guide users. Perfect for any search functionality throughout your application.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use clear, descriptive placeholder text that shows what can be searched",
    "Implement debounced search to avoid excessive API calls",
    "Provide helpful suggestions or recent searches when empty",
    "Show search results or filtering in real-time when possible",
    "Include clear button for easy query clearing",
    "Use appropriate labels to indicate search scope",
    "Provide search tips in helper text for complex searches",
    "Implement search history for returning users",
    "Consider autocomplete for common search terms",
    "Handle empty search states gracefully with helpful messaging",
  ],
};

export const meta = {
  id: "search-field-ui",
  name: "SearchFieldUI",
  icon: "🔍",
  description:
    "Specialized search input with clear functionality and search optimization",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
