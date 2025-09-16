import * as React from 'react';
import Svg, {SvgProps, Path, G, Rect, Defs, ClipPath} from 'react-native-svg';

export const HouseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#prefix__clip0)">
      <Path
        fill="#fff"
        fillOpacity={0.92}
        d="M10.5 20V14H14.5V20H19.5V12H22.5L12.5 3L2.5 12H5.5V20H10.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="prefix__clip0">
        <Rect width={24} height={24} fill="#fff" transform="translate(0.5)" />
      </ClipPath>
    </Defs>
  </Svg>
);
