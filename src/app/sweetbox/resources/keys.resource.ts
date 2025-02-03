import { ItemModelInterface } from '../models/item.model';

export const keys: ItemModelInterface[] = [
  {
    title: 'Обычный ключ',
    sound: 'prize.m4a',
    type: 'common',
    image: 'assets/images/keys/common.png',
  },
  {
    title: 'Редкий ключ',
    sound: 'rare.m4a',
    type: 'rare',
    image: 'assets/images/keys/rare.png',
  },
  {
    title: 'Эпический ключ',
    sound: 'legendary.m4a',
    type: 'legendary',
    image: 'assets/images/keys/epic.png',
  },
  {
    title: 'Легендарный ключ',
    sound: 'legendary.m4a',
    type: 'legendary',
    image: 'assets/images/keys/legendary.png',
  },
];

export const multipleKeys: ItemModelInterface[] = [
  {
    title: 'Обычный ключ',
    sound: 'prize.m4a',
    type: 'common',
    image: 'assets/images/keys/common.png',
    amt: 3,
  },
  {
    title: 'Редкий ключ',
    sound: 'rare.m4a',
    type: 'rare',
    image: 'assets/images/keys/rare.png',
    amt: 3,
  },
  {
    title: 'Эпический ключ',
    sound: 'legendary.m4a',
    type: 'legendary',
    image: 'assets/images/keys/epic.png',
    amt: 3,
  },
];
