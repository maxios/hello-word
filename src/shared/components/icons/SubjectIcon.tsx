import Svg, {SvgProps, Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

export const SubjectIcon = (props: SvgProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
    <G id="Subject" clipPath="url(#clip0_1882_71238)">
      <Path
        id="Vector"
        d="M12.25 14.875H3.5V16.625H12.25V14.875ZM17.5 7.875H3.5V9.625H17.5V7.875ZM3.5 13.125H17.5V11.375H3.5V13.125ZM3.5 4.375V6.125H17.5V4.375H3.5Z"
        fill="white"
        fillOpacity="0.92"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1882_71238">
        <Rect width={21} height={21} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
