import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

export const MyLocationIcon = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M10.5 7A3.499 3.499 0 0 0 7 10.5c0 1.934 1.566 3.5 3.5 3.5s3.5-1.566 3.5-3.5S12.434 7 10.5 7Zm7.823 2.625a7.87 7.87 0 0 0-6.948-6.947V.875h-1.75v1.803a7.87 7.87 0 0 0-6.947 6.947H.875v1.75h1.803a7.87 7.87 0 0 0 6.947 6.948v1.802h1.75v-1.802a7.87 7.87 0 0 0 6.948-6.948h1.802v-1.75h-1.802Zm-7.823 7A6.12 6.12 0 0 1 4.375 10.5 6.12 6.12 0 0 1 10.5 4.375a6.12 6.12 0 0 1 6.125 6.125 6.12 6.12 0 0 1-6.125 6.125Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h21v21H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
