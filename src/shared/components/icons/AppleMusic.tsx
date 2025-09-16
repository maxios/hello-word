import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const AppleMusicIcon = (props: any) => (
  <Svg
    width={props.size}
    height={props.size}
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <Path
      fill="#f50057"
      d="M42 37a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5h26a5 5 0 0 1 5 5v26z"
    />
    <Path
      fill="#fff"
      d="M19.775 14.821a1 1 0 0 0-.775.975V29a1 1 0 0 1-1 1h-1c-2.209 0-4 1.343-4 3s1.791 3 4 3 4-1.343 4-3V21.334c0-.466.321-.87.775-.974l7.306-1.686a.75.75 0 0 1 .919.73V26a1 1 0 0 1-1 1h-1c-2.209 0-4 1.343-4 3s1.791 3 4 3 4-1.343 4-3V13.257a1 1 0 0 0-1.225-.974l-11 2.538z"
    />
  </Svg>
);
