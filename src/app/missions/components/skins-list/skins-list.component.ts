import { Component } from '@angular/core';
import { TimeEnum } from '../../models/time.list.enum';
import { Mission } from '../../services/mission.class';
import {
  MissionConfig,
  MissionsService,
} from '../../services/missions.service';
import { SkinsEnum } from '../../models/skins.enum';
import { PrettyNumberPipe } from '../../utils/pipes/pretty-number.pipe';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-skins-list',
  templateUrl: './skins-list.component.html',
  styleUrl: './skins-list.component.scss',
})
export class SkinsListComponent {
  constructor(
    private mission: MissionsService,
    private dialogRef: DialogRef,
  ) { }

  private missions: MissionConfig[] = [];

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    const audio = new Audio('assets/audio/takeout.mp3');
    audio.volume = 0.3;
    audio.play();

    SkinsEnum.forEach((skin, index) => {
      this.missions.push({
        id: `${skin}-skin`,
        title: `Наберите ${new PrettyNumberPipe().transform(
          Number(Math.pow(2, index) + '00000'),
        )} опыта, чтобы получить этот скин`,
        skin: skin,
        step: 100,
        refreshTime: 365 * TimeEnum.DAY,
        respawnTime: 365 * TimeEnum.DAY,
        reward: { keyType: 3, amount: 10, xp: 0 },
        autocomplete: true,
      });
    });
    this.skins = this.get();
  }

  public skins: Mission[] = [];

  public get(): Mission[] {
    return this.missions.map((mission) => this.mission.make(mission));
  }

  ngOnDestroy() {
    const audio = new Audio('assets/audio/close.mp3');
    audio.volume = 0.3;
    audio.play();
  }
}
