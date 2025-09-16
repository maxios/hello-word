import Svg, {SvgProps, Path} from 'react-native-svg';

export const CalendarPlusIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M13 13H16V15H13V18H11V15H8V13H11V10H13V13ZM21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5ZM5 5V7H19V5H5ZM19 19V9H5V19H19Z"
      fill="white"
      fill-opacity="0.92"
    />
  </Svg>
);
