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
      title: '🇯🇵 Получить 🟦 пояс по японскому языку, закончив 2ую секцию из 5',
      step: 100,
      refreshTime: TimeEnum.HOUR,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 1, amount: 10, xp: 2000 },
    },
    {
      id: 'memos-cards',
      title: '📖 Словарь Memos достиг 1 800 карточек',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 5, xp: 1000 },
    },
    {
      id: 'memos-power',
      title: '📖 Мощь Memos достигла 16 000 000 часов',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 4, amount: 10000, xp: 1000 },
    },
    //Хозяйственные активности
    {
      id: 'clean-pc-light',
      title: '💧 Помыть пылевые фильтры ПК',
      step: 100,
      refreshTime: TimeEnum.SECOND,
      respawnTime: 7 * TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 1000 },
    },

    {
      id: 'washing-the-plates',
      title: '💧 Помыть посуду',
      step: 100,
      refreshTime: TimeEnum.SECOND,
      respawnTime: 7 * TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 1000 },
    },
    {
      id: 'iron-clothes',
      title: '👕 Погладить вещи',
      step: 100,
      refreshTime: TimeEnum.SECOND,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 1000 },
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
      step: 100,
      refreshTime: TimeEnum.HOUR,
      respawnTime: TimeEnum.HOUR,
      reward: { keyType: 4, amount: 660, xp: 500 },
      maxPerDay: 10,
    },
    {
      id: 'japanese-unit-legendary',
      title: '🇯🇵 Сделать юнит японского легендарным',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: 10 * TimeEnum.SECOND,
      reward: { keyType: 1, amount: 1, xp: 200 },
    },
    {
      id: 'finish-japanese-unit',
      title: '🇯🇵 Закончить юнит японского',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 4, amount: 300, xp: 200 },
    },
    {
      id: 'karate-training',
      title: '🥋 Сходить на тренировку по каратэ',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 1, xp: 1500 }, //по 500 за уровень пояса (нет кю, 10 кю, 9 кю)
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
