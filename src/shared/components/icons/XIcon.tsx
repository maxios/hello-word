import Svg, {SvgProps, Path} from 'react-native-svg';

interface XIconProps extends SvgProps {
  size?: 'sm';
  color?: string;
}

export const XIcon = ({size, color, ...rest}: XIconProps) => {
  if (size === 'sm') {
    return (
      <Svg width={17} height={17} fill="none" {...rest}>
        <Path
          fill={color || '#fff'}
          fillOpacity={!color ? 0.92 : 1}
          d="M13.67 12.866a.498.498 0 1 1-.704.704L8.84 9.442 4.715 13.57a.498.498 0 0 1-.704-.704L8.137 8.74 4.01 4.614a.498.498 0 0 1 .704-.704L8.84 8.037l4.126-4.127a.498.498 0 0 1 .704.704L9.543 8.74l4.127 4.126Z"
        />
      </Svg>
    );
  }

  return (
    <Svg width={24} height={24} fill="none" {...rest}>
      <Path
        fill={color || '#fff'}
        fillOpacity={color ? 1 : 0.92}
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
      />
    </Svg>
  );
};
