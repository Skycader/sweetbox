import { ItemModelInterface } from '../models/item.model';

export const energy: ItemModelInterface[] = [
  {
    title: 'Батарейка',
    image: 'assets/images/energy/battery.png',
    type: 'common',
    sound: 'energy.m4a',
  },
  {
    title: 'Большой заряд',
    type: 'rare',
    image: 'assets/images/energy/batteries.png',
    sound: 'special.m4a',
  },
  {
    title: 'Мега заряд',
    type: 'legendary',
    image: 'assets/images/energy/many-batteries.png',
    sound: 'legendary.m4a',
  },
];
