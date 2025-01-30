import { Injectable } from '@angular/core';
import { PersistanceService } from '../../common/services/persistance.service';

interface RangInterface {
  title: string;
  icon: string;
  xp: number;
}

class Rang implements RangInterface {
  public icon = '';
  constructor(
    public title: string,
    public rang: number,
    public xp: number,
  ) {
    this.icon = `assets/images/rangs/${rang}.webp`;
  }
}

@Injectable({
  providedIn: 'root',
})
export class RangService {
  private xp = this.persistance.getItem('xp') || 0;

  private rangs: Rang[] = [
    new Rang('Новобранец', 1, 0),
    new Rang('Рядовой', 2, 100),
    new Rang('Ефрейтор', 3, 500),
    new Rang('Капрал', 4, 1500),
    new Rang('Мастер-капрал', 5, 3700),
    new Rang('Сержант', 6, 7100),
    new Rang('Штаб-сержант', 7, 12300),
    new Rang('Мастер-сержант', 8, 20000),
    new Rang('Первый сержант', 9, 41000),
    new Rang('Уорэнт-офицер 1', 10, 57000),
    new Rang('Уорэнт-офицер 2', 11, 76000),
    new Rang('Уорэнт-офицер 3', 12, 98000),
    new Rang('Уорэнт-офицер 4', 13, 125000),
    new Rang('Уорэнт-офицер 5', 14, 156000),
    new Rang('Младший лейтенант', 15, 192000),
    new Rang('Лейтенант', 16, 233000),
    new Rang('Старший лейтенант', 17, 280000),
    new Rang('Капитан', 18, 332000),
    new Rang('Майор', 19, 390000),
    new Rang('Подполковник', 20, 455000),
    new Rang('Полковник', 21, 527000),
    new Rang('Бригадир', 22, 606000),
    new Rang('Генерал-майор', 23, 692000),
    new Rang('Генерал-лейтенант', 24, 787000),
    new Rang('Генерал', 25, 889000),
    new Rang('Маршал', 26, 1000000),
    new Rang('Фельдмаршал', 27, 1122000),
    new Rang('Командор', 28, 1255000),
    new Rang('Генералиссимус', 30, 1400000),
    new Rang('Легенда', 31, 1600000),
    new Rang('Легенда', 32, 1800000),
  ];

  constructor(private persistance: PersistanceService) {
    if (!this.persistance.getItem('xp')) this.persistance.setItem('xp', 0);
  }

  public getRang(): Rang {
    const xp = this.xp || 0;
    return this.rangs.find((rang) => rang.xp >= xp) || this.rangs[0];
  }

  public getNextRangXp(): number {
    const xp = this.xp;
    const index = this.rangs.findIndex((rang) => rang.xp > xp);
    return this.rangs[index + 1].xp;
  }

  public getXp() {
    return this.xp;
  }

  public addXp(xp: number) {
    this.xp += xp;
    this.persistance.setItem('xp', this.xp);
  }
}
