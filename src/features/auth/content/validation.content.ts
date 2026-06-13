const content = {
  emailRequired: 'Email is required',
  emailInvalid: 'Invalid email address',
  passwordRequired: 'Password is required',
  passwordMinLength: 'Password must be at least 8 characters',
  firstNameRequired: 'First name is required',
  firstNameMinLength: 'First name must be at least 2 characters',
  lastNameRequired: 'Last name is required',
  lastNameMinLength: 'Last name must be at least 2 characters',
  acceptTermsRequired: 'You must accept the terms and conditions',
} as const satisfies Record<string, string>;

export default content;
