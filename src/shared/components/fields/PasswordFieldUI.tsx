import { useState } from "react";
import { EyeIcon } from "../icons/EyeIcon";
import { EyeSlashIcon } from "../icons/EyeSlashIcon";
import { LockIcon } from "../icons/LockIcon";
import { TextFieldUI } from "./TextFieldUI";

interface PasswordFieldUIProps {
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

export function PasswordFieldUI(props: PasswordFieldUIProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextFieldUI
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