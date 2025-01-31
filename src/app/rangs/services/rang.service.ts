import { Injectable } from '@angular/core';
import { PersistanceService } from '../../common/services/persistance.service';
import { MatDialog } from '@angular/material/dialog';
import { RangListComponent } from '../components/rang-list/rang-list.component';
import { NewRangComponent } from '../components/new-rang/new-rang.component';

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
    this.icon = `assets/images/rangs/${rang > 31 ? 31 : rang}.webp`;
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
    new Rang('Первый сержант', 9, 29000),
    new Rang('Сержант-майор', 10, 41000),
    new Rang('Уорэнт-офицер 1', 11, 57000),
    new Rang('Уорэнт-офицер 2', 12, 76000),
    new Rang('Уорэнт-офицер 3', 13, 98000),
    new Rang('Уорэнт-офицер 4', 14, 125000),
    new Rang('Уорэнт-офицер 5', 15, 156000),
    new Rang('Младший лейтенант', 16, 192000),
    new Rang('Лейтенант', 17, 233000),
    new Rang('Старший лейтенант', 18, 280000),
    new Rang('Капитан', 19, 332000),
    new Rang('Майор', 20, 390000),
    new Rang('Подполковник', 21, 455000),
    new Rang('Полковник', 22, 527000),
    new Rang('Бригадир', 23, 606000),
    new Rang('Генерал-майор', 24, 692000),
    new Rang('Генерал-лейтенант', 25, 787000),
    new Rang('Генерал', 26, 889000),
    new Rang('Маршал', 27, 1000000),
    new Rang('Фельдмаршал', 28, 1122000),
    new Rang('Командор', 29, 1255000),
    new Rang('Генералиссимус', 30, 1400000),
    new Rang('Легенда', 31, 1600000),
  ];

  constructor(
    private persistance: PersistanceService,
    private dialog: MatDialog,
  ) {
    if (!this.persistance.getItem('xp')) this.persistance.setItem('xp', 0);

    for (let i = 1; i <= 69; i++) {
      this.rangs.push(
        new Rang('Легенда ' + (i + 1) + ' ранга', 31 + i, 1600000 + 200000 * i),
      );
    }
  }

  getRangs() {
    return this.rangs;
  }

  congratsOnNewRang() {
    this.dialog.open(NewRangComponent, {
      autoFocus: false,
      height: '750px',
      width: '500px',
    });
  }

  showRangs() {
    this.dialog.open(RangListComponent, {
      autoFocus: false,
      height: '900px',
      width: '90vw',
    });
  }

  public getRang(): Rang {
    const xp = this.xp || 0;
    return (
      this.rangs[this.rangs.findIndex((rang) => rang.xp >= xp) - 1] ||
      this.rangs[0]
    );
  }

  public getNextRangXp(): number {
    const xp = this.xp;
    const index = this.rangs.findIndex((rang) => rang.xp > xp);
    return this.rangs[index].xp;
  }

  public getXp() {
    return this.xp;
  }

  public addXp(xp: number) {
    this.xp += xp;
    this.persistance.setItem('xp', this.xp);
  }
}
