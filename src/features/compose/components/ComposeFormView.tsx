/**
 * Pure UI for the Compose screen. Composes every field in the library into a
 * single working form with:
 *   - valibot schema validation wired through react-hook-form
 *   - async email-availability check
 *   - server-error → field-error mapping
 *   - submitted item list with remove action
 */

import { Button } from "@/components/Button";
import {
  CheckboxField,
  DateField,
  EmailField,
  RadioField,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
} from "@/components/fields";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type {
  ComposeFieldError,
  ComposeFormValues,
  ComposedItem,
} from "../schemas/compose.types";

export interface ComposeFormViewProps {
  items: ComposedItem[];
  isSubmitting: boolean;
  onSubmit: (values: ComposeFormValues) => Promise<ComposeFieldError[] | null>;
  onCheckEmail: (email: string) => Promise<boolean>;
  onRemoveItem: (id: string) => void;
}

const categories = [
  { label: "General", value: "general" },
  { label: "Bug report", value: "bug" },
  { label: "Feature request", value: "feature" },
  { label: "Feedback", value: "feedback" },
];

const priorities = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

const defaultValues: ComposeFormValues = {
  name: "",
  description: "",
  contactEmail: "",
  category: "general",
  priority: "medium",
  dueDate: null,
  isPublic: false,
  acceptTerms: false,
};

export const ComposeFormView = ({
  items,
  isSubmitting,
  onSubmit,
  onCheckEmail,
  onRemoveItem,
}: ComposeFormViewProps) => {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ComposeFormValues>({
    defaultValues,
    mode: "onBlur",
  });
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const onValid = async (values: ComposeFormValues) => {
    setGeneralError(null);
    clearErrors();
    if (!values.acceptTerms) {
      setError("acceptTerms", {
        type: "required",
        message: "You must accept the terms.",
      });
      return;
    }
    // Async field-level validation: email availability.
    setIsCheckingEmail(true);
    const emailAvailable = await onCheckEmail(values.contactEmail);
    setIsCheckingEmail(false);
    if (!emailAvailable) {
      setError("contactEmail", {
        type: "async",
        message: "That email address is already in use.",
      });
      return;
    }
    const serverErrors = await onSubmit(values);
    if (!serverErrors) {
      reset(defaultValues);
      return;
    }
    for (const err of serverErrors) {
      if (err.field === "general") {
        setGeneralError(err.message);
      } else {
        setError(err.field, { type: "server", message: err.message });
      }
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingHorizontal: 16,
        paddingBottom: insets.bottom + 120,
        gap: 16,
      }}
    >
      <View className="gap-1">
        <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
          Compose
        </Text>
        <Text className="text-body-small text-medium-emphasis">
          Every field component, composed. Submits to a local mock with
          optimistic updates + server-error mapping.
        </Text>
      </View>

      <View className="gap-4 rounded-xl border border-surface-16 bg-surface-4 p-4">
        <TextField
          control={control}
          name="name"
          label="Name"
          placeholder="Short, descriptive title"
          required
          error={errors.name}
        />
        <TextAreaField
          control={control}
          name="description"
          label="Description"
          placeholder="What's this about?"
          error={errors.description}
        />
        <EmailField
          control={control}
          name="contactEmail"
          label="Contact email"
          error={errors.contactEmail}
          helperText={
            isCheckingEmail
              ? "Checking availability…"
              : "Try an email containing 'taken' to trigger async validation."
          }
        />
        <SelectField
          control={control}
          name="category"
          label="Category"
          options={categories}
          error={errors.category}
        />
        <RadioField
          control={control}
          name="priority"
          label="Priority"
          options={priorities}
          direction="horizontal"
          error={errors.priority}
        />
        <DateField
          control={control}
          name="dueDate"
          label="Due date"
          error={errors.dueDate}
        />
        <SwitchField
          control={control}
          name="isPublic"
          label="Make it public"
          error={errors.isPublic}
        />
        <CheckboxField
          control={control}
          name="acceptTerms"
          label="I accept the flota demo terms"
          required
          error={errors.acceptTerms}
        />

        {generalError ? (
          <Text className="text-body-small text-error-default">
            {generalError}
          </Text>
        ) : null}

        <Button
          variant="primary"
          label={isSubmitting ? "Submitting…" : "Submit"}
          onPress={handleSubmit(onValid)}
          disabled={isSubmitting}
        />
      </View>

      <View className="gap-2">
        <Text className="font-heading text-heading-xs font-bold uppercase text-high-emphasis">
          Submitted items ({items.length})
        </Text>
        {items.length === 0 ? (
          <Text className="text-body-small text-medium-emphasis">
            Nothing here yet. Optimistic items appear instantly; a failed server
            call rolls them back.
          </Text>
        ) : (
          items.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center justify-between rounded-xl border border-surface-16 bg-surface-4 p-3"
            >
              <View className="flex-1 gap-1 pr-3">
                <Text className="text-body-small-emphasis text-high-emphasis">
                  {item.name}
                  {item.id.startsWith("temp-") ? (
                    <ActivityIndicator />
                  ) : null}
                </Text>
                <Text className="text-body-x-small text-medium-emphasis">
                  {item.category} · {item.priority}
                  {item.isPublic ? " · public" : ""}
                </Text>
              </View>
              <Pressable
                onPress={() => onRemoveItem(item.id)}
                className="rounded-full bg-surface-8 px-3 py-1"
              >
                <Text className="text-body-x-small text-medium-emphasis">
                  remove
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};
