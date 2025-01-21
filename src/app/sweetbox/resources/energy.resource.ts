import { ItemModelInterface } from '../models/item.model';

export const energy: ItemModelInterface[] = [
  {
    title: 'Батарейка - 10 минут',
    image: 'assets/images/energy/battery.png',
    type: 'common',
    sound: 'energy.m4a',
  },
  {
    title: 'Большой заряд - 1 час',
    type: 'rare',
    image: 'assets/images/energy/batteries.png',
    sound: 'special.m4a',
  },
  {
    title: 'Мега заряд - 12 часов',
    type: 'legendary',
    image: 'assets/images/energy/many-batteries.png',
    sound: 'legendary.m4a',
  },
];
