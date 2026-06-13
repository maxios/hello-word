const content = {
  heading: 'Settings',
  subtext: 'Theme · tokens · typography. The three things you need open when styling a new screen.',

  themePreferenceTitle: 'Theme preference',
  activeSchemeLabel: 'Active scheme:',

  systemOption: 'System',
  lightOption: 'Light',
  darkOption: 'Dark',

  colorTokensTitle: 'Color tokens',
  colorTokensDescription: 'Defined in src/shared/constants/Colors.ts, consumed via NativeWind classes like bg-brand-mid.',
  colorTokensFileRef: 'src/shared/constants/Colors.ts',
  colorTokensClassRef: 'bg-brand-mid',

  typographyTitle: 'Typography scale',
  typographyDescription: 'Defined in tailwind.config.ts under theme.extend.fontSize.',
  typographyFileRef: 'tailwind.config.ts',
  typographyPathRef: 'theme.extend.fontSize',
} as const satisfies Record<string, string>;

export default content;
