import {bodyFont} from '@/theme/fonts';
import {Text} from 'tamagui';
import {ChevronLeftIcon} from '../icons';

export const LayoutBackButtonUI = () => {
  return (
    <>
      <ChevronLeftIcon />
      <Text
        style={{
          fontFamily: bodyFont.face[700].normal,
          fontSize: bodyFont.size.uiLink,
          color: 'white',
        }}
      >
        BACK
      </Text>
    </>
  );
};
