/**
 * UI schemas for the Compose feature.
 */

export type ComposePriority = "low" | "medium" | "high";

export interface ComposeFormValues {
  name: string;
  description: string;
  contactEmail: string;
  category: string;
  priority: ComposePriority;
  dueDate: Date | null;
  isPublic: boolean;
  acceptTerms: boolean;
}

export interface ComposedItem {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  category: string;
  priority: ComposePriority;
  dueDate: string | null;
  isPublic: boolean;
  createdAt: string;
}

export interface ComposeFieldError {
  field: keyof ComposeFormValues | "general";
  message: string;
}
