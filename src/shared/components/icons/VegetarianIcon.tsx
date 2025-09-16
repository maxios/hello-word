import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const VegetarianIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="m18 6-4.197 12h-3.606L6 6h3.067L12 15.06 14.95 6H18Z"
    />
  </Svg>
);
