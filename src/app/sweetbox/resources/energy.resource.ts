import { ItemModelInterface } from '../models/item.model';

export const energy: ItemModelInterface[] = [
  {
    title: 'Батарейка - 10 минут',
    image: 'assets/images/energy/mini.png',
    type: 'common',
    sound: 'energy.m4a',
  },
  {
    title: 'Средний заряд - 1 час',
    type: 'rare',
    image: 'assets/images/energy/medium.png',
    sound: 'rare.m4a',
  },
  {
    title: 'Большой заряд - 6 час',
    type: 'legendary',
    image: 'assets/images/energy/big.png',
    sound: 'rare.m4a',
  },
  {
    title: 'Мега заряд - 12 часов',
    type: 'legendary',
    image: 'assets/images/energy/mega.png',
    sound: 'legendary.m4a',
  },
  {
    title: 'Ядерный заряд - 24 часа',
    type: 'legendary',
    image: 'assets/images/energy/nuclear.png',
    sound: 'legendary.m4a',
  },
  {
    title: 'Ядерная смесь - 30 дней',
    type: 'legendary',
    image: 'assets/images/energy/nuclear2.webp',
    sound: 'legendary.m4a',
  },
];
