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

export const commonContainer = [
  ...[money[0]].repeat(149), //10 рублей
  ...[money[1]].repeat(15), //100 рублей
  ...[money[2]].repeat(1), //500 рублей
  ...[energy[0]].repeat(149), //10 минут
  ...[energy[1]].repeat(15), //30 минут
  ...[energy[2]].repeat(1), //1 час
  ...products,
  ...[keys[0]], //Редкий ключ
];
