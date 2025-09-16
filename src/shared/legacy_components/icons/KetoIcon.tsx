import Svg, {SvgProps, Path} from 'react-native-svg';

export const KetoIcon = (props: SvgProps) => (
  <Svg width={25} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="m14.768 18-4.214-5.3V18H7.5V6h3.054v5.265L14.732 6h3.59l-4.858 5.88L18.5 18h-3.732Z"
    />
  </Svg>
);
