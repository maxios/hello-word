import Svg, {SvgProps, Path} from 'react-native-svg';

interface Props extends SvgProps {
  size?: 'sm' | 'md';
  color?: string;
}

export const BarbellIcon = ({size, color, ...rest}: Props) => {
  if (size === 'sm') {
    return (
      <Svg width={20} height={20} fill="none" {...rest}>
        <Path
          d="m17.142 12.383 1.191-1.191L17.142 10l-2.975 2.975-7.142-7.142L10 2.858 8.808 1.666 7.617 2.859 6.425 1.666 4.642 3.45 3.45 2.258 2.258 3.45 3.45 4.64 1.667 6.425l1.191 1.192-1.191 1.191L2.858 10l2.975-2.975 7.142 7.141L10 17.142l1.192 1.191 1.191-1.191 1.192 1.191 1.783-1.783 1.192 1.191 1.192-1.191-1.192-1.192 1.783-1.783-1.191-1.192Z"
          fill={color || 'white'}
        />
      </Svg>
    );
  }
  return (
    <Svg width={24} height={24} fill="none" {...rest}>
      <Path
        d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z"
        fill={color || 'white'}
        fill-opacity={color ? 0 : '0.92'}
      />
    </Svg>
  );
};
