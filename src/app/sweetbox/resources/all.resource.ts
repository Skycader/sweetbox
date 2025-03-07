import { ItemModelInterface } from '../models/item.model';
import { clothes } from './clothes.resource';
import { coins } from './coins.resource';
import { collectables } from './collectables.resource';
import { energy } from './energy.resource';
import { inGameResource } from './game.resource';
import { keys, multipleKeys } from './keys.resource';
import { legendaryItems } from './legendary.resource';
import { money } from './money.resource';
import { potions } from './potions.resource';
import { products } from './products.resource';
import { quests } from './quests.resource';
import { rareProducts } from './rare-products.resource';

export const resourcesList: ItemModelInterface[] = [
  ...coins,
  ...keys,
  ...multipleKeys,
  ...energy,
  ...money,
  ...products,
  ...clothes,
  ...rareProducts,
  ...collectables,
  ...legendaryItems,
  ...inGameResource,
  ...quests,
  ...potions,
];
