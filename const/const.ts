import { Dimensions } from "react-native";

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const APP_PADDING = 16;

export const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV;