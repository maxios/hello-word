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
import { useTabBarPadding } from "@/hooks/useTabBarPadding";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type {
  ComposeFieldError,
  ComposeFormValues,
  ComposedItem,
} from "../schemas/compose.types";
import content from "../content/composeForm.content";

export interface ComposeFormViewProps {
  items: ComposedItem[];
  isSubmitting: boolean;
  onSubmit: (values: ComposeFormValues) => Promise<ComposeFieldError[] | null>;
  onCheckEmail: (email: string) => Promise<boolean>;
  onRemoveItem: (id: string) => void;
}

const categories = [
  { label: content.categoryGeneral, value: "general" },
  { label: content.categoryBug, value: "bug" },
  { label: content.categoryFeature, value: "feature" },
  { label: content.categoryFeedback, value: "feedback" },
];

const priorities = [
  { label: content.priorityLow, value: "low" },
  { label: content.priorityMedium, value: "medium" },
  { label: content.priorityHigh, value: "high" },
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
  const bottomPadding = useTabBarPadding();
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
        message: content.acceptTermsError,
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
        message: content.emailTakenError,
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
        paddingBottom: bottomPadding,
        gap: 16,
      }}
    >
      <View className="gap-1">
        <Text className="font-heading text-heading-lg font-bold uppercase text-high-emphasis">
          {content.heading}
        </Text>
        <Text className="text-body-small text-medium-emphasis">
          {content.subtext}
        </Text>
      </View>

      <View className="gap-4 rounded-xl border border-surface-16 bg-surface-4 p-4">
        <TextField
          control={control}
          name="name"
          label={content.nameLabel}
          placeholder={content.namePlaceholder}
          required
          error={errors.name}
        />
        <TextAreaField
          control={control}
          name="description"
          label={content.descriptionLabel}
          placeholder={content.descriptionPlaceholder}
          error={errors.description}
        />
        <EmailField
          control={control}
          name="contactEmail"
          label={content.contactEmailLabel}
          error={errors.contactEmail}
          helperText={
            isCheckingEmail
              ? content.emailCheckingHint
              : content.emailHelperHint
          }
        />
        <SelectField
          control={control}
          name="category"
          label={content.categoryLabel}
          options={categories}
          error={errors.category}
        />
        <RadioField
          control={control}
          name="priority"
          label={content.priorityLabel}
          options={priorities}
          direction="horizontal"
          error={errors.priority}
        />
        <DateField
          control={control}
          name="dueDate"
          label={content.dueDateLabel}
          error={errors.dueDate}
        />
        <SwitchField
          control={control}
          name="isPublic"
          label={content.isPublicLabel}
          error={errors.isPublic}
        />
        <CheckboxField
          control={control}
          name="acceptTerms"
          label={content.acceptTermsLabel}
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
          label={isSubmitting ? content.submittingLabel : content.submitLabel}
          onPress={handleSubmit(onValid)}
          disabled={isSubmitting}
        />
      </View>

      <View className="gap-2">
        <Text className="font-heading text-heading-xs font-bold uppercase text-high-emphasis">
          {content.submittedTitle({ count: items.length })}
        </Text>
        {items.length === 0 ? (
          <Text className="text-body-small text-medium-emphasis">
            {content.emptyState}
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
                  {item.isPublic ? content.publicBadge : ""}
                </Text>
              </View>
              <Pressable
                onPress={() => onRemoveItem(item.id)}
                className="rounded-full bg-surface-8 px-3 py-1"
              >
                <Text className="text-body-x-small text-medium-emphasis">
                  {content.removeAction}
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};
