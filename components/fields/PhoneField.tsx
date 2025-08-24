import { HouseIcon } from "@/components/icons/HouseIcon";
import { TextField } from "./TextField";
import { TextFieldProps } from "./types";

export function PhoneField<T extends Record<string, any>>(
  props: TextFieldProps<T>,
) {
  return (
    <TextField<T>
      {...props}
      keyboardType="phone-pad"
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="tel"
      returnKeyType="done"
      leftIcon={<HouseIcon className="text-muted-foreground" />}
    />
  );
}
