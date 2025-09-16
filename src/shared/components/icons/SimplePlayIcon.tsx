import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface Props extends SvgProps {
  size?: 24;
}

export const SimplePlayIcon = (props: Props) => {
  if (props.size === 24) {
    return (
      <Svg width={24} height={24} fill="none" {...props}>
        <Path fill="#fff" fillOpacity={0.92} d="M8 5.14v14l11-7-11-7Z" />
      </Svg>
    );
  }

  return (
    <Svg width={48} height={48} fill="none" {...props}>
      <Path fill="#fff" fillOpacity={0.92} d="M16 10.28v28l22-14-22-14Z" />
    </Svg>
  );
};
