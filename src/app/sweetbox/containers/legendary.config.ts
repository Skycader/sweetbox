import { clothes } from '../resources/clothes.resource';
import { collectables } from '../resources/collectables.resource';
import { energy } from '../resources/energy.resource';
import { multipleKeys } from '../resources/keys.resource';
import { legendaryItems } from '../resources/legendary.resource';
import { money } from '../resources/money.resource';

Array.prototype.repeat = function <T>(this: T[], count: number): T[] {
  let output: T[] = this;
  while (--count) {
    output = output.concat(this);
  }
  return output;
};

Array.prototype.getRandomElement = function (): any | undefined {
  if (this.length === 0) {
    return undefined; // Возвращаем undefined, если массив пустой
  }
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
};

export const legendaryContainer = [
  ...[money[7]].repeat(1), //5000 рублей
  ...[energy[5]].repeat(1), //Безлимитная энергия
  ...[multipleKeys[2]], //5 эпических ключей
  ...[...clothes].repeat(5),
  ...[...legendaryItems],
];
