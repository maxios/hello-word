import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const TimerIcon = (props: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      fill="#13265A"
      d="m16.358 6.159 1.184-1.184A12.03 12.03 0 0 0 16.367 3.8L15.183 5A7.386 7.386 0 0 0 10.5 3.333a7.5 7.5 0 0 0 0 15c4.167 0 7.5-3.358 7.5-7.5a7.469 7.469 0 0 0-1.642-4.675Zm-5.025 5.508H9.667V5.834h1.666v5.833ZM13 .833H8V2.5h5V.833Z"
    />
  </Svg>
);
