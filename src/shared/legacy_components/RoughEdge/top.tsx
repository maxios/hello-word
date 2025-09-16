import Svg from 'react-native-svg';
import {DEVICE_WIDTH} from '../../consts/consts';
import {clippings, roughEdgePath, viewBox} from './consts';

export const RoughEdgeTop = () => {
  return (
    <Svg
      width={DEVICE_WIDTH}
      height={viewBox.height - clippings.top}
      viewBox={`0 0 ${viewBox.width} ${viewBox.height - clippings.top}`}
      fill="none"
    >
      {roughEdgePath}
    </Svg>
  );
};
