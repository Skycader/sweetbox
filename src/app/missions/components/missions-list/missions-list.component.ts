import { ChangeDetectorRef, Component } from '@angular/core';
import { interval, tap } from 'rxjs';
import { Mission } from '../../services/mission.class';
import { CommonMissions } from '../../services/common-missions.list';
import { LegendaryMissions } from '../../services/legendary-missions.list';
import { EpicMissions } from '../../services/epic-missions.list';
import { RareMissions } from '../../services/rare-missions.list';
import { TimeEnum } from '../../models/time.list.enum';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.scss',
})
export class MissionsListComponent {
  constructor(
    private cdk: ChangeDetectorRef,
    private common: CommonMissions,
    private rare: RareMissions,
    private epic: EpicMissions,
    private legendary: LegendaryMissions,
  ) { }

  public commonMissions: Mission[] = this.common.get();
  public rareMissions: Mission[] = this.rare.get();
  public epicMissions: Mission[] = this.epic.get();
  public legendaryMissions: Mission[] = this.legendary.get();

  public loading = true;
  public finish = false;
  public hideCompletedMissions = false;

  public toggle() {
    this.hideCompletedMissions = !this.hideCompletedMissions;
  }

  public areAllMissionsComplete() {
    const missions = this.commonMissions.slice(1);

    let allMissionsComplete = true;
    let totalPercentage = 0;
    let requiredTotalPercentage = (this.commonMissions.length - 1) * 100;

    missions.forEach((mission: Mission) => {
      if (!mission.isCompleted()) allMissionsComplete = false;
      totalPercentage +=
        mission.getProgress() + Number(mission.isCompleted()) * 100;
    });

    if (allMissionsComplete) {
      return this.commonMissions[0].unblock();
    }

    this.commonMissions[0].setProgress(
      Math.floor((totalPercentage / requiredTotalPercentage) * 100),
    );

    this.commonMissions[0].setRequiredProgress(
      Math.floor(
        ((this.getSecondsToday() - 8 * 60 * 60) / (12 * 60 * 60)) * 100,
      ),
    );
  }

  public getSecondsToday() {
    let now = new Date();

    // create an object using the current day/month/year
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let diff = now.getTime() - today.getTime(); // ms difference
    return Math.round(diff / 1000); // make seconds
  }

  public randomBonus() {
    const key = new Date().toISOString().split('T')[0];
    const key2 = new Date().toISOString().split('T')[0] + '#2';
    const randomNum = getRandomNumber(key, 0, this.commonMissions.length - 1);
    const randomNum2 = getRandomNumber(key2, 0, this.commonMissions.length - 1);
    this.commonMissions[randomNum].setRewardCoef(3);
    this.commonMissions[randomNum2].setRewardCoef(2);
  }

  ngOnInit() {
    const audio = new Audio(`assets/audio/menu.mp3`);
    audio.volume = 0.3;
    audio.play();
    setTimeout(() => {
      this.loading = false;
    }, 0);
    setTimeout(() => {
      this.finish = true;
    }, 500);
  }

  openHours() {
    const currentTime = this.getSecondsToday();
    currentTime > 8 * TimeEnum.HOUR && currentTime < 20 * TimeEnum.HOUR;
  }

  public update$ = interval(100).pipe(
    tap(() => {
      this.randomBonus();
      this.cdk.detectChanges();
      this.areAllMissionsComplete();
    }),
  );

  // Используем функцию, передавая необходимый ID
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i); // hash = hash * 31 + charCode
    hash |= 0; // Приведение к 32-битному целому
  }
  return hash;
}

function getRandomNumber(key: string, min: number, max: number): number {
  const hash = hashCode(key);
  const range = max - min + 1;
  // Используем модуль, чтобы результат был в пределах от 0 до range-1
  return min + (Math.abs(hash) % range);
}
