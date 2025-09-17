import { AppLayout } from "@/components/AppLayout";
import { useToastManager } from "@/components/Toast";
import logEvent from "@/lib/logEvents";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

const defaultValues = {
  email: "",
};

interface ValuesProps {
  email: string;
}

import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";

const ResetPasswordInitPage = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { showToast } = useToastManager();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValuesProps>({
    defaultValues,
  });

  const onSubmit = (data: ValuesProps) => {
    setLoading(true);
    logEvent("user-auth-reset-password-request");

    // TODO: Implement reset password request
  };

  return (
    <AppLayout
      header={{ heading: "Reset password", variant: "secondary" }}
      buttons={[
        {
          label: "Send reset link",
          size: "medium",
          isLoading: loading,
          onPress: handleSubmit(onSubmit),
        },
      ]}
    >
      <View className="w-full flex-1">
        <View className="w-full gap-8">
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="rounded-md border border-border bg-background px-4 py-3 text-base text-foreground"
                editable={!loading}
                returnKeyType="done"
              />
            )}
          />
          {errors.email && (
            <Text className="text-error-default mt-2 text-sm">
              {errors.email.message}
            </Text>
          )}
        </View>
      </View>
    </AppLayout>
  );
};

export default ResetPasswordInitPage;
