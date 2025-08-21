import {createTokens} from 'tamagui';
import {space, size, radius, zIndex} from '@tamagui/themes';

export default createTokens({
  color: {
    surface0: '#141414',
    surface4: '#1d1d1d',
    surface8: '#272727',
    surface12: '#303030',
    surface16: '#3a3a3a',
    surface20: '#434343',
    surface48: '#858585',
    surfaceLight: '#4c4c4c',
    surfaceLightTransparent: 'rgba(76, 76, 76, 0.4)',

    textHighEmphasis: '#FFFFFF',
    textMediumEmphasis: '#b3b3b3',
    textLowEmphasis: '#858585',
    transparent: 'transparent',

    brandLight: '#C3F4FF',
    brandMid: '#33C4EB',
    brandMid20: 'rgba(51,	196, 235, 0.2)',
    brandMid40: 'rgba(51,	196, 235, 0.4)',
    brandDark: '#204098',
    brandDarkest: '#13265A',

    errorLight: '#5CABFF',
    error: '#F25D5D',
    errorDark: '#F8A0A0',
    semanticErrorDark: '#BC2F2F',
    warningLight: '#F7D197',
    warning: '#F2B55A',
    warningDark: '#AE7624',
    successLight: '#B5E8B0',
    success: '#85D97E',
    successDark: '#4B7548',

    imageGradient:
      'linear-gradient(180deg, rgba(20, 20, 20, 0) 0%, #141414 100%);',
    blueGradient:
      'linear-gradient(180deg, rgba(19, 50, 79, 0) 0%, rgba(17, 49, 79, 0.79) 43.09%, #0F304F 100%);',
  },
  space,
  size: {
    ...size,
    inputHeight: 60,
    inputHeightSmall: 48,
  },
  radius,
  zIndex,
});
