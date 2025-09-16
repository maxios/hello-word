import Svg, {SvgProps, Path, Circle} from 'react-native-svg';

export const OnRadioButtonIcon = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      d="M14 2.625A11.375 11.375 0 1 0 25.375 14 11.387 11.387 0 0 0 14 2.625Zm0 21A9.625 9.625 0 1 1 23.625 14 9.636 9.636 0 0 1 14 23.625Z"
    />
    <Circle cx={14} cy={14} r={6} fill="#fff" fillOpacity={0.92} />
  </Svg>
);
