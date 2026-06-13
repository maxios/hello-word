const content = {
  heading: 'Flota',
  subtext: 'A generic Expo + Yoga GraphQL starter. Each tab below demonstrates one slice of the stack.',

  stackDemosTitle: 'Stack demos',
  routingDemosTitle: 'Routing demos',

  signInButton: 'Sign in',
  createAccountButton: 'Create an account',

  catalogTitle: 'Catalog',
  catalogStack: 'GraphQL query · codegen · 6-layer feature',
  catalogDescription: 'List + detail against a public GraphQL API. Demonstrates the full UI-as-API stack: schemas, mapper, collection, action hook, pure UI, container.',

  composeTitle: 'Compose',
  composeStack: 'react-hook-form · valibot · GraphQL mutation',
  composeDescription: 'Every field component composed into one form. Submits via a local Yoga mock with optimistic update + server-error-to-field mapping.',

  settingsTitle: 'Settings',
  settingsStack: 'NativeWind · design tokens · dark mode',
  settingsDescription: 'Dark-mode toggle, typography scale, and color-token gallery. Everything you need when theming a new screen.',

  playgroundTitle: 'Playground',
  playgroundStack: 'React Cosmos · component catalog',
  playgroundDescription: 'Browse every component\'s variants, fixture code, and usage guidelines.',

  modalRouteTitle: 'Modal route',
  modalRouteDescription: 'Demonstrates Expo Router\'s modal presentation at /modal.',

  protectedRouteTitle: 'Protected route',
  protectedRouteDescription: 'Gated area requiring a session. Redirects to /auth/login when absent.',

  dynamicRouteTitle: 'Dynamic route',
  dynamicRouteDescription: 'See /catalog/[code] — the detail page rendered from URL params.',
} as const satisfies Record<string, string>;

export default content;
