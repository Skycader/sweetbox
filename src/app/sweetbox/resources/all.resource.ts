import { ItemModelInterface } from '../models/item.model';
import { coins } from './coins.resource';
import { energy } from './energy.resource';
import { keys } from './keys.resource';
import { money } from './money.resource';
import { partsItems } from './parts.resource';
import { products } from './products.resource';

export const resourcesList: ItemModelInterface[] = [
  ...coins,
  ...keys,
  ...energy,
  ...money,
  ...products,
  ...partsItems,
];
