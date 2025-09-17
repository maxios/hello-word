import { MailIcon } from "../icons/MailIcon";
import { TextFieldUI } from "./TextFieldUI";

interface EmailFieldUIProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
}

export function EmailFieldUI(props: EmailFieldUIProps) {
  return (
    <TextFieldUI
      {...props}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="email"
      returnKeyType="next"
      leftIcon={<MailIcon size={20} className="text-muted-foreground" />}
    />
  );
}