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
      title: '☕️ Сделать домашку по Java курсу',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: 365 * TimeEnum.DAY,
      reward: { keyType: 2, amount: 3, xp: 4000 },
    },
  ];

  public get(): Mission[] {
    return this.epicMissions.map((mission) => this.mission.make(mission));
  }
}
