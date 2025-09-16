import { useForm } from "react-hook-form";
import { RadioField } from "./RadioField";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "prefer_not_to_say" },
];

const experienceOptions = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
  { label: "Expert", value: "expert" },
];

const planOptions = [
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

const notificationOptions = [
  { label: "Immediate", value: "immediate" },
  { label: "Daily Digest", value: "daily" },
  { label: "Weekly Summary", value: "weekly" },
  { label: "Never", value: "never" },
];

export const components: PlaygroundComponent[] = [
  // === Basic RadioField ===
  {
    id: "basic-radiofield",
    name: "Basic RadioField",
    description: "Single selection radio button group",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <RadioField
          control={control}
          name="gender"
          label="Gender"
          options={genderOptions}
        />
      );
    },
    code: `<RadioField
  control={control}
  name="gender"
  label="Gender"
  options={genderOptions}
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
            <RadioField
              control={control}
              name="requiredGender"
              label="Gender"
              options={genderOptions}
              required
            />
          );
        },
        code: `<RadioField
  control={control}
  name="requiredGender"
  label="Gender"
  options={genderOptions}
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
            <RadioField
              control={control}
              name="errorGender"
              label="Gender"
              options={genderOptions}
              error={{
                message: "Please select your gender",
                type: "required",
              }}
            />
          );
        },
        code: `<RadioField
  control={control}
  name="errorGender"
  label="Gender"
  options={genderOptions}
  error={{ message: "Please select your gender" }}
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
            <RadioField
              control={control}
              name="disabledGender"
              label="Gender"
              options={genderOptions}
              disabled
            />
          );
        },
        code: `<RadioField
  control={control}
  name="disabledGender"
  label="Gender"
  options={genderOptions}
  disabled
/>`,
      },
    ],
  },

  // === Horizontal RadioField ===
  {
    id: "radiofield-horizontal",
    name: "Horizontal RadioField",
    description: "Radio buttons arranged horizontally",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <RadioField
          control={control}
          name="experience"
          label="Experience Level"
          options={experienceOptions}
          direction="horizontal"
        />
      );
    },
    code: `<RadioField
  control={control}
  name="experience"
  label="Experience Level"
  options={experienceOptions}
  direction="horizontal"
/>`,
    variations: [
      {
        name: "Plan Selection",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <RadioField
              control={control}
              name="plan"
              label="Choose Your Plan"
              options={planOptions}
              direction="horizontal"
            />
          );
        },
        code: `<RadioField
  control={control}
  name="plan"
  label="Choose Your Plan"
  options={planOptions}
  direction="horizontal"
/>`,
      },
      {
        name: "Notification Preference",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          return (
            <RadioField
              control={control}
              name="notifications"
              label="Notification Frequency"
              options={notificationOptions}
              direction="horizontal"
            />
          );
        },
        code: `<RadioField
  control={control}
  name="notifications"
  label="Notification Frequency"
  options={notificationOptions}
  direction="horizontal"
