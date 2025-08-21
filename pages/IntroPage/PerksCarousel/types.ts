export interface Perk {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface PerksCarouselItemProps {
  item: {
    id: number;
    image: any;
    title: string;
    description: string;
  };
  index: number;
}
