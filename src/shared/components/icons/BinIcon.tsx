import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const BinIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      d="M15.833 3.333h-2.917l-.833-.833H7.916l-.833.833H4.166V5h11.667M5 15.833A1.666 1.666 0 0 0 6.667 17.5h6.666A1.667 1.667 0 0 0 15 15.833v-10H5v10Z"
    />
  </Svg>
);
