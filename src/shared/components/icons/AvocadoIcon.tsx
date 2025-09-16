import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const AvocadoIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      fillRule="evenodd"
      d="M23.333 19.334c0-5.067-2.642-14-7.333-14-4.69 0-7.333 8.933-7.333 14 0 4.04 3.293 7.333 7.333 7.333s7.333-3.293 7.333-7.333ZM6 19.334c0-5.52 3-16.667 10-16.667s10 11.147 10 16.667c0 5.52-4.48 10-10 10s-10-4.48-10-10Zm10 3.333a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      clipRule="evenodd"
    />
  </Svg>
);
