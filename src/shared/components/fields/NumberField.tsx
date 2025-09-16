import { TrendingUpIcon } from "../icons/TrendingUpIcon";
import { TextField } from "./TextField";
import { TextFieldProps } from "./types";

export function NumberField<T extends Record<string, any>>(
  props: TextFieldProps<T>,
) {
  return (
    <TextField<T>
      {...props}
      keyboardType="numeric"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      leftIcon={<TrendingUpIcon size={20} className="text-muted-foreground" />}
    />
  );
}
