import { useForm } from "react-hook-form";
import { SelectField } from "./SelectField";

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "Brazil", value: "br" },
];

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Portuguese", value: "pt" },
];

const categoryOptions = [
  { label: "Technology", value: "tech" },
  { label: "Health & Fitness", value: "health" },
  { label: "Education", value: "education" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Business", value: "business" },
  { label: "Lifestyle", value: "lifestyle" },
];

export const components: PlaygroundComponent[] = [
  // === Basic SelectField ===
  {
    id: "basic-selectfield",
    name: "Basic SelectField",
    description: "Single selection dropdown with options",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SelectField
          control={control}
          name="country"
          label="Country"
          options={countryOptions}
          placeholder="Select your country"
        />
      );
    },
    code: `<SelectField
  control={control}
  name="country"
  label="Country"
  options={countryOptions}
  placeholder="Select your country"
/>`,
    variations: [
      {
        name: "Required Selection",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SelectField
              control={control}
              name="requiredCountry"
              label="Country"
              options={countryOptions}
              placeholder="Select your country"
              required
            />
          );
        },
        code: `<SelectField
  control={control}
  name="requiredCountry"
  label="Country"
  options={countryOptions}
  placeholder="Select your country"
  required
/>`,
      },
      {
        name: "With Error",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SelectField
              control={control}
              name="errorCountry"
              label="Country"
              options={countryOptions}
              placeholder="Select your country"
              error={{
                message: "Please select a country",
                type: "required",
              }}
            />
          );
        },
        code: `<SelectField
  control={control}
  name="errorCountry"
  label="Country"
  options={countryOptions}
  placeholder="Select your country"
  error={{ message: "Please select a country" }}
/>`,
      },
      {
        name: "Disabled",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SelectField
              control={control}
              name="disabledCountry"
              label="Country"
              options={countryOptions}
              placeholder="Selection is disabled"
              disabled
            />
          );
        },
        code: `<SelectField
  control={control}
  name="disabledCountry"
  label="Country"
  options={countryOptions}
  placeholder="Selection is disabled"
  disabled
/>`,
      },
    ],
  },

  // === SelectField with Search ===
  {
    id: "selectfield-search",
    name: "SelectField with Search",
    description: "Searchable dropdown for large option lists",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SelectField
          control={control}
          name="searchableCountry"
          label="Country"
          options={countryOptions}
          placeholder="Search and select country"
          searchable
        />
      );
    },
    code: `<SelectField
  control={control}
  name="searchableCountry"
  label="Country"
  options={countryOptions}
  placeholder="Search and select country"
  searchable
/>`,
    variations: [
      {
        name: "Language Selection",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SelectField
              control={control}
              name="language"
              label="Language"
              options={languageOptions}
              placeholder="Select your preferred language"
              searchable
            />
          );
        },
        code: `<SelectField
  control={control}
  name="language"
  label="Language"
  options={languageOptions}
  placeholder="Select your preferred language"
  searchable
/>`,
      },
      {
        name: "Category Selection",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SelectField
              control={control}
              name="category"
              label="Category"
              options={categoryOptions}
              placeholder="Choose a category"
              searchable
            />
          );
        },
        code: `<SelectField
  control={control}
  name="category"
  label="Category"
  options={categoryOptions}
  placeholder="Choose a category"
  searchable
/>`,
      },
    ],
  },

  // === Multi-Select Field ===
  {
    id: "selectfield-multi",
    name: "Multi-Select Field",
    description: "Multiple selection dropdown",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SelectField
          control={control}
          name="multiCategories"
          label="Categories"
          options={categoryOptions}
          placeholder="Select multiple categories"
          multiple
          searchable
        />
      );
    },
    code: `<SelectField
  control={control}
  name="multiCategories"
  label="Categories"
  options={categoryOptions}
  placeholder="Select multiple categories"
  multiple
  searchable
/>`,
    variations: [
      {
        name: "Multiple Languages",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SelectField
              control={control}
              name="multiLanguages"
              label="Languages"
              options={languageOptions}
              placeholder="Select languages you speak"
              multiple
              searchable
            />
          );
        },
        code: `<SelectField
  control={control}
  name="multiLanguages"
  label="Languages"
  options={languageOptions}
  placeholder="Select languages you speak"
  multiple
  searchable
/>`,
      },
      {
        name: "Required Multi-Select",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SelectField
              control={control}
              name="requiredMulti"
              label="Required Categories"
              options={categoryOptions}
              placeholder="Select at least one category"
              multiple
              required
            />
          );
        },
        code: `<SelectField
  control={control}
  name="requiredMulti"
  label="Required Categories"
  options={categoryOptions}
  placeholder="Select at least one category"
  multiple
  required
/>`,
      },
    ],
  },

  // === SelectField with Helper Text ===
  {
    id: "selectfield-helper",
    name: "SelectField with Helper Text",
    description: "Dropdown with additional guidance",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <SelectField
          control={control}
          name="helperCountry"
          label="Country"
          options={countryOptions}
          placeholder="Select your country"
          helperText="This will be used for shipping and billing"
        />
      );
    },
    code: `<SelectField
  control={control}
  name="helperCountry"
  label="Country"
  options={countryOptions}
  placeholder="Select your country"
  helperText="This will be used for shipping and billing"
/>`,
    variations: [
      {
        name: "With Error and Helper",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <SelectField
              control={control}
              name="errorHelperCountry"
              label="Country"
              options={countryOptions}
              placeholder="Select your country"
              error={{
                message: "Country selection is required",
                type: "required",
              }}
              helperText="Please select your country of residence"
            />
          );
        },
        code: `<SelectField
  control={control}
  name="errorHelperCountry"
  label="Country"
  options={countryOptions}
  placeholder="Select your country"
  error={{ message: "Country selection is required" }}
  helperText="Please select your country of residence"
/>`,
      },
    ],
  },

  // === SelectField with Disabled Options ===
  {
    id: "selectfield-disabled-options",
    name: "SelectField with Disabled Options",
    description: "Dropdown with some disabled options",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      const optionsWithDisabled = [
        { label: "United States", value: "us" },
        { label: "United Kingdom", value: "uk" },
        { label: "Canada", value: "ca" },
        { label: "Australia", value: "au", disabled: true },
        { label: "Germany", value: "de" },
        { label: "France", value: "fr", disabled: true },
      ];

      return (
        <SelectField
          control={control}
          name="disabledOptions"
          label="Country"
          options={optionsWithDisabled}
          placeholder="Select your country"
        />
      );
    },
    code: `const optionsWithDisabled = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au", disabled: true },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr", disabled: true },
];

<SelectField
  control={control}
  name="disabledOptions"
  label="Country"
  options={optionsWithDisabled}
  placeholder="Select your country"
/>`,
    variations: [
      {
        name: "Premium Options",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          const premiumOptions = [
            { label: "Basic Plan", value: "basic" },
            { label: "Pro Plan", value: "pro" },
            { label: "Enterprise Plan", value: "enterprise", disabled: true },
            { label: "Custom Plan", value: "custom", disabled: true },
          ];

          return (
            <SelectField
              control={control}
              name="premiumOptions"
              label="Plan"
              options={premiumOptions}
              placeholder="Select a plan"
              helperText="Enterprise and Custom plans require contact"
            />
          );
        },
        code: `const premiumOptions = [
  { label: "Basic Plan", value: "basic" },
  { label: "Pro Plan", value: "pro" },
  { label: "Enterprise Plan", value: "enterprise", disabled: true },
  { label: "Custom Plan", value: "custom", disabled: true },
];

<SelectField
  control={control}
  name="premiumOptions"
  label="Plan"
  options={premiumOptions}
  placeholder="Select a plan"
  helperText="Enterprise and Custom plans require contact"
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `SelectField is used for single or multiple selections from a predefined list of options. Use it for 
country selection, language preferences, categories, and other choice-based inputs. Enable search for large 
option lists and use multiple selection when users can choose more than one option. Always provide clear 
placeholders and consider using helper text for additional context.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use SelectField for choice-based selections from predefined lists",
    "Enable search for lists with more than 5-7 options",
    "Use multiple selection only when users can legitimately choose multiple items",
    "Provide clear, descriptive option labels",
    "Use disabled options sparingly and explain why they're disabled",
    "Group related options logically",
    "Use helper text to explain the purpose of the selection",
    "Provide clear error messages for required selections",
    "Consider accessibility with proper labeling",
    "Use appropriate placeholders that guide user selection",
  ],
};

export const meta = {
  id: "selectfield",
  name: "SelectField",
  icon: "📋",
  description: "Dropdown select with search functionality",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
