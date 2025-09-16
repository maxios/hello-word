import Svg, {SvgProps, Path} from 'react-native-svg';

interface Props extends SvgProps {
  size?: 'sm' | 'md';
}

export const ChevronLeftIcon = (props: Props) => {
  if (props.size === 'sm') {
    return (
      <Svg width={20} height={20} fill="none" {...props}>
        <Path
          fill="#fff"
          fillOpacity={0.92}
          d="M12.633 13.608 8.817 9.791l3.816-3.825-1.174-1.175-5 5 5 5 1.175-1.183Z"
        />
      </Svg>
    );
  }

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M15.16 16.33L10.58 11.75L15.16 7.16L13.75 5.75L7.75 11.75L13.75 17.75L15.16 16.33Z"
        fill="#fff"
        fillOpacity={0.92}
      />
    </Svg>
  );
};
