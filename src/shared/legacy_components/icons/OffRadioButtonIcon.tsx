import Svg, {SvgProps, G, Path, Defs} from 'react-native-svg';

export const OffRadioButtonIcon = (props: SvgProps) => (
  <Svg width={32} height={34} fill="none" {...props}>
    <G filter="url(#a)">
      <Path
        fill="#fff"
        fillOpacity={0.92}
        d="M16 2.625A11.375 11.375 0 1 0 27.375 14 11.387 11.387 0 0 0 16 2.625Zm0 21A9.625 9.625 0 1 1 25.625 14 9.636 9.636 0 0 1 16 23.625Z"
      />
    </G>
    <Defs />
  </Svg>
);
