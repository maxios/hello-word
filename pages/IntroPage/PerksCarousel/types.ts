export interface Perk {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface PerksCarouselItemProps {
  item: Perk;
  index: number;
}
