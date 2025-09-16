import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const UpwardTrendIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6Z"
    />
  </Svg>
);
