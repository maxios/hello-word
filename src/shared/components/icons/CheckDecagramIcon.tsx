import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

interface CheckDecagramIconProps extends SvgProps {
  size?: 40 | 32 | 24;
}

export const CheckDecagramIcon = (props: CheckDecagramIconProps) => {
  if (props.size === 40) {
    return (
      <Svg width={40} height={40} fill="none" {...props}>
        <Path
          fill="#33C4EB"
          d="m38.334 20-4.067-4.633.567-6.134-6.017-1.366-3.15-5.3L20 5l-5.666-2.433-3.15 5.3-6.017 1.35.567 6.133L1.667 20l4.067 4.633-.567 6.15 6.017 1.367 3.15 5.3L20 35l5.667 2.433 3.15-5.3 6.017-1.366-.567-6.134L38.334 20Zm-21.667 8.333L10 21.667l2.35-2.35 4.317 4.3L27.65 12.633 30 15 16.667 28.333Z"
        />
      </Svg>
    );
  }

  if (props.size === 32) {
    return (
      <Svg width={32} height={32} fill="none" {...props}>
        <Path
          fill="#33C4EB"
          d="m30.666 16-3.253-3.706.453-4.907-4.813-1.093-2.52-4.24L16 4l-4.534-1.946-2.52 4.24-4.813 1.08.453 4.906L1.333 16l3.253 3.707-.453 4.92 4.813 1.093 2.52 4.24L16 28l4.533 1.947 2.52-4.24 4.813-1.093-.453-4.907L30.666 16Zm-17.333 6.667L8 17.334l1.88-1.88 3.453 3.44 8.787-8.787L24 12 13.333 22.667Z"
        />
      </Svg>
    );
  }

  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        fill="#33C4EB"
        d="m23 12-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12Zm-13 5-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8Z"
      />
    </Svg>
  );
};
