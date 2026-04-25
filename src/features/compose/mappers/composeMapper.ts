import type { ComposeFormValues, ComposedItem } from "../schemas/compose.types";

/**
 * Form → API payload. Handles date serialisation and string normalisation
 * so the service layer only sees clean JSON.
 */
export const mapFormToPayload = (form: ComposeFormValues) => ({
  name: form.name.trim(),
  description: form.description.trim(),
  contactEmail: form.contactEmail.trim().toLowerCase(),
  category: form.category,
  priority: form.priority,
  dueDate: form.dueDate ? form.dueDate.toISOString() : null,
  isPublic: form.isPublic,
});

/**
 * API → UI: maps a returned record into what the list renders.
 */
export const mapPayloadToItem = (raw: {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  category: string;
  priority: string;
  dueDate: string | null;
  isPublic: boolean;
  createdAt: string;
}): ComposedItem => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  contactEmail: raw.contactEmail,
  category: raw.category,
  priority:
    raw.priority === "low" || raw.priority === "medium" || raw.priority === "high"
      ? (raw.priority as ComposedItem["priority"])
      : "medium",
  dueDate: raw.dueDate,
  isPublic: raw.isPublic,
  createdAt: raw.createdAt,
});
