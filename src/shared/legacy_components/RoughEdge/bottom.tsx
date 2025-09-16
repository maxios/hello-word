import Svg from 'react-native-svg';
import {DEVICE_WIDTH} from '../../consts/consts';
import {clippings, roughEdgePath, viewBox} from './consts';

export const RoughEdgeBottom = () => {
  return (
    <Svg
      width={DEVICE_WIDTH}
      height={viewBox.height - clippings.bottom}
      viewBox={`0 ${clippings.bottom} ${viewBox.width} ${
        viewBox.height - clippings.bottom
      }`}
      fill="none"
    >
      {roughEdgePath}
    </Svg>
  );
};
