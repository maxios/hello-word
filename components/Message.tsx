import { Button } from "@/components/Button";
import { ButtonProps } from "@/components/Button/types";
import { UpwardTrendIcon } from "@/components/icons";
import { Text, View } from "react-native";

export const Message = ({
  message,
  icon,
  button,
}: {
  message: string;
  icon: React.ReactNode;
  button?: ButtonProps;
}) => {
  return (
    <View>
      <View className="rounded-tr-4 rounded-br-4 gap-14 border-l-2 border-brand-mid bg-surface-8 px-24 pb-12 pt-16">
        <View className="mt-4">{icon || <UpwardTrendIcon />}</View>
        <View className="flex-1 items-start">
          <Text className="text-medium-emphasis">{message}</Text>
          {!!button && (
            <View className="-ml-8">
              <Button variant="text" {...button} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
