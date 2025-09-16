import Svg, {SvgProps, Path} from 'react-native-svg';

interface CheckIconProps extends SvgProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const CheckIcon = ({size = 'lg', color}: CheckIconProps) => {
  if (size === 'sm') {
    return (
      <Svg width={16} height={16} fill="none">
        <Path
          fill={color || '#fff'}
          fillOpacity={!color ? 0.92 : 1}
          d="m14.354 4.854-8 8a.499.499 0 0 1-.707 0l-3.5-3.5a.5.5 0 1 1 .707-.708L6 11.793l7.646-7.647a.5.5 0 0 1 .708.708Z"
        />
      </Svg>
    );
  }

  if (size === 'md') {
    return (
      <Svg width={20} height={20} fill="none">
        <Path
          fill={color || '#fff'}
          fillOpacity={!color ? 0.92 : 1}
          d="m17.083 5.341-10 10L2.5 10.758l1.175-1.175 3.408 3.4 8.825-8.817 1.175 1.175Z"
        />
      </Svg>
    );
  }

  return (
    <Svg width={24} height={24} fill="none">
      <Path
        fill={color || '#fff'}
        d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7Z"
      />
    </Svg>
  );
};
