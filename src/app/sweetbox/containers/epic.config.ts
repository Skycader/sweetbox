import { coins } from '../resources/coins.resource';
import { collectables } from '../resources/collectables.resource';
import { energy } from '../resources/energy.resource';
import { keys, multipleKeys } from '../resources/keys.resource';
import { money } from '../resources/money.resource';

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

export const epicContainer = [
  ...[money[3]].repeat(149), //200 рублей
  ...[money[4]].repeat(30), //500 рублей
  ...[money[5]].repeat(15), //1000 рублей
  ...[money[6]].repeat(5), //2000 рублей
  ...[money[7]].repeat(1), //5000 рублей
  ...[energy[2]].repeat(149), //6 час
  ...[energy[3]].repeat(15), //12 часав
  ...[energy[4]].repeat(1), //24 часов
  ...[coins[0]].repeat(5),
  ...[multipleKeys[1]], //3 редких ключа
  ...[collectables[3]].repeat(50), //Коллекционная карточка JoJo x5
  ...[collectables[1]].repeat(10), //JoJo Pack
  ...[collectables[2]].repeat(10), //Photo print
  ...[keys[2]].repeat(2), //Эпический ключ ключ
  ...[keys[3]], //Легендарный ключ
];
