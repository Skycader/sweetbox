import { ChangeDetectorRef, Component } from '@angular/core';
import { interval, tap } from 'rxjs';
import { Mission } from '../../services/mission.class';
import { CommonMissions } from '../../services/common-missions.list';
import { LegendaryMissions } from '../../services/legendary-missions.list';
import { EpicMissions } from '../../services/epic-missions.list';
import { RareMissions } from '../../services/rare-missions.list';
import { TimeEnum } from '../../models/time.list.enum';
import { PersistanceService } from '../../../common/services/persistance.service';
import { Streak } from '../../models/streak.model';
import { MatDialog } from '@angular/material/dialog';
import { SkinsListComponent } from '../skins-list/skins-list.component';

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
    private persistance: PersistanceService,
    private dialog: MatDialog,
  ) { }

  public commonMissions: Mission[] = this.common.get();
  public rareMissions: Mission[] = this.rare.get();
  public epicMissions: Mission[] = this.epic.get();
  public legendaryMissions: Mission[] = this.legendary.get();

  public loading = true;
  public finish = false;
  public hideCompletedMissions = true;

  public toggle() {
    this.hideCompletedMissions = !this.hideCompletedMissions;
  }

  public today() {
    let day = new Date().toISOString().split('T')[0]; //2025-01-27
    // day = '2025-01-28';
    return day;
  }

  public heroMissionCheck() {
    const toEarn = 18000;
    const currentSkillXp = 18093;
    let totalXp =
      this.commonMissions
        .find(
          (mission) =>
            mission.getConfig().id === 'duolingo-new-japanese-lesson',
        )
        ?.getStats().skillXp || 0;

    totalXp -= toEarn;

    const requiredXp = currentSkillXp + toEarn; //earn 10K exp within 7 days

    // if (cond) {
    //   return this.commonMissions[0].unblock();
    // }

    this.commonMissions[0].setProgress(
      Math.floor((totalXp / requiredXp) * 100),
    );

    const startline = Number(new Date('2025-04-06'));
    const deadline = Number(new Date('2025-05-06'));
    const formula = (Date.now() - startline) / (deadline - startline);
    this.commonMissions[0].setRequiredProgress(
      Math.floor(formula * 100) + 0.001,
    );

    /**
     * a = new Date('2025-03-09')
     * b = new Date('2025-03-16')
     * (Date.now()-a)/(b-a)
     */
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
    const key3 = new Date().toISOString().split('T')[0] + '#3';
    const randomNum = getRandomNumber(key, 0, this.commonMissions.length - 1);
    const randomNum2 = getRandomNumber(key2, 0, this.commonMissions.length - 1);
    const randomNum3 = getRandomNumber(key3, 0, this.commonMissions.length - 1);
    this.commonMissions[randomNum].setRewardCoef(4);
    this.commonMissions[randomNum2].setRewardCoef(3);
    this.commonMissions[randomNum3].setRewardCoef(2);
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

  openHours(start: number, end: number) {
    const currentTime = this.getSecondsToday();

    return (
      currentTime > start * (TimeEnum.HOUR / 1000) &&
      currentTime < end * (TimeEnum.HOUR / 1000)
    );
  }

  public update$ = interval(1000).pipe(
    tap(() => {
      this.randomBonus();
      this.cdk.detectChanges();
      this.heroMissionCheck();
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

function toIsoString(date: Date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function(num: number) {
      return (num < 10 ? '0' : '') + num;
    };

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  );
}
