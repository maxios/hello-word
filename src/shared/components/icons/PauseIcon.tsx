import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const PauseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path fill="#fff" fillOpacity={0.92} d="M14 19h4V5h-4M6 19h4V5H6v14Z" />
  </Svg>
);
