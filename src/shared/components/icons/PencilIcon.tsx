import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

export const PencilIcon = (props: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      d="M17.758 5.867c.325-.325.325-.867 0-1.175l-1.95-1.95c-.308-.325-.85-.325-1.175 0L13.1 4.267l3.125 3.125M3 14.375V17.5h3.125l9.217-9.225-3.125-3.125L3 14.375Z"
    />
  </Svg>
);
export default PencilIcon;
