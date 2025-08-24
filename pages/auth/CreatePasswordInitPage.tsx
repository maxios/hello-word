import { AppLayout } from "@/components/AppLayout";
import { EmailField } from "@/components/fields/EmailField";
import { StackActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

interface ValuesProps {
  email: string;
}

const CreatePasswordInitPage: React.FC<{ email: string }> = (props) => {
  const defaultValues = {
    email: props.email,
  } satisfies ValuesProps;
  const { control, handleSubmit } = useForm<ValuesProps>({
    defaultValues,
  });

  const router = useRouter();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: ValuesProps) => {
    setLoading(true);
    // TODO: Implement reset password request

    navigation.dispatch(StackActions.popToTop());
    router.navigate("/auth/reset-password-check-email");
    setLoading(false);
  };

  return (
    <AppLayout
      header={{
        heading: "Please Update your password",
        variant: "secondary",
      }}
      buttons={[
        {
          label: "Send reset link",
          size: "medium",
          isLoading: loading,
          onPress: handleSubmit(onSubmit),
        },
      ]}
    >
      <View className="w-full flex-1 gap-8">
        <View className="w-full gap-2">
          <Text className="text-body-small text-medium-emphasis">
            To access STRNG 2.0, you&apos;ll have to set up a new password and
            go through the onboarding process once more. We know it&apos;s a bit
            of a hassle and we truly apologize. Trust us, it&apos;ll be more
            than worth the few extra minutes to upgrade to the new content.
          </Text>
          <Text className="text-body-small text-medium-emphasis">
            Please provide the email for your account and we will send you a
            link to set a new password.
          </Text>
        </View>
        <EmailField control={control} name="email" />
      </View>
    </AppLayout>
  );
};

export default CreatePasswordInitPage;
