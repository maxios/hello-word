import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const ChevronDownIcon = (props: SvgProps) => {
  return (
    <Svg width={10} height={7} viewBox="0 0 10 7" fill="none" {...props}>
      <Path
        d="M1.175 0.150055L5 3.97506L8.825 0.150055L10 1.33339L5 6.33339L0 1.33339L1.175 0.150055Z"
        fill="white"
        fill-opacity={0.92}
      />
    </Svg>
  );
};
