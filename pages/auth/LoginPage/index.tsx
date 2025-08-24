import { StackActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard } from "react-native";

import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/Button";
import { useToastManager } from "@/components/Toast";

const defaultValues = {
  email: "",
  password: "",
};

interface ValuesProps {
  email: string;
  password: string;
}

import { PasswordField } from "@/components/fields/PasswordField";
import { TextField } from "@/components/fields/TextField";
import { Header } from "@/components/Header";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

const LoginPage = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastManager();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValuesProps>({
    defaultValues,
  });

  const onSubmit = async (data: ValuesProps) => {
    try {
      setLoading(true);
      Keyboard.dismiss();

      // TODO: Implement login

      navigation.dispatch(StackActions.popToTop());
      router.replace("/home");
    } catch (error) {
      // TODO: Implement login error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      buttons={[
        {
          label: "Log in",
          size: "medium",
          onPress: () => handleSubmit(onSubmit),
          isLoading: loading,
        },
      ]}
    >
      <View className="w-full flex-1 gap-8">
        {/* Header */}
        <Header
          heading="Log in"
          subtext="Log in to your STRNG account."
          variant="heading"
          pt={0}
        />

        {/* Form */}
        <View className="w-full gap-4">
          <TextField
            control={control}
            name="email"
            label="Email"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />

          {errors.email && (
            <Text className="text-error-DEFAULT mt-2 text-sm">
              {errors.email.message}
            </Text>
          )}

          <PasswordField
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
            label="Password"
            autoCapitalize="none"
            returnKeyType="done"
          />
          {errors.password && (
            <Text className="text-error-DEFAULT mt-2 text-sm">
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Actions */}
        <Button
          variant="text"
          size="medium"
          onPress={() => router.push("/auth/reset-password-init")}
          label="Forgot Your Password?"
        />
      </View>
    </AppLayout>
  );
};

export default LoginPage;
