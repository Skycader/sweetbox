import { ItemModelInterface } from '../models/item.model';

export const coins: ItemModelInterface[] = [
  {
    title: '500 танкоинов',
    type: 'legendary',
    image: 'assets/images/legendary/tancoins.png',
    sound: 'legendary.m4a',
  },
  {
    title: 'Горсть кристаллов (100)',
    type: 'common',
    image: 'assets/images/coins/diamonds_mini.webp',
    sound: 'money.m4a',
  },
  {
    title: 'Куча кристаллов (1000)',
    type: 'rare',
    image: 'assets/images/coins/diamonds.webp',
    sound: 'rare.m4a',
  },
  {
    title: 'Горсть рубинов (100)',
    type: 'legendary',
    image: 'assets/images/coins/rubins.webp',
    sound: 'legendary.m4a',
  },
];
