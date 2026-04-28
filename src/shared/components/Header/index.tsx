import { colors } from "@/constants/Colors";
import { clsx } from "clsx";
import { Text, View } from "react-native";

export interface HeaderProps {
  heading: string;
  subtext?: string | React.ReactNode;
  variant?: "primary" | "secondary" | "heading";
  // TODO: Header should't have its own padding
  px?: number;
  pb?: number;
  pt?: number;
}

const variantStyles = {
  primary: "text-heading-xl px-2 bg-white text-surface-0 ",
  secondary: "text-heading-lg bg-surface-8 text-high-emphasis",
  heading: "text-heading-lg text-high-emphasis ",
};

export const Header = ({
  heading,
  subtext,
  variant = "primary",
}: HeaderProps) => {
  const isPrimary = variant === "primary";

  const headingRender = (
    <Text
      className={clsx("self-start font-bold uppercase", variantStyles[variant])}
    >
      {heading}
    </Text>
  );

  const subtextRender =
    typeof subtext === "string" ? (
      <Text className="text-medium-emphasis">{subtext}</Text>
    ) : (
      subtext
    );

  return (
    <View
      className="mt-8 w-full"
      style={{
        backgroundColor: isPrimary ? colors.surface[8] : colors.surface[0],
      }}
    >
      <View className="pb-0">
        <View>
          <View className="flex flex-col gap-2">
            {headingRender}
            {subtextRender}
          </View>
        </View>
      </View>
    </View>
  );
};
