import { DownloadIcon, HeartIcon, PlusIcon } from "@/components/icons";
import { colors } from "@/constants/Colors";
import { Button } from "./Button";

export const components: PlaygroundComponent[] = [
  // === Primary Button ===
  {
    id: "primary-button",
    name: "Primary Button",
    description: "Main action button with primary styling",
    component: () => (
      <Button variant="primary" size="medium" label="Primary Button" />
    ),
    code: `<Button variant="primary" size="medium">
  Primary Button
</Button>`,
    variations: [
      // === Small Variation ===
      {
        name: "Small Primary",
        component: () => (
          <Button variant="primary" size="small" label="Small" />
        ),
        code: `<Button variant="primary" size="small" label="Small" />`,
      },
      // === Large Variation ===
      {
        name: "Large Primary",
        component: () => (
          <Button variant="primary" size="large" label="Large" />
        ),
        code: `<Button variant="primary" size="large" label="Large" />`,
      },
      // === Icon Variation ===
      {
        name: "Primary with Left Icon",
        component: () => (
          <Button
            variant="primary"
            size="medium"
            leftIcon={<HeartIcon className="h-4 w-4" color="red" />}
            label="With Icon"
          />
        ),
        code: `<Button 
  variant="primary" 
  size="medium" 
  leftIcon={<HeartIcon className="w-4 h-4" />}
>
  With Icon
</Button>`,
      },
      // === Icon Variation ===
      {
        name: "Primary with Right Icon",
        component: () => (
          <Button
            variant="primary"
            size="medium"
            rightIcon={
              <PlusIcon className="h-4 w-4" color={colors.brand.darkest} />
            }
            label="Add Item"
          />
        ),
        code: `<Button 
  variant="primary" 
  size="medium" 
  rightIcon={<PlusIcon className="w-4 h-4" />}
>
  Add Item
</Button>`,
      },
      // === State Variation ===
      {
        name: "Primary Loading",
        component: () => <Button variant="primary" size="medium" isLoading />,
        code: `<Button variant="primary" size="medium" isLoading>
  Loading
</Button>`,
      },
      // === State Variation ===
      {
        name: "Primary Disabled",
        component: () => (
          <Button variant="primary" size="medium" disabled label="Disabled" />
        ),
        code: `<Button variant="primary" size="medium" disabled>
  Disabled
</Button>`,
      },
    ],
  },

  // === Secondary Button ===
  {
    id: "secondary-button",
    name: "Secondary Button",
    description: "Secondary action button with subtle styling",
    component: () => (
      <Button variant="secondary" size="medium" label="Secondary Button" />
    ),
    code: `<Button variant="secondary" size="medium">
  Secondary Button
</Button>`,
    variations: [
      // === Small Variation ===
      {
        name: "Small Secondary",
        component: () => (
          <Button variant="secondary" size="small" label="Small" />
        ),
        code: `<Button variant="secondary" size="small">Small</Button>`,
      },
      // === Large Variation ===
      {
        name: "Large Secondary",
        component: () => (
          <Button variant="secondary" size="large" label="Large" />
        ),
        code: `<Button variant="secondary" size="large">Large Secondary</Button>`,
      },
      // === Icon Variation ===
      {
        name: "Secondary with Icon",
        component: () => (
          <Button
            variant="secondary"
            size="medium"
            leftIcon={<DownloadIcon className="h-4 w-4" />}
            label="Download"
          />
        ),
        code: `<Button 
  variant="secondary" 
  size="medium" 
  leftIcon={<DownloadIcon className="w-4 h-4" />}
>
  Download
</Button>`,
      },
      // === State Variation ===
      {
        name: "Secondary Loading",
        component: () => <Button variant="secondary" size="medium" isLoading />,
        code: `<Button variant="secondary" size="medium" isLoading>
                  Processing
              </Button>`,
      },
      // === State Variation ===
      {
        name: "Secondary Disabled",
        component: () => (
          <Button variant="secondary" size="medium" disabled label="Disabled" />
        ),
        code: `<Button variant="secondary" size="medium" disabled>
                  Disabled
              </Button>`,
      },
    ],
  },

  // === Outlined Button ===
  {
    id: "outlined-button",
    name: "Outlined Button",
    description: "Button with border and transparent background",
    component: () => (
      <Button variant="outlined" size="medium" label="Outlined Button" />
    ),
    code: `<Button variant="outlined" size="medium">
            Outlined Button
          </Button>`,
    variations: [
      // === Small Variation ===
      {
        name: "Small Outlined",
        component: () => (
          <Button variant="outlined" size="small" label="Small" />
        ),
        code: `<Button variant="outlined" size="small">Small</Button>`,
      },
      // === Large Variation ===
      {
        name: "Large Outlined",
        component: () => (
          <Button variant="outlined" size="large" label="Large" />
        ),
        code: `<Button variant="outlined" size="large">Large Outlined</Button>`,
      },
      // === Icon Variation ===
      {
        name: "Outlined with Icon",
        component: () => (
          <Button
            variant="outlined"
            size="medium"
            rightIcon={<PlusIcon className="h-4 w-4" />}
            label="Add New"
          />
        ),
        code: `<Button 
                variant="outlined" 
                size="medium" 
                rightIcon={<PlusIcon className="w-4 h-4" />}
              >
                Add New
              </Button>`,
      },
      // === State Variation ===
      {
        name: "Outlined Loading",
        component: () => <Button variant="outlined" size="medium" isLoading />,
        code: `
<Button variant="outlined" size="medium" isLoading>
  Loading
</Button>`,
      },
      // === State Variation ===
      {
        name: "Outlined Disabled",
        component: () => (
          <Button variant="outlined" size="medium" disabled label="Disabled" />
        ),
        code: `<Button variant="outlined" size="medium" disabled>
  Disabled
</Button>`,
      },
    ],
  },
  {
    id: "text-button",
    name: "Text Button",
    description: "Minimal button with only text styling",
    component: () => (
      <Button variant="text" size="medium" label="Text Button" />
    ),
    code: `<Button variant="text" size="medium">
  Text Button
</Button>`,
    variations: [
      // === Small Variation ===
      {
        name: "Small Text",
        component: () => <Button variant="text" size="small" label="Small" />,
        code: `<Button variant="text" size="small">Small</Button>`,
      },
      // === Large Variation ===
      {
        name: "Large Text",
        component: () => (
          <Button variant="text" size="large" label="Large Text" />
        ),
        code: `<Button variant="text" size="large">Large Text</Button>`,
      },
      // === Icon Variation ===
      {
        name: "Text with Icon",
        component: () => (
          <Button
            variant="text"
            size="medium"
            leftIcon={<HeartIcon className="h-4 w-4" />}
            label="Like"
          />
        ),
        code: `<Button 
  variant="text" 
  size="medium" 
  leftIcon={<HeartIcon className="w-4 h-4" />}
>
  Like
</Button>`,
      },
      // === State Variation ===
      {
        name: "Text Loading",
        component: () => <Button variant="text" size="medium" isLoading />,
        code: `<Button variant="text" size="medium" isLoading>
  Loading
</Button>`,
      },
      // === State Variation ===
      {
        name: "Text Disabled",
        component: () => (
          <Button variant="text" size="medium" disabled label="Disabled" />
        ),
        code: `<Button variant="text" size="medium" disabled>
  Disabled
</Button>`,
      },
    ],
  },
  {
    id: "navigation-button",
    name: "Navigation Button",
    description: "Button styled for navigation contexts",
    component: () => (
      <Button variant="navigation" size="medium" label="Navigation" />
    ),
    code: `<Button variant="navigation" size="medium">
  Navigation
</Button>`,
    variations: [
      // === Small Variation ===
      {
        name: "Small Navigation",
        component: () => (
          <Button variant="navigation" size="small" label="Nav" />
        ),
        code: `<Button variant="navigation" size="small">Nav</Button>`,
      },
      // === Large Variation ===
      {
        name: "Large Navigation",
        component: () => (
          <Button variant="navigation" size="large" label="Large Navigation" />
        ),
        code: `<Button variant="navigation" size="large">Large Navigation</Button>`,
      },
      // === Icon Variation ===
      {
        name: "Navigation with Icon",
        component: () => (
          <Button
            variant="navigation"
            size="medium"
            rightIcon={<PlusIcon className="h-4 w-4" />}
            label="Navigate"
          />
        ),
        code: `<Button 
  variant="navigation" 
  size="medium" 
  rightIcon={<PlusIcon className="w-4 h-4" />}
>
  Navigate
</Button>`,
      },
      // === State Variation ===
      {
        name: "Navigation Loading",
        component: () => (
          <Button variant="navigation" size="medium" isLoading />
        ),
        code: `<Button variant="navigation" size="medium" isLoading>
  Loading
</Button>`,
      },
      // === State Variation ===
      {
        name: "Navigation Disabled",
        component: () => (
          <Button
            variant="navigation"
            size="medium"
            disabled
            label="Disabled"
          />
        ),
        code: `<Button variant="navigation" size="medium" disabled>
  Disabled
</Button>`,
      },
    ],
  },
  {
    id: "fab-button",
    name: "FAB Button",
    description: "Floating Action Button with rounded styling",
    component: () => <Button variant="fab" size="medium" label="FAB" />,
    code: `<Button variant="fab" size="medium">
  FAB
</Button>`,
    variations: [
      // === Small Variation ===
      {
        name: "Small FAB",
        component: () => <Button variant="fab" size="small" label="+" />,
        code: `<Button variant="fab" size="small">+</Button>`,
      },
      // === Large Variation ===
      {
        name: "Large FAB",
        component: () => <Button variant="fab" size="large" label="Create" />,
        code: `<Button variant="fab" size="large">Create</Button>`,
      },
      // === Icon Variation ===
      {
        name: "FAB with Icon",
        component: () => (
          <Button
            variant="fab"
            size="medium"
            leftIcon={<PlusIcon className="h-4 w-4" />}
            label="Add"
          />
        ),
        code: `<Button 
  variant="fab" 
  size="medium" 
  leftIcon={<PlusIcon className="w-4 h-4" />}
>
  Add
</Button>`,
      },
      // === Icon Only Variation ===
      {
        name: "FAB Icon Only",
        component: () => (
          <Button variant="fab" size="medium" className="h-14 w-14">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ),
        code: `<Button variant="fab" size="medium" className="w-14 h-14">
  <PlusIcon className="w-6 h-6" />
</Button>`,
      },
      // === State Variation ===
      {
        name: "FAB Loading",
        component: () => <Button variant="fab" size="medium" isLoading />,
        code: `<Button variant="fab" size="medium" isLoading>
  Create
</Button>`,
      },
      // === State Variation ===
      {
        name: "FAB Disabled",
        component: () => (
          <Button variant="fab" size="medium" disabled label="FAB" />
        ),
        code: `<Button variant="fab" size="medium" disabled>
  FAB
</Button>`,
      },
    ],
  },
];

export const usageGuidelines = {
  title: "📋 Usage Guidelines",
  content: `Use buttons for interactive elements that trigger actions. Primary buttons should be used for main actions, 
while secondary buttons are for supporting actions. Outlined buttons work well for less prominent actions, 
and text buttons are ideal for subtle interactions. FAB buttons are perfect for primary floating actions. 
Consider size based on hierarchy and available space.`,
};

export const bestPractices = {
  title: "✅ Best Practices",
  practices: [
    "Use primary buttons for the most important action on a screen",
    "Limit primary buttons to one per section or screen",
    "Choose button size based on content hierarchy and touch targets",
    "Use loading states to provide feedback during async operations",
    "Ensure sufficient contrast for accessibility",
    "Use consistent button variants throughout your app",
    "Consider icon placement based on reading patterns (LTR/RTL)",
    "FAB buttons should be used sparingly for primary actions",
  ],
};

export const meta = {
  id: "buttons",
  name: "Buttons",
  icon: "🔘",
  description: "Interactive button components with various styles and states",
  componentCount: components.length,
  usageGuidelines,
  bestPractices,
};
