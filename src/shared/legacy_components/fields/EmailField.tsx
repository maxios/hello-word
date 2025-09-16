import {Input} from './Input';

export const EmailField = () => {
  return (
    <Input
      name="email"
      label="email"
      placeholder="jane@email.com"
      textContentType="emailAddress"
      keyboardType="email-address"
      autoCapitalize="none"
      required
      rules={{
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Must be a valid email address',
        },
      }}
    />
  );
};
