import { Injectable } from '@angular/core';
import { Mission } from './mission.class';
import { MissionConfig, MissionsService } from './missions.service';
import { TimeEnum } from '../models/time.list.enum';

@Injectable({
  providedIn: 'root',
})
export class RareMissions {
  constructor(private mission: MissionsService) { }

  private rareMissions: MissionConfig[] = [
    {
      title: '💧 Помыть и пропылесосить полы',
      step: 100,
      refreshTime: TimeEnum.SECOND,
      respawnTime: 7 * TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 10000 },
    },
    {
      title: '📖 Решить алгоритмическую задачу',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 1000 },
    },
    {
      title: '🇯🇵 Сделать юнит японского легендарным',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 2000 },
    },
    {
      title: '🇯🇵 Закончить юнит японского',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 2000 },
    },
    {
      title: '🥋 Сходить на тренировку по каратэ',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 4000 }, //эквивалент 1000 отжиманий, 1 000 000 (маршал) = 250 тренировок (почти 2 года, 96 Тренировок за год)
    },
    {
      title: '🛸 Дрон нашел ключ',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      title: '📖 Прочитать дополнительно 5 глав за день (клик за 1 главу)',
      step: 20,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 2000 },
    },
    {
      title: '♟ Победить в шахматах используя The World',
      step: 100,
      refreshTime: 6 * TimeEnum.DAY,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 1, amount: 1, xp: 1000 },
    },
  ];

  public get(): Mission[] {
    return this.rareMissions.map((mission) => this.mission.make(mission));
  }
}
