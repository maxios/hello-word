import { APP_ENV } from '@/const/const';

/**
 * Formats an error into a user-friendly message.
 * In non-production environments, shows the full error for debugging.
 */
export const formatErrorMessage = (
  error: unknown,
  fallbackMessage = 'Something went wrong, please try again.',
) => {
  if (error instanceof Error) {
    if (APP_ENV !== 'production') {
      return `Showing full error in '${APP_ENV}' env:\n\n(${
        error.message || fallbackMessage
      })`;
    }

    return fallbackMessage;
  }

  return fallbackMessage;
};
