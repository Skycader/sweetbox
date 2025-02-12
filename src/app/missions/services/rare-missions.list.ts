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
      id: 'blue-belt-japanese',
      title: '🇯🇵 Довести уровень японского до синего пояса',
      step: 100,
      refreshTime: TimeEnum.HOUR,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 1, amount: 10, xp: 2000 },
    },
    {
      id: 'memos-cards',
      title: '📖 Словарь Memos достиг 1 700 карточек',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 5, xp: 1000 },
    },
    {
      id: 'memos-power',
      title: '📖 Мощь Memos достигла 15 000 000 часов',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 5, xp: 1000 },
    },
    {
      id: 'cleaning-time',
      title: '💧 Помыть и пропылесосить полы',
      step: 100,
      refreshTime: TimeEnum.SECOND,
      respawnTime: 7 * TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 1000 },
    },
    {
      id: 'algorithm-task',
      title: '📖 Решить алгоритмическую задачу',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 100 },
    },
    {
      id: 'japanese-unit-legendary',
      title: '🇯🇵 Сделать юнит японского легендарным',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 200 },
    },
    {
      id: 'finish-japanese-unit',
      title: '🇯🇵 Закончить юнит японского',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 200 },
    },
    {
      id: 'karate-training',
      title: '🥋 Сходить на тренировку по каратэ',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 400 }, //эквивалент 1000 отжиманий, 1 000 000 (маршал) = 250 тренировок (почти 2 года, 96 Тренировок за год)
    },
    {
      id: 'chess-za-warudo',
      title: '♟ Победить в шахматах используя The World',
      step: 100,
      refreshTime: 6 * TimeEnum.DAY,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 1, amount: 1, xp: 100 },
    },
  ];

  public get(): Mission[] {
    return this.rareMissions.map((mission) => this.mission.make(mission));
  }
}
