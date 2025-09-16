import {useState} from 'react';
import {Pressable} from 'react-native';
import {EyeIcon, EyeSlashIcon} from '../icons';
import {Input} from './Input';

interface PasswordFieldProps {
  label?: string;
  rules?: any;
  isFocusedOverride?: boolean;
  setIsFocusedOverride?: (isFocused: boolean) => void;
}

export const PasswordField = ({
  label,
  rules,
  isFocusedOverride,
  setIsFocusedOverride,
}: PasswordFieldProps) => {
  const [showingPassword, setShowingPassword] = useState(false);

  return (
    <Input
      name="password"
      secureTextEntry={!showingPassword}
      label={label || 'Password'}
      placeholder="Enter your password"
      textContentType="password"
      required
      rules={{
        required: 'Password is required',
        ...rules,
      }}
      isFocusedOverride={isFocusedOverride}
      setIsFocusedOverride={setIsFocusedOverride}
      iconRight={
        <Pressable onPress={() => setShowingPassword(!showingPassword)}>
          {showingPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </Pressable>
      }
    />
  );
};
