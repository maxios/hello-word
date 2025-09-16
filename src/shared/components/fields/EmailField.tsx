import { MailIcon } from "../icons/MailIcon";
import { TextField } from "./TextField";
import { TextFieldProps } from "./types";

export function EmailField<T extends Record<string, any>>(
  props: TextFieldProps<T>,
) {
  return (
    <TextField<T>
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
