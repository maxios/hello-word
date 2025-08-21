import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const PlusIcon = ({
  color,
  width = 20,
  height = 20,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      fill={color || '#fff'}
      fillOpacity={0.92}
      d="M15.833 11.333h-5v5H9.166v-5h-5V9.666h5v-5h1.667v5h5v1.667Z"
    />
  </Svg>
);
