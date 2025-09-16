import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const CaretDoubleRightIcon = (props: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      fill="#13265A"
      d="m5.47 6.071 1.176-1.175 5 5-5 5-1.175-1.175 3.816-3.825-3.816-3.825Zm5 0 1.176-1.175 5 5-5 5-1.175-1.175 3.816-3.825-3.816-3.825Z"
    />
  </Svg>
);
