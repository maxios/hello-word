import { colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export const BackHeader: React.FC<{
  backgroundColor?: string;
  options?: any;
}> = (props) => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerBackTitle: "BACK",
        headerBackTitleVisible: true,
        headerTintColor: "white",
        headerShadowVisible: false,
        title: "",
        headerBackTitleStyle: {
          fontFamily: "Poppins-700",
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: colors.surface[0],
        },
        ...props.options,
      }}
    />
  );
};
