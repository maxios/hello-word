import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from 'react-native-svg';

export const CheckCircleIcon = (props: SvgProps) => (
  <Svg width={80} height={80} fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M73.259 62.223A40 40 0 0 0 80 40 40.042 40.042 0 0 0 40 0a40 40 0 1 0 33.259 62.223Zm-5.117-41.027A33.847 33.847 0 0 1 73.846 40 33.885 33.885 0 0 1 40 73.846a33.846 33.846 0 1 1 28.142-52.65Zm-10.58 11.75L36.023 54.485l-2.177 2.176-2.177-2.176-9.23-9.231 4.353-4.354 7.054 7.058 19.362-19.366 4.354 4.354Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        x2={80}
        y1={40}
        y2={40}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="red" />
        <Stop offset={1} stopColor="blue" />
      </LinearGradient>
    </Defs>
  </Svg>
);
