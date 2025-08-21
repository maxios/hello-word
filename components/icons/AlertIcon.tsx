import Svg, {SvgProps, Path} from 'react-native-svg';

export const AlertIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.92}
      d="M11 11H9V5h2m0 10H9v-2h2M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
    />
  </Svg>
);
