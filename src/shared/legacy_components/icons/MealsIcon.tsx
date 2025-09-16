import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const MealsIcon = (props: SvgProps) => (
  <Svg width={33} height={32} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      fillOpacity={1}
      d="m29.583 4-16 1.88V8h16v1.333h-16v6.666h16c0 2.414-.76 4.614-2.24 6.6-1.48 1.987-3.4 3.44-5.76 4.4v2.334H10.917v-2.334c-2.347-.96-4.28-2.426-5.76-4.4-1.48-1.973-2.24-4.186-2.24-6.6h4V5.333l22.666-2.667v1.333ZM8.25 6.505v1.493h1.333V6.373l-1.333.133Zm0 2.827v6.666h1.333V9.333H8.25Zm4 6.666V9.333h-1.333v6.666h1.333Zm0-8V6.066l-1.333.12v1.813h1.333Z"
    />
  </Svg>
);
