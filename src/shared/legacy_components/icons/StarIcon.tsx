import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

export const StarIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M7.993 1.333A6.663 6.663 0 0 0 1.333 8c0 3.68 2.98 6.667 6.66 6.667A6.67 6.67 0 0 0 14.666 8a6.67 6.67 0 0 0-6.673-6.667ZM10.82 12 8 10.3 5.18 12l.746-3.207L3.44 6.64l3.28-.28L8 3.333l1.28 3.02 3.28.28-2.487 2.154L10.82 12Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
