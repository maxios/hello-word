/**
 * Dev-time content helpers for separating text from JSX.
 * JSX describes structure; content files describe text.
 */

/** Creates a pluralized string function. */
export const plural = (
  one: string,
  other: string,
  zero?: string,
) =>
  (count: number): string => {
    if (count === 0 && zero !== undefined) return zero;
    if (count === 1) return one.replace('{count}', '1');
    return other.replace('{count}', String(count));
  };

/** Creates a template string function with typed placeholders. */
export const template = <K extends string>(pattern: string) =>
  (values: Record<K, string | number>): string =>
    pattern.replace(
      /\{(\w+)\}/g,
      (_, key) => String(values[key as K] ?? `{${key}}`),
    );
