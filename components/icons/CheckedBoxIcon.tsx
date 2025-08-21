import Svg, {SvgProps, Path} from 'react-native-svg';

export const CheckedBoxIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M9.75 17.25L4.75 12.25L6.16 10.83L9.75 14.42L17.34 6.83L18.75 8.25M18.75 3.25H4.75C3.64 3.25 2.75 4.14 2.75 5.25V19.25C2.75 19.7804 2.96071 20.2891 3.33579 20.6642C3.71086 21.0393 4.21957 21.25 4.75 21.25H18.75C19.2804 21.25 19.7891 21.0393 20.1642 20.6642C20.5393 20.2891 20.75 19.7804 20.75 19.25V5.25C20.75 4.14 19.85 3.25 18.75 3.25Z"
      fill={props.color || 'white'}
      fill-opacity={props.color ? '1' : '0.92'}
    />
  </Svg>
);
