import { ItemModelInterface } from '../models/item.model';
import { clothes } from './clothes.resource';
import { coins } from './coins.resource';
import { collectables } from './collectables.resource';
import { energy } from './energy.resource';
import { keys, multipleKeys } from './keys.resource';
import { money } from './money.resource';
import { partsItems } from './parts.resource';
import { products } from './products.resource';
import { rareProducts } from './rare-products.resource';

export const resourcesList: ItemModelInterface[] = [
  ...coins,
  ...keys,
  ...multipleKeys,
  ...energy,
  ...money,
  ...products,
  ...partsItems,
  ...clothes,
  ...rareProducts,
  ...collectables,
];
