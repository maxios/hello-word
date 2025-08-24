import { BackHeader } from "@/components/BackHeader";
import { useToastManager } from "@/components/Toast";
import CreatePasswordInitPage from "@/pages/auth/CreatePasswordInitPage";
import { Redirect, useLocalSearchParams } from "expo-router";

const CreatePassword = () => {
  const params = useLocalSearchParams();
  const { showToast } = useToastManager();
  if (!params || !params.email || typeof params.email !== "string") {
    showToast({
      message: "Something went wrong, please try resetting your password.",
      type: "error",
      hasSettingsIcon: true,
    });
    return <Redirect href="/auth/reset-password-init" />;
  }

  return (
    <>
      <BackHeader />
      <CreatePasswordInitPage email={decodeURIComponent(params.email)} />
    </>
  );
};

export default CreatePassword;
