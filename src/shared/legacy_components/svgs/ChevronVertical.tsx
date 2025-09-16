import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

export const ChevronVertical = (props: SvgProps) => (
  <Svg width={12} height={160} fill="none" {...props}>
    <G fill={props.color || '#33C4EB'} clipPath="url(#a)">
      <Path d="M0 12.678V0l12 7.32V20L0 12.678ZM0 32.678V20l12 7.322V40L0 32.678ZM0 52.68V40l12 7.322V60L0 52.68ZM0 72.68V60l12 7.32V80L0 72.68ZM0 92.68V80l12 7.32V100L0 92.68ZM0 112.68V100l12 7.32V120l-12-7.32ZM0 132.68V120l12 7.32V140l-12-7.32ZM0 152.68V140l12 7.32V160l-12-7.32Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M12 0v160H0V0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
