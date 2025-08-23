import promoCardGuidesImage from '@/assets/images/move/Guideebanner.png';
import promoCardExercisesImage from '@/assets/images/move/promo-card-exercises.png';
import promoCardVideoClassesImage from '@/assets/images/move/promo-card-video-classes.png';
import promoCardWorkoutsImage from '@/assets/images/move/promo-card-workouts.png';
// import promoCardGuidesImage from '../../../assets/images/move/BuyGuides.png';
import FinisherCardImage from '@/assets/images/move/Finisherbanner.png';

export const promoCards = [
  {
    heading: 'Guides',
    subtext: 'Take on a multi-week program',
    image: promoCardGuidesImage,
    href: '/move/guides',
  },
  {
    heading: 'Workouts',
    subtext: 'Add extra sessions to your personal plan',
    image: promoCardWorkoutsImage,
    href: '/move/workouts',
  },
  {
    heading: 'Finishers',
    subtext: 'Add a finisher to take your workout to the next level',
    image: FinisherCardImage,
    href: '/move/finishers',
  },
  {
    heading: 'Video Classes',
    subtext: 'Schedule a HIIT, Yoga or Barre series with our superstar coaches',
    image: promoCardVideoClassesImage,
    href: '/move/video-classes',
  },
  {
    heading: 'Exercises',
    subtext:
      'Browse all individual exercises, with guidance on how to best perform them',
    image: promoCardExercisesImage,
    href: '/move/exercises',
  },
];
