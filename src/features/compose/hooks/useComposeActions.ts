/**
 * Action hook: submits the compose form with optimistic update.
 *
 * The flow:
 *   1. `submit` inserts a temporary item in the collection (optimistic).
 *   2. Calls `composeMock.createItem` (swap for a real mutation).
 *   3. On success: replaces the temp item with the server response.
 *   4. On server validation errors: rolls back the optimistic item and returns
 *      structured errors the UI maps to field-level messages.
 */

import { useCallback, useState } from "react";
import {
  composeCollection,
  useComposedItems,
} from "../collections/composeCollection";
import { mapFormToPayload, mapPayloadToItem } from "../mappers/composeMapper";
import { composeMock } from "../services/composeMock";
import type {
  ComposeFieldError,
  ComposeFormValues,
  ComposedItem,
} from "../schemas/compose.types";

export interface UseComposeActionsResult {
  items: ComposedItem[];
  submit: (values: ComposeFormValues) => Promise<ComposeFieldError[] | null>;
  checkEmailAvailability: (email: string) => Promise<boolean>;
  remove: (id: string) => void;
  isSubmitting: boolean;
}

export const useComposeActions = (): UseComposeActionsResult => {
  const items = useComposedItems();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(
    async (
      values: ComposeFormValues,
    ): Promise<ComposeFieldError[] | null> => {
      setIsSubmitting(true);
      const payload = mapFormToPayload(values);
      const tempId = `temp-${Date.now()}`;
      const optimisticItem: ComposedItem = {
        id: tempId,
        name: payload.name,
        description: payload.description,
        contactEmail: payload.contactEmail,
        category: payload.category,
        priority: values.priority,
        dueDate: payload.dueDate,
        isPublic: payload.isPublic,
        createdAt: new Date().toISOString(),
      };
      composeCollection.insertOptimistic(optimisticItem);

      try {
        const result = await composeMock.createItem(payload);
        if (result.success && result.data) {
          composeCollection.replace(tempId, mapPayloadToItem(result.data));
          return null;
        }

        composeCollection.remove(tempId);
        return (result.errors ?? [
          { field: "general", message: "Unknown server error." },
        ]).map<ComposeFieldError>((e) => ({
          field: e.field as ComposeFieldError["field"],
          message: e.message,
        }));
      } catch (err) {
        composeCollection.remove(tempId);
        return [
          {
            field: "general",
            message:
              err instanceof Error ? err.message : "Unexpected error occurred.",
          },
        ];
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  const checkEmailAvailability = useCallback(
    (email: string) => composeMock.isEmailAvailable(email),
    [],
  );

  const remove = useCallback((id: string) => {
    composeCollection.remove(id);
  }, []);

  return {
    items,
    submit,
    checkEmailAvailability,
    remove,
    isSubmitting,
  };
};
