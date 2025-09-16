import Svg, {SvgProps, Path} from 'react-native-svg';

export interface PlayIconProps extends SvgProps {
  size?: 16 | 24 | 40;
  color?: string;
}

export const PlayIcon = ({size, color}: PlayIconProps) => {
  if (size === 16)
    return (
      <Svg width={16} height={16} fill="none">
        <Path
          fill={color || '#fff'}
          fillOpacity={0.92}
          d="M6.666 11V5l4 3M8 1.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 8 1.334Z"
        />
      </Svg>
    );

  if (size === 24)
    return (
      <Svg width={24} height={24} fill="none">
        <Path
          fill={color || '#fff'}
          fillOpacity={0.92}
          d="M10 16.5v-9l6 4.5M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
        />
      </Svg>
    );

  return (
    <Svg width={40} height={40} fill="none">
      <Path
        fill={color || '#fff'}
        fillOpacity={0.92}
        d="M16 29V11l12 9M20 0a20 20 0 1 0 0 40 20 20 0 0 0 0-40Z"
      />
    </Svg>
  );
};
