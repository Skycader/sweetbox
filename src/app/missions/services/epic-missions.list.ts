import { Injectable } from '@angular/core';
import { Mission } from './mission.class';
import { MissionConfig, MissionsService } from './missions.service';
import { TimeEnum } from '../models/time.list.enum';

@Injectable({
  providedIn: 'root',
})
export class EpicMissions {
  constructor(private mission: MissionsService) {}

  private epicMissions: MissionConfig[] = [
    {
      id: 'java-homework',
      title: '☕️ Сделать домашку по Java курсу',
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
