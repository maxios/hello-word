import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const HomeIcon = (props: SvgProps) => (
  <Svg width={33} height={32} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      fillOpacity={1}
      d="M10.083 14.667h2.667v2.667h-2.667v-2.667Zm18.667-8v18.667a2.657 2.657 0 0 1-2.667 2.667H7.417c-1.48 0-2.667-1.2-2.667-2.667V6.667c0-1.466 1.2-2.666 2.667-2.666H8.75V1.334h2.667v2.667h10.666V1.334h2.667v2.667h1.333c1.48 0 2.667 1.2 2.667 2.666ZM7.417 9.334h18.666V6.667H7.417v2.667Zm18.666 16V12.001H7.417v13.333h18.666Zm-5.333-8h2.667v-2.667H20.75v2.667Zm-5.333 0h2.666v-2.667h-2.666v2.667Z"
    />
  </Svg>
);
