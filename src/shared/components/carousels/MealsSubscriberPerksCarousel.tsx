import {CarouselSection} from './CarouselSection';
import mealSubscriberPerk1 from '../../assets/images/unsubscribeScroll/meal1.png';
import mealSubscriberPerk2 from '../../assets/images/unsubscribeScroll/meal2.png';
import mealSubscriberPerk3 from '../../assets/images/unsubscribeScroll/meal3.png';
import {ExploreSubscriptionButton} from './exploreSubscriptionButton';
import {CarouselItemData} from './CarouselSection/CarouselItem';

const mealSubscriberPerks: CarouselItemData[] = [
  {
    image: mealSubscriberPerk1,
    title: '200+ recipes, updated monthly',
    description:
      'Tried and tested by Lisa and Romane, designed to optimize your nutrition alongside your training.',
  },
  {
    image: mealSubscriberPerk2,
    title: 'Powerful filtering',
    description:
      'Effortlessly find recipes which match your taste and the protein, carb, fat or calories you need.',
  },
  {
    image: mealSubscriberPerk3,
    title: 'Personalized macros',
    description:
      'Get your daily macro split and recommended intake based on your biology and training goals.',
  },
];

export const MealsSubscriberPerksCarousel = ({
  header,
  hasExploreSubscriptionCTA,
}: {
  header: React.ReactNode;
  hasExploreSubscriptionCTA?: boolean;
}) => {
  return (
    <CarouselSection
      header={header}
      items={mealSubscriberPerks}
      button={
        hasExploreSubscriptionCTA ? ExploreSubscriptionButton() : undefined
      }
    />
  );
};
