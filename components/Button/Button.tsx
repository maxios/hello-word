import { colors } from "@/constants/Colors";
import { clsx } from "clsx";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { ButtonProps, ButtonVariant } from "./types";

const variantStyles = {
  primary: "bg-brand-mid",
  secondary: "bg-surface-12",
  outlined: "border border-brand-mid",
  text: "bg-transparent",
  navigation: "bg-surface-12",
  fab: "bg-surface-12 rounded-full",
} as const;

const textStyles = {
  primary: "text-brand-darkest font-ui-default font-bold",
  secondary: "text-high-emphasis font-ui-default font-bold",
  outlined: "text-high-emphasis font-bold",
  text: "text-high-emphasis",
  navigation: "text-high-emphasis",
  fab: "text-high-emphasis",
} as const;

const sizeStyles = {
  small: "px-4 py-2 text-sm",
  medium: "px-6 py-3 text-base",
  large: "px-8 py-4 text-lg",
} as const;

const ButtonContent = ({
  isLoading,
  variant,
  label,
  leftIcon,
  rightIcon,
  children,
}: {
  isLoading: boolean;
  variant: ButtonVariant;
  label?: string;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  if (isLoading) {
    return (
      <ActivityIndicator
        color={
          variant === "outlined" ? colors.brand.mid : colors["high-emphasis"]
        }
      />
    );
  }

  if (children) {
    return children;
  }

  return (
    <>
      {leftIcon && <View className="mr-2">{leftIcon}</View>}
      {label ? (
        <Text
          className={clsx(
            "font-body uppercase tracking-ui",
            textStyles[variant],
          )}
        >
          {label}
        </Text>
      ) : null}
      {rightIcon && <View className="ml-2">{rightIcon}</View>}
    </>
  );
};

export function Button({
  variant = "primary",
  size = "medium",
  children,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled = false,
  className,
  label,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled || isLoading}
      className={clsx(
        // Base styles
        "h-14 flex-row items-center justify-center rounded-full",
        "active:opacity-80",

        // Variant styles
        variantStyles[variant],

        // Size styles
        sizeStyles[size],

        // Disabled state
        (disabled || isLoading) && "opacity-50",

        // Custom classes
        className,
      )}
      {...props}
    >
      <ButtonContent
        isLoading={isLoading}
        variant={variant}
        label={label}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        children={children}
      />
    </Pressable>
  );
}
