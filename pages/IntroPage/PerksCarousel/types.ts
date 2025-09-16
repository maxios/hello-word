export interface Perk {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface PerksCarouselItemProps {
  item: {
    image: any;
    title: string;
    description: string;
  };
  index: number;
}
