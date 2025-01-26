import { energy } from '../resources/energy.resource';
import { keys } from '../resources/keys.resource';
import { money } from '../resources/money.resource';
import { products } from '../resources/products.resource';

Array.prototype.repeat = function <T>(this: T[], count: number): T[] {
  let output: T[] = this;
  while (--count) {
    output = output.concat(this);
  }
  return output;
};

Array.prototype.getRandomElement = function(): any | undefined {
  if (this.length === 0) {
    return undefined; // Возвращаем undefined, если массив пустой
  }
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
};

export const legendaryContainer = [
  ...[money[7]].repeat(1), //5000 рублей
  ...[energy[5]].repeat(1), //Безлимитная энергия
  ...[keys[3]], //Легендарный ключ
];
