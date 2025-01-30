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
  private xp = this.persistance.getItem('xp');

  private rang: Rang[] = [
    new Rang('Новобранец', 1, 0),
    new Rang('Рядовой', 2, 100),
    new Rang('Ефрейтор', 3, 500),
    new Rang('Капрал', 4, 1500),
  ];

  constructor(private persistance: PersistanceService) {
    if (!this.persistance.getItem('xp')) this.persistance.setItem('xp', 0);
  }

  public getXp() {
    return this.xp;
  }

  public addXp(xp: number) {
    this.xp += xp;
    this.persistance.setItem('xp', this.xp);
  }
}
