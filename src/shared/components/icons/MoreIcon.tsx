import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface MoreIconProps extends SvgProps {
  fillOpacity?: number;
}

export const MoreIcon = (props: MoreIconProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={props.fillOpacity || 0.72}
      d="M16 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-6 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-6 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
    />
  </Svg>
);
