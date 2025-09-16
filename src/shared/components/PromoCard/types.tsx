import {ImageSourcePropType} from 'react-native';

export interface PromoCardProps {
  heading?: string;
  subtext?: string;
  image?: ImageSourcePropType | string;
  href?: string;
  subHeading?: string;
  isTextHighlighted?: boolean;
  isCardHighlighted?: boolean;
  cardTagText?: string;
  onCardClick?: () => void;
}
