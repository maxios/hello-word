import { CheckIcon, ChevronHorizontal, XIcon } from "@/components/icons";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "@/const/const";
import { colors } from "@/constants/Colors";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Toast from "react-native-root-toast";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  hasSettingsIcon?: boolean;
  delay?: number;
}
interface ToastManagerContextProps {
  showToast: (toast: ToastProps) => void;
}

const ToastManagerContext = createContext<ToastManagerContextProps | undefined>(
  undefined,
);

export const useToastManager = () => {
  const context = useContext(ToastManagerContext);
  if (!context) {
    throw new Error("useToastManager must be used within a ToastProvider");
  }
  return context;
};

const getChevronColor = (type?: string) => {
  switch (type) {
    case "success":
    case "error":
    case "warning":
    case "info":
      return colors.brand.mid;
    default:
      return colors.brand.mid;
  }
};

const getIconColor = (type?: string) => {
  switch (type) {
    case "success":
    case "error":
    case "warning":
    case "info":
      return colors.brand.mid;
    default:
      return colors.brand.mid;
  }
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback((toastProps: ToastProps) => {
    setToast(toastProps);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), toastProps.delay ?? 2500);
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastManagerContext.Provider value={contextValue}>
      {children}
      {toast && (
        <Toast
          visible={isVisible}
          position={
            Platform.OS === "ios" ? DEVICE_HEIGHT / 1.12 : DEVICE_HEIGHT / 1.05
          }
          shadow={false}
          animation
          containerStyle={{
            width: DEVICE_WIDTH,
            paddingHorizontal: 16,
          }}
          hideOnPress
          duration={2000}
          backgroundColor="transparent"
          delay={200}
          opacity={1}
        >
          <View
            className="rounded-8 bg-white p-16"
            style={{ width: DEVICE_WIDTH - 32 }}
          >
            <View className="items-center justify-between gap-12 pb-4">
              <Pressable onPress={() => setIsVisible(false)}>
                <View className="items-center gap-12">
                  {toast.hasSettingsIcon && (
                    <CheckIcon color={getIconColor(toast.type)} size="sm" />
                  )}
                  <View className="w-[88%] pb-2">
                    <Text className="text-body-s-emphasis">
                      {toast.message}
                    </Text>
                  </View>
                </View>
                <XIcon color={colors.surface[20]} size="sm" />
              </Pressable>
            </View>
            <View className="absolute bottom-0 right-4">
              <ChevronHorizontal color={getChevronColor(toast.type)} />
            </View>
          </View>
        </Toast>
      )}
    </ToastManagerContext.Provider>
  );
};
