import {Stack} from 'expo-router';
import Animated from 'react-native-reanimated';
import {bodyFont} from '../../theme/fonts';

export const TransparentBackHeader: React.FC<{
  animatedHeaderBackgroundStyles?: {backgroundColor: string};
  options?: Record<string, any>;
}> = (props) => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerBackTitle: 'BACK',
        headerTintColor: 'white',
        headerTransparent: true,
        title: '',
        headerBackTitleStyle: {
          fontFamily: bodyFont.face[700].normal,
          fontSize: bodyFont.size.uiLink,
        },
        headerBackground: props.animatedHeaderBackgroundStyles
          ?  
            () => (
              <Animated.View
                style={[{flex: 1}, props.animatedHeaderBackgroundStyles]}
              />
            )
          : undefined,
        ...props.options,
      }}
    />
  );
};
