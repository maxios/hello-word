import Svg, {SvgProps, Path} from 'react-native-svg';

interface Props extends SvgProps {
  color?: string;
  size?: 20;
}

export const CalendarBlankIcon = ({color, size, ...rest}: Props) => {
  if (size === 20) {
    return (
      <Svg width={20} height={20} fill="none" {...rest}>
        <Path
          fill={color || 'white'}
          fillOpacity={color ? 1 : 0.92}
          d="M5.833 9.167H7.5v1.667H5.833V9.167Zm11.667-5v11.667c0 .925-.742 1.667-1.667 1.667H4.167c-.925 0-1.667-.75-1.667-1.667V4.167c0-.916.75-1.666 1.667-1.666H5V.834h1.667v1.667h6.666V.834H15v1.667h.833c.925 0 1.667.75 1.667 1.666ZM4.167 5.834h11.666V4.167H4.167v1.667Zm11.666 10V7.501H4.167v8.333h11.666Zm-3.333-5h1.667V9.167H12.5v1.667Zm-3.333 0h1.666V9.167H9.167v1.667Z"
        />
      </Svg>
    );
  }

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...rest}>
      <Path
        fill={color || 'white'}
        fillOpacity={color ? 1 : 0.92}
        d="M7 11H9V13H7V11ZM21 5V19C21 20.11 20.11 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5ZM5 7H19V5H5V7ZM19 19V9H5V19H19ZM15 13H17V11H15V13ZM11 13H13V11H11V13Z"
      />
    </Svg>
  );
};
