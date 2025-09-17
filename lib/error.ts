import { APP_ENV } from '@/const/const';
// import {Sentry} from './sentry';

/**
 * On the GraphQL API when a known error is thrown, it is throw as a
 * GraphQLError. A known error is one that is expected to be thrown, such as a
 * validation error. And therefore we are safe to show the user the
 * `error.message`. When an unknown error is thrown, this util will return a
 * generic error message.
 */
export const formatErrorMessage = (
  error: unknown,
  fallbackMessage = 'Something went wrong, please try again.',
) => {
  if (
    error instanceof Object &&
    'name' in error &&
    'error_type' in error &&
    error.name === 'StytchSDKAPIError'
  ) {
    if (error.error_type === 'unauthorized_credentials') {
      return 'Invalid email or password, please try again.';
    }

    if (error.error_type === 'email_not_found') {
      return 'Email not found, please try again.';
    }

    if ('error_message' in error) {
      return error.error_message as string;
    }
  }

  if (error instanceof Error) {
    // Sentry.captureException(error);

    if (APP_ENV !== 'production') {
      return `Showing full error in '${APP_ENV}' env:\n\n(${
        error.message || fallbackMessage
      })`;
    }

    return fallbackMessage;
  }

  return fallbackMessage;
};
