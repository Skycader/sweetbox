import { ChangeDetectorRef, Component } from '@angular/core';
import { TimeEnum } from '../../models/time.list.enum';
import {
  Persistance,
  PersistanceService,
} from '../../../common/services/persistance.service';
import { StorageService } from '../../../storage/services/storage.service';
import { keys } from '../../../sweetbox/resources/keys.resource';
import { interval, tap } from 'rxjs';

export class Mission {
  private disabledUntil = 0;
  private progress = 0;
  private isCompletedUntil = 0;
  private stats: any = {
    progress: 0,
    disabledUntil: Date.now(),
    isCompletedUntil: Date.now(),
  };

  constructor(
    public title: string,
    private step: number,
    private refreshTime: number,
    private respawnTime: number,
    private persistance: PersistanceService,
    private storage: StorageService,
  ) {
    this.stats = this.loadMissionStats(this.title) || this.stats;
    this.disabledUntil = this.stats.disabledUntil;
    this.progress = this.stats.progress;
    this.isCompletedUntil = this.stats.isCompletedUntil;
    this.init();
  }

  public complete() {
    this.progress += this.step;

    this.stats.progress = this.progress;

    this.disabledUntil = Date.now() + this.refreshTime;

    this.stats.disabledUntil = this.disabledUntil;

    if (this.progress < 100) {
      const audio = new Audio(`assets/audio/exp.m4a`);
      audio.play();
    }
    if (this.progress >= 100) {
      const audio = new Audio(`assets/audio/mission-complete.m4a`);
      audio.play();

      this.storage.addItem(keys[0], 1);
      this.progress = 0;
      this.stats.progress = this.progress;
      this.isCompletedUntil = Date.now() + this.respawnTime;
      this.stats.isCompletedUntil = this.isCompletedUntil;
    }

    const missions = this.persistance.getItem('missions') || [];
    missions[this.title] = this.stats;
    this.persistance.setItem('missions', missions);
  }

  public isDisabled() {
    return this.disabledUntil > Date.now();
  }

  public isCompleted() {
    return this.isCompletedUntil > Date.now();
  }

  public getProgress() {
    return this.progress;
  }

  public loadMissionStats(title: string) {
    if (this.persistance.getItem('missions')) {
      return this.persistance.getItem('missions')[title];
    } else {
      this.persistance.setItem('missions', {});
      return null;
    }
  }

  public init() {
    if (!this.persistance.getItem('missions')) {
      this.persistance.setItem('missions', {});
    }

    const missions = this.persistance.getItem('missions');
    missions[this.title] = this.stats;
    this.persistance.setItem('missions', missions);
  }
}

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.scss',
})
export class MissionsListComponent {
  public missions: Mission[] = [
    new Mission(
      'Отчистить Memos',
      25,
      6 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Memos - добавить 1 карточку',
      10,
      6 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      '1 практика японского языка на дуолинго',
      10,
      1 * TimeEnum.MINUTE,
      3 * TimeEnum.HOUR,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Сделать 1 новый урок японского на дуолинго',
      20,
      1 * TimeEnum.MINUTE,
      3 * TimeEnum.HOUR,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Сделать 10 упражнений на морязнку',
      5,
      60 * TimeEnum.MINUTE,
      12 * TimeEnum.HOUR,
      this.persistance,
      this.storage,
    ),

    new Mission(
      'Сделать 10 отжиманий',
      20,
      TimeEnum.MINUTE,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Сделать 20 скручиваний',
      10,
      TimeEnum.MINUTE,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Сделать 10 приседаний',
      20,
      TimeEnum.MINUTE,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Сделать растяжку ног на кухне',
      10,
      TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Сделать растяжку ног на коврике - с дисками гантелей',
      10,
      TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Растяжка - продольный шпагат на полу',
      10,
      TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Растяжка - поперечный шпагат у стенки',
      50,
      3 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Махи ногами - 20 каждой ногой',
      10,
      3 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      '100 сжиманий кулаков - с эспандером',
      10,
      1 * TimeEnum.MINUTE,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      '2-х минутная тренировка прочности костяшек кулаков',
      10,
      1 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Сделать Широ Оби но Ката',
      50,
      6 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Собрать кубик рубика',
      25,
      12 * TimeEnum.HOUR,
      TimeEnum.HOUR,
      this.persistance,
      this.storage,
    ),
    new Mission(
      'Прочитать 1 главу книги',
      50,
      12 * TimeEnum.HOUR,
      TimeEnum.HOUR,
      this.persistance,
      this.storage,
    ),

    new Mission('debug', 50, 1000, 1000, this.persistance, this.storage),
  ];

  public customMissions: Mission[] = [];

  constructor(
    private persistance: PersistanceService,
    private storage: StorageService,
    private cdk: ChangeDetectorRef,
  ) { }

  public loading = true;
  public finish = false;
  ngOnInit() {
    const audio = new Audio(`assets/audio/menu.mp3`);
    audio.play();
    setTimeout(() => {
      this.loading = false;
    }, 0);
    setTimeout(() => {
      this.finish = true;
    }, 500);
  }

  public update$ = interval(100).pipe(tap(() => this.cdk.detectChanges));

  // Используем функцию, передавая необходимый ID
}
