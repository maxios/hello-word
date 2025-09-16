import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface LockIconProps extends SvgProps {
  color?: string;
}

export const LockIcon = ({...props}: LockIconProps) => (
  <Svg width={20} height={20} viewBox="0 0 330 330" {...props}>
    <Path
      fill="white"
      d="M65 330h200c8.284 0 15-6.716 15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85S80 38.131 80 85v45H65c-8.284 0-15 6.716-15 15v170c0 8.284 6.716 15 15 15zm142.481-110.644-42.5 42.5c-2.929 2.929-6.768 4.394-10.606 4.394s-7.678-1.465-10.606-4.394l-21.25-21.25c-5.858-5.858-5.858-15.354 0-21.213 5.857-5.858 15.355-5.858 21.213 0l10.644 10.643 31.894-31.893c5.857-5.858 15.355-5.858 21.213 0 5.857 5.859 5.857 15.355-.002 21.213zM110 85c0-30.327 24.673-55 55-55s55 24.673 55 55v45H110V85z"
    />
  </Svg>
);
