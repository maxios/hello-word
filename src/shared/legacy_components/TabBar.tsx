import {
  NavigationState,
  TabBar as RNTabBar,
  SceneRendererProps,
} from 'react-native-tab-view';
import {StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {styles} from './Text/styles';
import tokens from '../theme/tokens';

const HEIGHT = 40;
export interface TabBarProps extends SceneRendererProps {
  guideTextStyle?: StyleProp<TextStyle>;
  navigationState: NavigationState<any>;
}
export const TabBar: React.FC<TabBarProps> = ({guideTextStyle, ...props}) => (
  <RNTabBar
    {...props}
    indicatorStyle={{
      backgroundColor: tokens.color.brandMid.val,
      marginBottom: -2,
    }}
    indicatorContainerStyle={{
      borderBottomWidth: 2,
      borderBottomColor: tokens.color.surface12.val,
    }}
    style={{backgroundColor: 'transparent'}}
    tabStyle={{height: HEIGHT}}
    labelStyle={[guideTextStyle, {...styles.uiS}]}
  />
);
