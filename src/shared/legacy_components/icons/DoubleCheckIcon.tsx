import Svg, {SvgProps, Path} from 'react-native-svg';

interface Props extends SvgProps {
  size?: 'sm' | 'md';
  color?: string;
}

export const DoubleCheckIcon = ({color, size, ...rest}: Props) => {
  if (size === 'sm') {
    return (
      <Svg width={20} height={20} fill="none" {...rest}>
        <Path
          fill="#13265A"
          d="m0 10.692 4.658 4.658 1.175-1.183-4.65-4.65m17.009-5.35-8.817 8.825-3.467-3.475-1.191 1.175 4.658 4.658 10-10m-4.717 0-1.175-1.183-5.291 5.292 1.183 1.175 5.283-5.284Z"
        />
      </Svg>
    );
  }

  return (
    <Svg width={24} height={24} fill="none" {...rest}>
      <Path
        d="M0 12.83L5.59 18.42L7 17L1.42 11.42M21.83 5L11.25 15.59L7.09 11.42L5.66 12.83L11.25 18.42L23.25 6.42M17.59 6.42L16.18 5L9.83 11.35L11.25 12.76L17.59 6.42Z"
        fill={color || 'white'}
        fill-opacity={color ? 0 : '0.92'}
      />
    </Svg>
  );
};
