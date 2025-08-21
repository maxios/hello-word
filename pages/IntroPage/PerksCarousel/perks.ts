import perk1Image from '@/assets/images/intro/1.png';
import perk2Image from '@/assets/images/intro/2.png';
import perk3Image from '@/assets/images/intro/3.png';
import { Perk } from './types';

export const perks: Perk[] = [
  {
    id: 1,
    image: perk1Image,
    title: 'Your personalized fitness plan',
    description:
      'The STRNG Fitness app is an all-inclusive customizable health & fitness package with a holistic approach to well-being. We’ll provide your workouts and nutrition plan according to your specific fitness goals to help you become the very best version of yourself.',
  },
  {
    id: 2,
    image: perk2Image,
    title: 'FITNESS AT YOUR FINGERTIPS',
    description:
      'With STRNG you can workout at home or at the gym, select a structured but customizable routine, select your trainer, and add extra classes from our catalogue of Pilates, Yoga, HIIT, Barre and even Muay Thai!',
  },
  {
    id: 3,
    image: perk3Image,
    title: 'STRNGER TOGETHER',
    description:
      'Join our community of over 14.5 million fitness friends who are all working towards a happier & healthier lifestyle. STRNG is a support network like no other; we want you to succeed and we want you to enjoy the journey with us, because we truly believe that when we work together we can achieve incredible results.',
  },
];
