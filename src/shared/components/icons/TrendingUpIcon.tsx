import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

export const TrendingUpIcon = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        fillOpacity={0.92}
        d="m14 5.25 2.004 2.004-4.27 4.27-3.5-3.5-6.484 6.492 1.234 1.234 5.25-5.25 3.5 3.5 5.512-5.504L19.25 10.5V5.25H14Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h21v21H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
