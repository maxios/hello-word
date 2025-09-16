import {Stack} from 'expo-router';
import tokens from '../../theme/tokens';
import {bodyFont} from '../../theme/fonts';

export const BackHeader: React.FC<{
  backgroundColor?: keyof typeof tokens.color;
  options?: any;
}> = (props) => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerBackTitle: 'BACK',
        headerBackTitleVisible: true,
        headerTintColor: 'white',
        headerShadowVisible: false,
        title: '',
        headerBackTitleStyle: {
          fontFamily: bodyFont.face[700].normal,
          fontSize: bodyFont.size.uiLink,
        },
        headerStyle: {
          backgroundColor:
            tokens.color[props.backgroundColor || 'surface0'].val,
        },
        ...props.options,
      }}
    />
  );
};
