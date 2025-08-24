import { AppLayout } from "@/components/AppLayout";
import { PasswordField } from "@/components/fields/PasswordField";
import { useToastManager } from "@/components/Toast";
import { formatErrorMessage } from "@/lib/error";
import { StackActions } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GestureResponderEvent, View } from "react-native";

const ResetPasswordPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: "",
    },
  });
  const params = useLocalSearchParams();
  const router = useRouter();
  const { showToast } = useToastManager();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const isCreatePasswordFlow = !!params?.["create-password-flow"];

  useEffect(() => {
    if (!params || !params.token) {
      showToast({
        message: "Invalid reset token, please try again",
        type: "error",
        hasSettingsIcon: true,
      });
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout
      header={{
        heading: "Create Password",
        subtext: "Create your new password below.",
        variant: "secondary",
      }}
      buttons={[
        {
          label: "Create password",
          size: "medium",
          onPress: async (e: GestureResponderEvent) => {
            try {
              setLoading(true);

              // TODO: Implement reset password

              if (isCreatePasswordFlow) {
                navigation.dispatch(StackActions.popToTop());
                router.replace("/create-password-success");
              } else {
                navigation.dispatch(StackActions.popToTop());
                router.replace("/home");
              }
            } catch (error) {
              showToast({
                message: formatErrorMessage(error),
                type: "error",
                hasSettingsIcon: true,
              });
            } finally {
              setLoading(false);
            }
          },
          isLoading: loading,
        },
      ]}
    >
      <View className="w-full flex-1">
        <View className="w-full gap-8">
          <PasswordField control={control} name="password" />
        </View>
      </View>
    </AppLayout>
  );
};

export default ResetPasswordPage;
