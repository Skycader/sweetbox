import { Injectable } from '@angular/core';
import { Mission } from './mission.class';
import { MissionConfig, MissionsService } from './missions.service';
import { TimeEnum } from '../models/time.list.enum';

@Injectable({
  providedIn: 'root',
})
export class EpicMissions {
  constructor(private mission: MissionsService) { }

  private epicMissions: MissionConfig[] = [
    {
      id: 'find-lost-girl-quest',
      title: '👩‍🦱 Найти пропавшую девочку до 1 марта 2025 года',
      step: 100,
      refreshTime: TimeEnum.SECOND,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 2, amount: 3, xp: 1000 },
    },
    {
      id: 'java-homework',
      title: '☕️ Сделать домашку по Java курсу',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 2, amount: 3, xp: 400 },
    },
    {
      id: 'regexp-mission',
      title: '📓 Освоить HTML карточки',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 2, amount: 3, xp: 400 },
    },
    {
      id: 'regexp-mission',
      title:
        '📓 Добавить форматировщик красивых чисел => 123456 превращает в 123 456',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 2, amount: 3, xp: 400 },
    },
    {
      id: 'regexp-mission',
      title: '📓 Освоить следующую главу регулярных выражений',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 2, amount: 3, xp: 400 },
    },

    {
      id: 'grid-css',
      title: '📓 Сделать проект на GRID CSS',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 2, amount: 3, xp: 400 },
    },
  ];

  public get(): Mission[] {
    return this.epicMissions.map((mission) => this.mission.make(mission));
  }
}
