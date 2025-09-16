import { Button } from "@/components/Button";
import { ButtonProps } from "@/components/Button/types";
import { Header, HeaderProps } from "@/components/Header";
import { APP_PADDING } from "@/const/const";
import { colors } from "@/constants/Colors";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface AppLayoutProps {
  header?: HeaderProps;
  children?: React.ReactNode;
  buttons?: ButtonProps[];
  style?: any;
  backgroundColor?: string;
  buttonsBackgroundColor?: string;
  isScrollEnabled?: boolean;
  isScrollable?: boolean;
  isKeyboardAvoidingViewEnabled?: boolean;
  px?: number;
}

export function AppLayout({
  header,
  children,
  buttons,
  isScrollEnabled = false,
  isScrollable = false,
  isKeyboardAvoidingViewEnabled = true,
  px = APP_PADDING,
}: AppLayoutProps) {
  const insets = useSafeAreaInsets();
  const Wrapper = isScrollEnabled ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({
        ios: buttons ? insets.bottom + APP_PADDING * 2 : 0,
        android: 0,
      })}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled={isKeyboardAvoidingViewEnabled}
      style={{
        flex: 1,
        paddingLeft: px,
        paddingRight: px,
        backgroundColor: colors.surface[0],
      }}
    >
      <SafeAreaView className="flex flex-1">
        <Wrapper scrollEnabled={isScrollable} className="flex h-full">
          {!!header && <Header {...header} />}
          {children}
        </Wrapper>

        <View className="flex-1 justify-end">
          {buttons &&
            buttons.map((button) => (
              <Button key={button.label} variant="primary" {...button} />
            ))}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
