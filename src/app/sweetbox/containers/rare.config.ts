import { coins } from '../resources/coins.resource';
import { collectables } from '../resources/collectables.resource';
import { energy } from '../resources/energy.resource';
import { keys, multipleKeys } from '../resources/keys.resource';
import { money } from '../resources/money.resource';
import { products } from '../resources/products.resource';
import { rareProducts } from '../resources/rare-products.resource';

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

export const rareContainer = [
  ...[money[2]].repeat(149), //100 рублей
  ...[money[3]].repeat(30), //200 рублей
  ...[money[4]].repeat(15), //5000 рублей
  ...[money[5]].repeat(5), //1000 рублей
  ...[money[6]].repeat(1), //2000 рублей
  ...[energy[1]].repeat(149), //1 час
  ...[energy[2]].repeat(15), //6 часав
  ...[energy[3]].repeat(1), //12 часов
  ...[...products].repeat(100),
  ...[...rareProducts].repeat(100),
  ...[coins[2]].repeat(15),
  ...[coins[3]].repeat(5),
  ...[collectables[4]].repeat(200), //3 карточеки JoJo в коллекцию
  ...[multipleKeys[0]], //3 обычных ключа
  ...[keys[1]].repeat(2), //Редкий ключ
  ...[keys[2]], //Эпический ключ
];
