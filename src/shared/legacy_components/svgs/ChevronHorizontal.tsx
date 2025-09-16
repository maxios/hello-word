import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';

export const ChevronHorizontal = (props: SvgProps) => (
  <Svg width={141} height={12} fill="none">
    <G opacity="0.8" clip-path="url(#clip0_757_36883)" {...props}>
      <Path
        d="M12.6784 12H0L7.31929 0H20L12.6784 12Z"
        fill={props.color || '#85D97E'}
      />
      <Path
        d="M32.6784 12H20L27.3216 0H40L32.6784 12Z"
        fill={props.color || '#85D97E'}
      />
      <Path
        d="M52.6807 12H40L47.3216 0H60L52.6807 12Z"
        fill={props.color || '#85D97E'}
      />
      <Path
        d="M72.6799 12H60L67.3201 0H80L72.6799 12Z"
        fill={props.color || '#85D97E'}
      />
      <Path
        d="M92.6799 12H80L87.3201 0H100L92.6799 12Z"
        fill={props.color || '#85D97E'}
      />
      <Path
        d="M112.68 12H100L107.32 0H120L112.68 12Z"
        fill={props.color || '#85D97E'}
      />
      <Path
        d="M132.68 12H120L127.32 0H140L132.68 12Z"
        fill={props.color || '#85D97E'}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_757_36883">
        <Rect width="141" height="12" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
