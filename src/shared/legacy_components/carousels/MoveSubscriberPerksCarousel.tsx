import {CarouselSection} from './CarouselSection';
import moveSubscriberPerkImage1 from '../../assets/images/unsubscribeScroll/1.png';
import moveSubscriberPerkImage2 from '../../assets/images/unsubscribeScroll/2.png';
import moveSubscriberPerkImage3 from '../../assets/images/unsubscribeScroll/3.png';
import moveSubscriberPerkImage4 from '../../assets/images/unsubscribeScroll/4.png';
import {CarouselItemData} from './CarouselSection/CarouselItem';
import {ExploreSubscriptionButton} from './exploreSubscriptionButton';

const moveSubscriberPerks: CarouselItemData[] = [
  {
    image: moveSubscriberPerkImage1,
    title: 'Personalized plan',
    description:
      "Choose exercise frequency, gym or home, difficulty level, and your goal: we'll do the planning.",
  },
  {
    image: moveSubscriberPerkImage2,
    title: 'Exercises and workouts',
    description:
      'Browse our full collection of extra content with detailed explanations, for all expertise levels.',
  },
  {
    image: moveSubscriberPerkImage3,
    title: 'Do more with your plan',
    description:
      'You’re not locked into a pre-set routine. Reschedule, repeat, add or swap out workouts as you progress.',
  },
  {
    image: moveSubscriberPerkImage4,
    title: 'Follow along video classes',
    description:
      "You'll unlock an entire library of video classes from our expert trainers in multiple disciplines.",
  },
];

export const MoveSubscriberPerksCarousel = ({
  header,
  hasExploreSubscriptionCTA,
}: {
  header: React.ReactNode;
  hasExploreSubscriptionCTA?: boolean;
}) => {
  return (
    <CarouselSection
      header={header}
      items={moveSubscriberPerks}
      button={
        hasExploreSubscriptionCTA ? ExploreSubscriptionButton() : undefined
      }
    />
  );
};
