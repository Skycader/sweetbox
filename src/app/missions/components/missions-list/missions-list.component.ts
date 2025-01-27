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
    private prize: { keyType: number; amount: number },
  ) {
    this.stats = this.loadMissionStats(this.title) || this.stats;
    this.disabledUntil = this.stats.disabledUntil;
    this.progress = this.stats.progress;
    this.isCompletedUntil = this.stats.isCompletedUntil;
    this.init();
  }

  public setPrize(keyType: number, amount: number) {
    this.prize = { keyType, amount };
  }

  public complete() {
    this.progress += this.step;

    this.stats.progress = this.progress;

    this.disabledUntil = Date.now() + this.refreshTime;

    this.stats.disabledUntil = this.disabledUntil;

    if (this.progress < 100) {
      const audio = new Audio(`assets/audio/level-up.m4a`);
      audio.play();
    }
    if (this.progress >= 100) {
      const audio = new Audio(`assets/audio/mission-complete.m4a`);
      audio.play();

      this.storage.addItem(keys[this.prize.keyType], this.prize.amount);
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
      'Сделать 100 шагов',
      5,
      10 * TimeEnum.MINUTE,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Отчистить Memos',
      25,
      1 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      '❤️  Отчистить Memos (25%/h)',
      25,
      1 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Memos - добавить 1 карточку',
      25,
      3 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      '1 практика японского языка на дуолинго',
      25,
      1 * TimeEnum.MINUTE,
      4 * TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Сделать 1 новый урок японского на дуолинго',
      25,
      TimeEnum.MINUTE,
      4 * TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Сделать 10 упражнений на морязнку',
      50,
      60 * TimeEnum.MINUTE,
      12 * TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Упражнение "Велиосипед" - махи ногами лёжа 100 раз',
      25,
      TimeEnum.HOUR,
      TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),

    new Mission(
      'Сделать 10 отжиманий',
      20,
      TimeEnum.MINUTE,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Сделать 20 скручиваний',
      10,
      TimeEnum.MINUTE,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Сделать 10 приседаний',
      20,
      TimeEnum.MINUTE,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Сделать растяжку ног на кухне - майнинг (каждый час +20%)',
      20,
      TimeEnum.HOUR,
      TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Сделать растяжку ног на коврике - с дисками гантелей',
      50,
      TimeEnum.HOUR,
      6 * TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Растяжка - продольный шпагат на полу',
      25,
      TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Растяжка - поперечный шпагат у стенки',
      50,
      3 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Махи ногами - 20 каждой ногой',
      10,
      3 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      '100 сжиманий кулаков - с эспандером',
      10,
      1 * TimeEnum.MINUTE,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      '2-х минутная тренировка прочности костяшек кулаков',
      10,
      1 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Сделать Широ Оби но Ката',
      50,
      6 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Собрать кубик рубика',
      25,
      12 * TimeEnum.HOUR,
      TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Прочитать 1 главу книги',
      100,
      TimeEnum.HOUR,
      TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Убить демона в Raptorium',
      25,
      6 * TimeEnum.HOUR,
      TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Решить случайное regexp задание',
      25,
      6 * TimeEnum.HOUR,
      TimeEnum.HOUR,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Съесть яблоко',
      50,
      3 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Принять душ + холодный душ + 100 раз попрыгать',
      100,
      3 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Сделать что-то очень полезное',
      100,
      6 * TimeEnum.HOUR,
      TimeEnum.DAY,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
    new Mission(
      'Дрон нашёл ключ',
      100,
      6 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 0, amount: 1 },
    ),
  ];

  public rareMissions: Mission[] = [
    new Mission(
      'Победить в шахматах используя The World',
      100,
      6 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 1, amount: 1 },
    ),
  ];
  public epicMissions: Mission[] = [
    new Mission(
      'Сделать домашку по Java курсу',
      100,
      6 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 2, amount: 3 },
    ),
  ];
  public legendaryMissions: Mission[] = [
    new Mission(
      'Завершить Java курс',
      100,
      6 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 3, amount: 1 },
    ),
    new Mission(
      'Завершить чтение "Взломать Всё"',
      100,
      6 * TimeEnum.HOUR,
      TimeEnum.MINUTE,
      this.persistance,
      this.storage,
      { keyType: 3, amount: 1 },
    ),
  ];

  constructor(
    private persistance: PersistanceService,
    private storage: StorageService,
    private cdk: ChangeDetectorRef,
  ) { }

  public loading = true;
  public finish = false;

  public randomBonus() {
    const key = new Date().toISOString().split('T')[0];
    const key2 = new Date().toISOString().split('T')[0] + '#2';
    const randomNum = getRandomNumber(key, 0, this.missions.length - 1);
    const randomNum2 = getRandomNumber(key2, 0, this.missions.length - 1);
    this.missions[randomNum].setPrize(0, 3);
    this.missions[randomNum2].setPrize(0, 2);
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

  public update$ = interval(100).pipe(
    tap(() => {
      this.randomBonus();
      this.cdk.detectChanges();
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
