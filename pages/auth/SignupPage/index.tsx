import { AppLayout } from "@/components/AppLayout";
import { useToastManager } from "@/components/Toast";
import { formatErrorMessage } from "@/lib/error";
import { StackActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Text, View } from "react-native";

import { useForm } from "react-hook-form";

import { CheckboxField } from "@/components/fields/CheckboxField";
import { PasswordField } from "@/components/fields/PasswordField";
import { TextField } from "@/components/fields/TextField";
import { Header } from "@/components/Header";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  terms: false,
  marketing: false,
};

interface ValuesProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
  marketing: boolean;
}

const SignupPage = () => {
  const router = useRouter();
  const { showToast } = useToastManager();
  const [isLoading, setIsLoading] = useState(false);
  const [termsErrorMessage, setTermsErrorMessage] = useState("");
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValuesProps>({
    defaultValues,
  });

  const onSubmit = async (data: ValuesProps) => {
    try {
      setIsLoading(true);
      Keyboard.dismiss();

      if (!data.terms) {
        setTermsErrorMessage("Please agree to T&Cs");
        return;
      }

      // TODO: Implement signup

      navigation.dispatch(StackActions.popToTop());
      router.replace("/(tabs)/home");
      setTermsErrorMessage("");
    } catch (error) {
      showToast({
        message: formatErrorMessage(error),
        type: "error",
        hasSettingsIcon: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout
      buttons={[
        {
          label: "Sign up",
          size: "medium",
          isLoading,
          onPress: handleSubmit(onSubmit),
        },
      ]}
    >
      <View className="w-full flex-1 gap-8">
        {/* Header */}
        <Header
          heading="Sign up"
          subtext="Add your details."
          variant="heading"
          pt={0}
        />

        {/* Form */}
        <View className="w-full gap-4">
          <View className="w-full flex-row gap-4">
            <View className="flex-1">
              <TextField
                control={control}
                name="firstName"
                label="First Name"
                placeholder="First Name"
                returnKeyType="next"
              />
              {errors.firstName && (
                <Text className="text-error-default mt-2 text-sm">
                  {errors.firstName.message}
                </Text>
              )}
            </View>
            <View className="flex-1">
              <TextField
                control={control}
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                returnKeyType="next"
              />
              {errors.lastName && (
                <Text className="text-error-default mt-2 text-sm">
                  {errors.lastName.message}
                </Text>
              )}
            </View>
          </View>

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
            <Text className="text-error-default mt-2 text-sm">
              {errors.email.message}
            </Text>
          )}

          <PasswordField
            control={control}
            name="password"
            label="Password"
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="done"
          />
          {errors.password && (
            <Text className="text-error-default mt-2 text-sm">
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Checkboxes */}
        <View className="w-full gap-4">
          <CheckboxField
            control={control}
            name="terms"
            label="Agree to the Terms & Conditions"
            linkText="Terms & Conditions"
            required
            error={
              errors.terms ||
              (termsErrorMessage
                ? { message: termsErrorMessage, type: "required" }
                : undefined)
            }
            disabled={isLoading}
          />

          <CheckboxField
            control={control}
            name="marketing"
            description="Sign up for product updates, including announcements and news."
            disabled={isLoading}
          />
        </View>
      </View>
    </AppLayout>
  );
};

export default SignupPage;
