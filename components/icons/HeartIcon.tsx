import Svg, { Path, SvgProps } from "react-native-svg";

export const HeartIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill={props.color || "#fff"}
      fillOpacity={0.92}
      d="m10 17.792-1.208-1.1C4.5 12.8 1.667 10.225 1.667 7.083 1.667 4.508 3.683 2.5 6.25 2.5c1.45 0 2.842.675 3.75 1.733A5.011 5.011 0 0 1 13.75 2.5c2.567 0 4.583 2.008 4.583 4.583 0 3.142-2.833 5.717-7.125 9.609L10 17.792Z"
    />
  </Svg>
);
