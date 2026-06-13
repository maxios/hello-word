const content = {
  heading: 'Log in',
  subtext: 'Log in to your Flota account.',
  emailLabel: 'Email',
  emailPlaceholder: 'Email',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Password',
  submitButton: 'Log in',
  forgotPassword: 'Forgot Your Password?',
  noAccount: "Don't have an account?",
  signUpLink: 'Sign up',
} as const satisfies Record<string, string>;

export default content;
