/**
 * Local mock backend for the Compose feature.
 *
 * The public Countries GraphQL API is read-only, so mutations in this starter
 * target an in-process mock that behaves like a real endpoint: async latency,
 * occasional validation failure, unique IDs, timestamps.
 *
 * Swap `composeMock.createItem` for a real graphql-request mutation call when
 * you point `EXPO_PUBLIC_GRAPHQL_URL` at your own Yoga server.
 */

import type { ComposedItem } from "../schemas/compose.types";

let idCounter = 1;

const nextId = () => `mock-${Date.now()}-${idCounter++}`;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface ComposeCreateInput {
  name: string;
  description: string;
  contactEmail: string;
  category: string;
  priority: string;
  dueDate: string | null;
  isPublic: boolean;
}

export interface ComposeServiceError {
  field: string;
  message: string;
}

export interface ComposeCreateResult {
  success: boolean;
  data?: ComposedItem;
  errors?: ComposeServiceError[];
}

export const composeMock = {
  /**
   * Async "email availability" check — demonstrates field-level async validation.
   * Returns false for emails containing "taken".
   */
  async isEmailAvailable(email: string): Promise<boolean> {
    await delay(350);
    return !email.toLowerCase().includes("taken");
  },

  /**
   * Create an item. Simulates:
   *   - ~600ms latency
   *   - Deterministic server-side validation: names shorter than 3 chars fail
   *   - Random transient server error ~10% of the time
   */
  async createItem(input: ComposeCreateInput): Promise<ComposeCreateResult> {
    await delay(600);

    if (input.name.length < 3) {
      return {
        success: false,
        errors: [
          { field: "name", message: "Name must be at least 3 characters." },
        ],
      };
    }

    if (Math.random() < 0.1) {
      return {
        success: false,
        errors: [
          {
            field: "general",
            message: "Simulated server error. Try again.",
          },
        ],
      };
    }

    return {
      success: true,
      data: {
        id: nextId(),
        name: input.name,
        description: input.description,
        contactEmail: input.contactEmail,
        category: input.category,
        priority: input.priority as ComposedItem["priority"],
        dueDate: input.dueDate,
        isPublic: input.isPublic,
        createdAt: new Date().toISOString(),
      },
    };
  },
};
