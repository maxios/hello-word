import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const ProgressIcon = (props: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      d="m13.833 9.817 3.534-6.109 1.441.834-4.358 7.541-5.425-3.125-3.975 6.875h13.783V17.5H2.167v-15h1.666v12.117l4.584-7.95 5.416 3.15Z"
    />
  </Svg>
);
