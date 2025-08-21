import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const CarrotIcon = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      d="m16.333 10-.2 1h-2.3a.5.5 0 0 0 0 1h2.1l-1 5h-2.1a.5.5 0 0 0 0 1h1.9l-.4 2a2 2 0 0 1-4 0l-1-5h1.5a.5.5 0 0 0 0-1h-1.7l-.8-4c0-1.2.93-2.23 2.29-2.71l-1.39-2.01a.997.997 0 0 1 .26-1.39.998.998 0 0 1 1.39.25l.45.66V3a1 1 0 0 1 2 0v2.28l1.5-1.74c.33-.42.97-.47 1.39-.11.42.35.47.98.11 1.41l-2.13 2.51c1.27.5 2.13 1.5 2.13 2.65Z"
    />
  </Svg>
);
