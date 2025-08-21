export interface TextProps {
  color?:
    | 'brandLight'
    | 'brandMid'
    | 'brandDark'
    | 'brandDarkest'
    | 'textHighEmphasis'
    | 'textMediumEmphasis'
    | 'surface0'
    | 'surface8'
    | 'surface12'
    | 'brandDark'
    | 'brandMid'
    | 'textLowEmphasis'
    | 'success'
    | 'error'
    | 'errorDark'
    | 'semanticErrorDark'
    | 'warningDark'
    | 'successDark';
  backgroundColor?:
    | 'textHighEmphasis'
    | 'brandMid'
    | 'brandDark'
    | 'brandLight'
    | 'surface12'
    | 'transparent';
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'bodyL'
    | 'bodyLEmphasis'
    | 'bodyM'
    | 'bodyMEmphasis'
    | 'bodyS'
    | 'bodySLink'
    | 'bodySEmphasis'
    | 'bodyXS'
    | 'uiM'
    | 'uiMLink'
    | 'uiS';
  children: any;
  withWhiteBackground?: boolean;
  withBrandDarkBackground?: boolean;
  withBrandMidBackground?: boolean;
  withBrandLightBackground?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  noWrap?: boolean;
}

export interface WrapperProps {
  color: string;
  noWrap?: boolean;
  backgroundColor?: string;
  children: any;
  hasBackgroundColor?: boolean;
  variant: Exclude<
    TextProps['variant'],
    | 'bodyL'
    | 'bodyLEmphasis'
    | 'bodyM'
    | 'bodyMEmphasis'
    | 'bodyS'
    | 'bodySLink'
    | 'bodySEmphasis'
  >;
}
