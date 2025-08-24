import { AppLayout } from "@/components/AppLayout";
import { Message } from "@/components/Message";
import { AlertIcon } from "@/components/icons";
import { openInbox } from "react-native-email-link";

const ResetPasswordCheckEmailPage = () => {
  return (
    <AppLayout
      header={{
        heading: "Check your email",
        subtext:
          "If there is an account associated with the email address you have provided, you will receive an email shortly to reset your password.",
        variant: "secondary",
      }}
      buttons={[
        {
          variant: "primary",
          label: "Open email client",
          size: "medium",
          onPress: () => openInbox(),
        },
      ]}
    >
      <Message
        icon={<AlertIcon />}
        message="Please note that emails can take a few minutes to come through, and can occasionally end up in your spam folder."
      />
    </AppLayout>
  );
};

export default ResetPasswordCheckEmailPage;
