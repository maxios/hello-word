import { useState } from "react";
import { MagnifyingGlassIcon } from "../icons/MagnifyingGlassIcon";
import { XIcon } from "../icons/XIcon";
import { TextField } from "./TextField";
import { TextFieldProps } from "./types";

export function SearchField<T extends Record<string, any>>(
  props: TextFieldProps<T>,
) {
  const [hasValue, setHasValue] = useState(false);

  return (
    <TextField<T>
      {...props}
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
      leftIcon={
        <MagnifyingGlassIcon size={20} className="text-muted-foreground" />
      }
      rightIcon={
        hasValue ? (
          <XIcon size={20} className="text-muted-foreground" />
        ) : undefined
      }
      onRightIconPress={() => {
        // Clear the field
        if (props.control) {
          props.control.setValue(props.name, "");
        }
        setHasValue(false);
      }}
      onChangeText={(text) => {
        setHasValue(text.length > 0);
        // Call the original onChangeText if provided
        if (props.control) {
          props.control.setValue(props.name, text);
        }
      }}
    />
  );
}
