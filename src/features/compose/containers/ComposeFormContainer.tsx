import { ComposeFormView } from "../components/ComposeFormView";
import { useComposeActions } from "../hooks/useComposeActions";

export const ComposeFormContainer = () => {
  const { items, submit, checkEmailAvailability, remove, isSubmitting } =
    useComposeActions();

  return (
    <ComposeFormView
      items={items}
      isSubmitting={isSubmitting}
      onSubmit={submit}
      onCheckEmail={checkEmailAvailability}
      onRemoveItem={remove}
    />
  );
};
