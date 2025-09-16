import Svg, {SvgProps, Path} from 'react-native-svg';

interface ChevronRightIconProps extends SvgProps {
  size?: 'sm';
}

export const ChevronRightIcon = (props: ChevronRightIconProps) => {
  if (props.size === 'sm') {
    return (
      <Svg width={20} height={20} fill="none" {...props}>
        <Path
          fill="#13265A"
          d="m6.95 13.609 3.817-3.817L6.95 5.967l1.175-1.175 5 5-5 5-1.175-1.183Z"
        />
      </Svg>
    );
  }
  return (
    <Svg width={24} height={24} fill="none" {...props}>
      <Path
        d="M8.34009 16.33L12.9201 11.75L8.34009 7.16L9.75009 5.75L15.7501 11.75L9.75009 17.75L8.34009 16.33Z"
        fill={props.color || '#fff'}
        fillOpacity={0.92}
      />
    </Svg>
  );
};
