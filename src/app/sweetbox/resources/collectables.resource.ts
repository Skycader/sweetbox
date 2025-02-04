import { ItemModelInterface } from '../models/item.model';

export const collectables: ItemModelInterface[] = [
  {
    title: 'JoJo карточка',
    type: 'rare',
    image: 'assets/images/collectables/jojo-card.png',
    sound: 'rare.m4a',
  },
  {
    title: 'Пачка карточек JoJo',
    type: 'legendary',
    image: 'assets/images/collectables/jojo-cards.png',
    sound: 'legendary.m4a',
  },
  {
    title: 'Печать фото',
    type: 'legendary',
    image: 'assets/images/collectables/print-photo.png',
    sound: 'legendary.m4a',
  },
];
