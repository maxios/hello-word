import { SubjectIcon } from "../icons/SubjectIcon";
import { TextField } from "./TextField";
import { TextFieldProps } from "./types";

export function TextAreaField<T extends Record<string, any>>(
  props: TextFieldProps<T>,
) {
  return (
    <TextField<T>
      {...props}
      multiline={true}
      numberOfLines={4}
      autoCapitalize="sentences"
      autoCorrect={true}
      returnKeyType="default"
      leftIcon={<SubjectIcon size={20} className="text-muted-foreground" />}
    />
  );
}
