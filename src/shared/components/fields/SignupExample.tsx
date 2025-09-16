import { AppLayout } from "@/components/AppLayout";
import { useToastManager } from "@/components/Toast";
import { formatErrorMessage } from "@/lib/error";
import { StackActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, View } from "react-native";
import { CheckboxField, EmailField, PasswordField, TextField } from "./index";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
  marketing: boolean;
}

const defaultValues: SignupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  terms: false,
  marketing: false,
};

export function SignupExample() {
  const router = useRouter();
  const { showToast } = useToastManager();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues,
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      Keyboard.dismiss();

      if (!data.terms) {
        showToast({
          message: "Please agree to T&Cs",
          type: "error",
        });
        return;
      }

      // TODO: Implement signup
      console.log("Signup data:", data);

      navigation.dispatch(StackActions.popToTop());
      router.replace("/plans");
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
      header={{
        heading: "Sign up",
        subtext: "Add your details.",
        variant: "secondary",
      }}
      buttons={[
        {
          label: "Sign up",
          size: "medium",
          isLoading,
          onPress: handleSubmit(onSubmit),
        },
      ]}
    >
      <View className="w-full gap-8">
        {/* Name Fields */}
        <View className="w-full gap-4">
          <TextField
            control={control}
            name="firstName"
            label="First Name"
            placeholder="First Name"
            required
            error={errors.firstName}
            returnKeyType="next"
            disabled={isLoading}
          />

          <TextField
            control={control}
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            required
            error={errors.lastName}
            returnKeyType="next"
            disabled={isLoading}
          />
        </View>

        {/* Email Field */}
        <EmailField
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          required
          error={errors.email}
          returnKeyType="next"
          disabled={isLoading}
        />

        {/* Password Field */}
        <PasswordField
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
          required
          error={errors.password}
          returnKeyType="done"
          disabled={isLoading}
        />

        {/* Checkboxes */}
        <View className="w-full gap-4">
          <CheckboxField
            control={control}
            name="terms"
            description="Agree to the STRNG Terms & Conditions"
            linkText="Terms & Conditions"
            onLinkPress={() => router.push("/settings/terms-and-conditions")}
            required
            error={errors.terms}
            disabled={isLoading}
          />

          <CheckboxField
            control={control}
            name="marketing"
            description="Sign up to STRNG marketing emails, including exclusive offers, news and more."
            disabled={isLoading}
          />
        </View>
      </View>
    </AppLayout>
  );
}
