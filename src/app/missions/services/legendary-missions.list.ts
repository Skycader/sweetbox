import { Injectable } from '@angular/core';
import { Mission } from './mission.class';
import { MissionConfig, MissionsService } from './missions.service';
import { TimeEnum } from '../models/time.list.enum';

@Injectable({
  providedIn: 'root',
})
export class LegendaryMissions {
  constructor(private mission: MissionsService) { }

  private legendaryMissions: MissionConfig[] = [
    {
      title: '🧹 Миссия Минимализм',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 5000 },
    },
    {
      title: '☕️ Завершить Java курс',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 10000 },
    },
    {
      title: '📖 Завершить чтение "Взломать Всё"',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 5000 },
    },
  ];

  public get(): Mission[] {
    return this.legendaryMissions.map((mission) => this.mission.make(mission));
  }
}
