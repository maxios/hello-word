import tokens from './tokens';

const colors = {
  background: tokens.color.surface0,
  textHighEmphasis: tokens.color.textHighEmphasis,
  textMediumEmphasis: tokens.color.textMediumEmphasis,
  textLowEmphasis: tokens.color.textLowEmphasis,
  // backgroundHover: tokens.color.gray2,
  // backgroundPress: tokens.color.gray4,
  // backgroundFocus: tokens.color.gray5,
  backgroundTransparent: tokens.color.transparent,
  borderColor: tokens.color.surface48,
  // borderColorHover: tokens.color.gray6,
  // borderColorPress: tokens.color.gray12,
  // borderColorFocus: tokens.color.brandLight,
  color: tokens.color.textHighEmphasis,
  // colorHover: tokens.color.gray9,
  // colorPress: tokens.color.gray8,
  // colorFocus: tokens.color.gray8,
  // shadowColor: tokens.color.grayA4,
  // shadowColorHover: tokens.color.grayA6,
  // shadowColorPress: tokens.color.grayA8,
  // shadowColorFocus: tokens.color.grayA8,
};

export default {
  dark: colors,
  light: colors,
};