/>`,
      },
    ],
  },

  // === RadioField with Helper Text ===
  {
    id: "radiofield-helper",
    name: "RadioField with Helper Text",
    description: "Radio buttons with additional guidance",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      return (
        <RadioField
          control={control}
          name="helperExperience"
          label="Experience Level"
          options={experienceOptions}
          helperText="This helps us personalize your experience"
        />
      );
    },
    code: `<RadioField
  control={control}
  name="helperExperience"
  label="Experience Level"
  options={experienceOptions}
  helperText="This helps us personalize your experience"
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
            <RadioField
              control={control}
              name="errorHelperGender"
              label="Gender"
              options={genderOptions}
              error={{
                message: "Gender selection is required",
                type: "required",
              }}
              helperText="This information is used for analytics only"
            />
          );
        },
        code: `<RadioField
  control={control}
  name="errorHelperGender"
  label="Gender"
  options={genderOptions}
  error={{ message: "Gender selection is required" }}
  helperText="This information is used for analytics only"
/>`,
      },
    ],
  },

  // === RadioField with Disabled Options ===
  {
    id: "radiofield-disabled-options",
    name: "RadioField with Disabled Options",
    description: "Radio buttons with some disabled options",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      const optionsWithDisabled = [
        { label: "Free", value: "free" },
        { label: "Pro", value: "pro" },
        { label: "Enterprise", value: "enterprise", disabled: true },
        { label: "Custom", value: "custom", disabled: true },
      ];

      return (
        <RadioField
          control={control}
          name="disabledOptions"
          label="Plan Selection"
          options={optionsWithDisabled}
          helperText="Enterprise and Custom plans require contact"
        />
      );
    },
    code: `const optionsWithDisabled = [
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise", disabled: true },
  { label: "Custom", value: "custom", disabled: true },
];

<RadioField
  control={control}
  name="disabledOptions"
  label="Plan Selection"
  options={optionsWithDisabled}
  helperText="Enterprise and Custom plans require contact"
/>`,
    variations: [
      {
        name: "Feature Selection",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          const featureOptions = [
            { label: "Basic", value: "basic" },
            { label: "Advanced", value: "advanced" },
            { label: "Premium", value: "premium", disabled: true },
          ];

          return (
            <RadioField
              control={control}
              name="features"
              label="Feature Level"
              options={featureOptions}
              helperText="Premium features require upgrade"
            />
          );
        },
        code: `const featureOptions = [
  { label: "Basic", value: "basic" },
  { label: "Advanced", value: "advanced" },
  { label: "Premium", value: "premium", disabled: true },
];

<RadioField
  control={control}
  name="features"
  label="Feature Level"
  options={featureOptions}
  helperText="Premium features require upgrade"
/>`,
      },
    ],
  },

  // === RadioField Preferences ===
  {
    id: "radiofield-preferences",
    name: "RadioField Preferences",
    description: "User preference selections",
    component: () => {
      const {
        control,
        formState: { errors },
      } = useForm();
      const themeOptions = [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "Auto", value: "auto" },
      ];

      return (
        <RadioField
          control={control}
          name="theme"
          label="Theme Preference"
          options={themeOptions}
          direction="horizontal"
        />
      );
    },
    code: `const themeOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Auto", value: "auto" },
];

<RadioField
  control={control}
  name="theme"
  label="Theme Preference"
  options={themeOptions}
  direction="horizontal"
/>`,
    variations: [
      {
        name: "Language Preference",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          const languageOptions = [
            { label: "English", value: "en" },
            { label: "Spanish", value: "es" },
            { label: "French", value: "fr" },
            { label: "German", value: "de" },
          ];

          return (
            <RadioField
              control={control}
              name="language"
              label="Language Preference"
              options={languageOptions}
            />
          );
        },
        code: `const languageOptions = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
];

<RadioField
  control={control}
  name="language"
  label="Language Preference"
  options={languageOptions}
/>`,
      },
      {
        name: "Privacy Level",
        component: () => {
          const {
            control,
            formState: { errors },
          } = useForm();
          const privacyOptions = [
            { label: "Public", value: "public" },
            { label: "Friends Only", value: "friends" },
            { label: "Private", value: "private" },
          ];

          return (
            <RadioField
              control={control}
              name="privacy"
              label="Privacy Level"
              options={privacyOptions}
            />
          );
        },
        code: `const privacyOptions = [
  { label: "Public", value: "public" },
  { label: "Friends Only", value: "friends" },
  { label: "Private", value: "private" },
];

<RadioField
  control={control}
  name="privacy"
  label="Privacy Level"
  options={privacyOptions}
/>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `RadioField is used for single selection from a list of mutually exclusive options. Use it for 
demographic information, preferences, settings, and other single-choice scenarios. Arrange options 
horizontally for 2-4 options, vertically for longer lists. Always provide clear labels and consider using 
helper text for additional context.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use RadioField for single selection from mutually exclusive options",
    "Use horizontal layout for 2-4 options, vertical for longer lists",
    "Provide clear, descriptive option labels",
    "Use disabled options sparingly and explain why they're disabled",
    "Group related options logically",
    "Use helper text to explain the purpose of the selection",
    "Provide clear error messages for required selections",
    "Consider accessibility with proper labeling",
    "Use appropriate labels that indicate the selection's purpose",
    "Make the default selection logical and helpful",
  ],
};

export const meta = {
  id: "radiofield",
  name: "RadioField",
  icon: "🔘",
  description: "Radio button group for single selection",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
