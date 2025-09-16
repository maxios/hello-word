import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import Toast from 'react-native-root-toast';
import {XStack, YStack} from 'tamagui';
import {Platform} from 'react-native';
import {CheckIcon, XIcon} from '../icons';
import {Text} from '../Text';
import tokens from '../../theme/tokens';
import {ChevronHorizontal} from '../svgs';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../consts/consts';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  hasSettingsIcon?: boolean;
  delay?: number;
}
type ColorType =
  | 'success'
  | 'error'
  | 'surface0'
  | 'surface8'
  | 'textHighEmphasis'
  | 'textMediumEmphasis'
  | 'textLowEmphasis'
  | 'brandLight'
  | 'brandMid'
  | 'brandDark'
  | 'brandDarkest'
  | 'errorDark'
  | 'semanticErrorDark'
  | 'warningDark'
  | 'successDark';

interface ToastManagerContextProps {
  showToast: (toast: ToastProps) => void;
}

const ToastManagerContext = createContext<ToastManagerContextProps | undefined>(
  undefined,
);

export const useToastManager = () => {
  const context = useContext(ToastManagerContext);
  if (!context) {
    throw new Error('useToastManager must be used within a ToastProvider');
  }
  return context;
};

const getChevronColor = (type?: string) => {
  switch (type) {
    case 'success':
    case 'error':
    case 'warning':
    case 'info':
      return tokens.color.brandMid.val;
    default:
      return tokens.color.brandMid.val;
  }
};

const getTextColor = (type?: string): ColorType => {
  switch (type) {
    case 'success':
    case 'error':
    case 'warning':
    case 'info':
      return 'surface0'; // Ensure 'surface0' is a valid type in your theme
    default:
      return 'surface0'; // Ensure 'surface0' is a valid type in your theme
  }
};

const getIconColor = (type?: string) => {
  switch (type) {
    case 'success':
    case 'error':
    case 'warning':
    case 'info':
      return tokens.color.brandMid.val;
    default:
      return tokens.color.brandMid.val;
  }
};

export const ToastProvider = ({children}: {children: ReactNode}) => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback((toastProps: ToastProps) => {
    setToast(toastProps);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), toastProps.delay ?? 2500);
  }, []);

  const contextValue = useMemo(() => ({showToast}), [showToast]);

  return (
    <ToastManagerContext.Provider value={contextValue}>
      {children}
      {toast && (
        <Toast
          visible={isVisible}
          position={
            Platform.OS === 'ios' ? DEVICE_HEIGHT / 1.12 : DEVICE_HEIGHT / 1.05
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
          <YStack
            backgroundColor="white"
            width={DEVICE_WIDTH - 32}
            padding={16}
            borderRadius={8}
            position="relative"
          >
            <XStack
              justifyContent="space-between"
              alignItems="center"
              gap={12}
              pb={4}
            >
              <XStack
                gap={12}
                alignItems="center"
                onPress={() => setIsVisible(false)}
              >
                {toast.hasSettingsIcon && (
                  <CheckIcon color={getIconColor(toast.type)} size="sm" />
                )}
                <XStack pb={2} width="88%">
                  <Text
                    variant="bodySEmphasis"
                    color={getTextColor(toast.type)}
                    textAlign="left"
                  >
                    {toast.message}
                  </Text>
                </XStack>
              </XStack>
              <XIcon color={tokens.color.surface20.val} size="sm" />
            </XStack>
            <XStack position="absolute" bottom={0} right={4}>
              <ChevronHorizontal color={getChevronColor(toast.type)} />
            </XStack>
          </YStack>
        </Toast>
      )}
    </ToastManagerContext.Provider>
  );
};
