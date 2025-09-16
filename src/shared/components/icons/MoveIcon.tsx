import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const MoveIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      fillOpacity={1}
      d="m27.427 19.813 1.906-1.907-1.906-1.907-4.76 4.76L11.24 9.333 16 4.573l-1.907-1.907-1.906 1.907-1.907-1.907-2.853 2.853L5.52 3.613 3.613 5.519 5.52 7.426l-2.853 2.853 1.906 1.907-1.906 1.907 1.906 1.906 4.76-4.76L20.76 22.666 16 27.426l1.907 1.907 1.906-1.907 1.907 1.907 2.853-2.854 1.907 1.907 1.907-1.907-1.907-1.906 2.853-2.854-1.906-1.906Z"
    />
  </Svg>
);
