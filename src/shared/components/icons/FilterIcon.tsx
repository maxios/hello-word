import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const FilterIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      d="M5 10.8333H15V9.16667H5M2.5 5V6.66667H17.5V5M8.33333 15H11.6667V13.3333H8.33333V15Z"
    />
  </Svg>
);
