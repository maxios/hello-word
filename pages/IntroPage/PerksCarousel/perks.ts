import perk1Image from '@/assets/images/intro/1.png';
import perk2Image from '@/assets/images/intro/2.png';
import perk3Image from '@/assets/images/intro/3.png';
import { Perk } from './types';

export const perks: Perk[] = [
  {
    id: 1,
    image: perk1Image,
    title: 'Every stack piece, demonstrated',
    description:
      'Flota is a generic Expo starter that doubles as a living reference. Every tab, component, and doc exists to show how to use one part of the stack — Expo Router, NativeWind, GraphQL + codegen, React Cosmos, and the UI-as-API pattern.',
  },
  {
    id: 2,
    image: perk2Image,
    title: 'UI-as-API micro-products',
    description:
      'Features ship in six layers: schemas, mapper, collection, action hook, pure UI, and container. The catalog tab is the canonical end-to-end example you can copy when starting your own feature.',
  },
  {
    id: 3,
    image: perk3Image,
    title: 'DEP documentation, validated',
    description:
      'Every doc under docs/dep/ carries structured frontmatter tied to .docspec. Run the DEP skills to scaffold, sync, or validate — no more stale wikis, no more parallel doc trees.',
  },
];
