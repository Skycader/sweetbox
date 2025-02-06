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
      title: '🇯🇵 Довести уровень японского до синего пояса',
      step: 100,
      refreshTime: TimeEnum.HOUR,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 3, amount: 1, xp: 20000 },
    },
    {
      title: '🧹 Миссия Минимализм',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: 24 * TimeEnum.HOUR,
      reward: { keyType: 3, amount: 1, xp: 4000 },
    },
    {
      title: '☕️ Завершить Java курс',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 40000 },
    },
    {
      title: '📖 Завершить чтение "Взломать Всё"',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 10000 },
    },
    {
      title: '📓 Закончить чтение книги SQL бычстрое погружение (+практика)',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 3, amount: 1, xp: 10000 },
    },
    {
      title: '📓 Изучить Lodash (добавить 10 упражнений по Lodash)',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 3, amount: 1, xp: 10000 },
    },
    {
      title: '📓 Изучить язык Си (добавить 10 упражнений по Си)',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 3, amount: 1, xp: 10000 },
    },
  ];

  public get(): Mission[] {
    return this.legendaryMissions.map((mission) => this.mission.make(mission));
  }
}
