import { useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeSlashIcon } from "../icons/EyeSlashIcon";
import { LockIcon } from "../icons/LockIcon";
import { TextField } from "./TextField";
import { TextFieldProps } from "./types";

export function PasswordField<T extends Record<string, any>>(
  props: TextFieldProps<T>,
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField<T>
      {...props}
      secureTextEntry={!showPassword}
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="password"
      returnKeyType="done"
      leftIcon={<LockIcon className="text-muted-foreground" />}
      rightIcon={
        showPassword ? (
          <EyeSlashIcon className="text-muted-foreground" />
        ) : (
          <EyeIcon className="text-muted-foreground" />
        )
      }
      onRightIconPress={() => setShowPassword(!showPassword)}
    />
  );
}
