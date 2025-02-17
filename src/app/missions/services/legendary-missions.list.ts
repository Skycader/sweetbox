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
      id: 'reading-marathon',
      title: '📖 Марафон чтения - достигнуть мастера-сержанта до 19 марта 2025',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 10000 },
    },
    {
      id: 'split-marathon',
      title: '📖 Марафон шпагата - достигнуть сержанта до 19 марта 2025',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 5000 },
    },
    {
      id: 'finish-java-course',
      title: '☕️ Завершить Java курс',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 4000 },
    },
    {
      id: 'finish-book-reading',
      title: '📖 Завершить чтение "Взломать Всё"',
      step: 100,
      refreshTime: 6 * TimeEnum.HOUR,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 3, amount: 1, xp: 1000 },
    },
    {
      id: 'finish-sql-book',
      title: '📓 Закончить чтение книги SQL бычстрое погружение (+практика)',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 3, amount: 1, xp: 1000 },
    },
    {
      id: 'learn-lodash',
      title: '📓 Изучить Lodash (добавить 10 упражнений по Lodash)',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 3, amount: 1, xp: 1000 },
    },
    {
      id: 'learn-c-lang',
      title: '📓 Изучить язык Си (добавить 10 упражнений по Си)',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 3, amount: 1, xp: 1000 },
    },
  ];

  public get(): Mission[] {
    return this.legendaryMissions.map((mission) => this.mission.make(mission));
  }
}
