import { NotificationService } from '../../common/services/notification.service';
import { PersistanceService } from '../../common/services/persistance.service';
import { SnackbarService } from '../../common/services/snackbar.service';
import { RangService } from '../../rangs/services/rang.service';
import { StorageService } from '../../storage/services/storage.service';
import { coins } from '../../sweetbox/resources/coins.resource';
import { keys } from '../../sweetbox/resources/keys.resource';
import { MissionStats } from '../models/mission-stats.model';
import { SkinsEnum } from '../models/skins.enum';
import { Streak } from '../models/streak.model';
import { MissionConfig } from './missions.service';

export class Mission {
  private disabledUntil = 0;
  private progress = 0;
  private requiredProgress = 0;
  private isCompletedUntil = 0;

  public notifyOfNewRang = false;

  private stats: MissionStats = {
    streak: { days: 0, doneToday: false },
    progress: 0,
    disabledUntil: Date.now(),
    isCompletedUntil: Date.now(),
    skillXp: 0,
    doneToday: 0,
    todoDate: '',
    notifiedReady: true,
    hearts: 3,
    onFire: 0,
    maxHearts: this.config.maxHearts ? this.config.maxHearts : 3,
    lastCompleted: Date.now(),
  };

  constructor(
    private config: MissionConfig,
    private deps: {
      rang: RangService;
      storage: StorageService;
      persistance: PersistanceService;
      notification: NotificationService;
      snackbar: SnackbarService;
    },
  ) {
    this.stats =
      {
        ...this.stats,
        ...this.loadMissionStats(this.config.id),
      } || this.stats;

    if (this.config.maxHearts) this.stats.maxHearts = this.config.maxHearts;

    if (this.stats.hearts > this.stats.maxHearts)
      this.stats.hearts = this.stats.maxHearts;

    this.disabledUntil = this.stats.disabledUntil;
    this.progress = this.stats.progress;
    this.isCompletedUntil = this.stats.isCompletedUntil;
    this.refreshTodo();
    this.init();
  }

  unblock() {
    this.config.autocomplete = false;
  }

  setProgress(progress: number) {
    this.progress = progress;
  }

  setRequiredProgress(progress: number) {
    this.requiredProgress = progress;
  }

  getIncomeLevel(income: number) {
    return Math.ceil(Math.log2(income / 100000));
  }

  public getConfig() {
    return {
      title: this.config.title,
      skin: this.config.skin
        ? this.config.skin
        : SkinsEnum[this.getIncomeLevel(this.getSkillXp())],
      hash: this.hashCode(this.config.title),
      step: this.config.step,
      refreshTime: this.formatDuration(this.config.refreshTime),
      respawnTime: this.formatDuration(this.config.respawnTime),
      autocomplete: this.config.autocomplete,
      xp: this.config.reward.xp,
      level: this.config.level,
      skillXp: this.stats.skillXp,
      maxPerDay: this.config.maxPerDay ? this.config.maxPerDay : 1,
      doneToday: this.stats.doneToday,
      openHours: this.config.openHours ? this.config.openHours : [0, 24],
      stars: this.config.stars,
      achivedStars: () =>
        this.config.stars ? '⭐️'.repeat(this.config.stars) : '',
      unachivedStars: () =>
        this.config.stars ? '⭐️'.repeat(5 - this.config.stars) : '',
    };
  }

  public hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i); // hash = hash * 31 + charCode
      hash |= 0; // Приведение к 32-битному целому
    }
    return hash;
  }

  public formatDuration(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    if (minutes > 0) {
      return `${minutes}m`;
    }
    return `${seconds}s`;
  }

  public today() {
    let day = new Date().toISOString().split('T')[0]; //2025-01-27
    return day;
  }

  public setPrize(keyType: number, amount: number, xp?: number) {
    this.config.reward = {
      keyType,
      amount,
      xp: xp ? xp : this.config.reward.xp,
    };
  }

  private rewardCoef = 1;
  public setRewardCoef(coef: number) {
    this.rewardCoef = coef;
  }

  public earlyBirdReward() {
    return 1;
    // if (this.config.reward.keyType > 0) return 1;
    // const date = new Date();
    // if (date.getHours() < 12) return 3;
    // if (date.getHours() < 16) return 2;
    // return 1;
  }

  public getRewardCoef() {
    return this.rewardCoef * this.earlyBirdReward();
  }

  public getReward() {
    return this.config.reward;
  }

  public refillHearts() {
    this.stats.hearts = this.stats.maxHearts;
    this.stats.lastCompleted = Date.now();
    this.sync();
  }

  public refreshTodo() {
    const today = this.today();
    if (this.stats.todoDate === '') this.stats.todoDate = this.today();

    if (this.stats.todoDate !== today) {
      this.stats.todoDate = this.today();
      this.stats.progress = 0;
      this.stats.isCompletedUntil = 0;
      this.stats.disabledUntil = 0;
      this.disabledUntil = 0;
      this.progress = 0;
      this.isCompletedUntil = 0;
      this.stats.doneToday = 0;
      this.stats.onFire = 0;

      if (this.stats.streak.doneToday === false) {
        this.stats.hearts -= 1;
        if (this.stats.hearts === 0) this.stats.streak.days = 0;
      }
      this.stats.streak.doneToday = false;

      const daysSinceLastComplete =
        Math.floor(
          (Date.now() - this.stats.lastCompleted) / 1000 / 60 / 60 / 24,
        ) || 1;

      if (
        this.stats.skillXp > 0 &&
        (this.config.reward.keyType === 0 || this.config.reward.keyType === 4)
      )
        if (this.stats.hearts < 0) {
          //Чем больше уровень - тем выше вероятность потерять сердце

          for (let day = 0; day < daysSinceLastComplete; day++) {
            if (
              this.config.reward.keyType === 0 ||
              this.config.reward.keyType === 4
            )
              this.stats.hearts -= this.stats.streak.doneToday ? 0 : 1;
            if (this.stats.hearts < 0) this.stats.hearts = 0;
          }

          // for (let i = 0; i < daysSinceLastComplete - 3; i++) {
          //   const log: any =
          //     JSON.parse(localStorage.getItem('log') as any) || [];
          //   log.push(
          //     `${this.today()}Снятие очков опыта в размере 10% у навыка ${this.config.title
          //     }`,
          //   );
          //   localStorage.setItem('log', JSON.stringify(log));
          //   this.stats.skillXp -= Math.floor(this.stats.skillXp * 0.1);
          // }
          if (this.stats.skillXp < 0) this.stats.skillXp = 0;
          this.stats.hearts = 0;
        }
    }
  }

  public getStats() {
    return this.stats;
  }

  public getFire() {
    return '🔥'.repeat(this.stats.onFire);
  }

  public getDeadFire() {
    return '🔥'.repeat(3 - this.stats.onFire);
  }

  public getHearts() {
    if (this.stats.hearts < 0) this.stats.hearts = 0;
    return '❤️'.repeat(this.stats.hearts);
  }

  public getBrokenHearts() {
    return '💔'.repeat(this.stats.maxHearts - this.stats.hearts);
  }

  public getDoneToday() {
    return this.stats.doneToday;
  }

  public getSkillXp() {
    return this.stats.skillXp;
  }

  public getSkillRang() {
    return this.deps.rang.getRang(this.stats.skillXp);
  }

  public getSkillProgress() {
    return `${this.stats.skillXp}xp -> ${this.deps.rang.nextRangProgress(
      this.stats.skillXp,
    )} %`;
  }

  public leftToDoToday() {
    if (this.config.maxPerDay && this.stats.doneToday)
      return this.config.maxPerDay - this.stats.doneToday;
    return this.config.maxPerDay;
  }

  public complete() {
    this.stats.lastCompleted = Date.now();
    this.stats.notifiedReady = false;
    this.stats.onFire += this.stats.onFire < 3 ? 1 : 0;

    let xpToday = this.deps.persistance.getItem('xp-today', 0);

    //Сегодшняшний опыт
    xpToday += this.config.reward.xp;
    if (this.stats.onFire === 3) xpToday += this.config.reward.xp;

    this.deps.persistance.setItem('xp-today', xpToday);

    //Опыт и ранг навыка
    const rang = this.getSkillRang().icon;

    //Скилл опыт + бонус по условию
    this.stats.skillXp += this.config.reward.xp + this.getStats().streak.days;
    if (this.stats.onFire === 3) this.stats.skillXp += this.config.reward.xp;

    //Подсветить новый ранг
    if (rang !== this.getSkillRang().icon) {
      this.notifyOfNewRang = true;
      this.deps.snackbar.inform(
        `Поздравляем, теперь Вы ${this.getSkillRang().title}!`,
      );
      setTimeout(() => {
        this.notifyOfNewRang = false;
      }, 10000);
    }
    //Сердца навыка
    this.stats.hearts = this.stats.maxHearts;
    if (this.stats.hearts > this.stats.maxHearts)
      this.stats.hearts = this.stats.maxHearts;

    //Если игрок набрал 100 опыта, то ударный режим пополнен новым днем
    if (xpToday >= 100) Streak.markDoneToday();

    this.progress += this.config.step;

    setTimeout(() => {
      const prevRang = this.deps.rang.getRang().rang;

      //Добавить основной опыт + бонус
      this.deps.rang.addXp(this.getConfig().xp);
      if (this.stats.onFire === 3) this.deps.rang.addXp(this.getConfig().xp);
      if (this.stats.streak.days > 0)
        this.deps.rang.addXp(this.stats.streak.days);

      if (this.stats.streak.doneToday === false) {
        this.stats.streak.days += 1;
        this.stats.streak.doneToday = true;
      }

      const newRang = this.deps.rang.getRang().rang;

      if (newRang !== prevRang) {
        setTimeout(() => this.deps.rang.congratsOnNewRang(), 300);
      }
    }, 1500);

    this.stats.progress = this.progress;

    this.disabledUntil = Date.now() + this.config.refreshTime;

    this.stats.disabledUntil = this.disabledUntil;

    if (this.progress < 100) {
      const audio = new Audio(`assets/audio/level-up.m4a`);
      audio.play();
    }

    if (this.progress >= 100) {
      this.stats.doneToday += 1;

      const audio = new Audio(`assets/audio/mission-complete.m4a`);
      audio.play();

      const reward =
        this.config.reward.keyType < 4
          ? keys[this.config.reward.keyType]
          : coins[1];
      this.deps.storage.addItem(
        reward,
        this.config.reward.amount * this.getRewardCoef(),
      );
      this.progress = 0;
      this.stats.progress = this.progress;
      this.isCompletedUntil = Date.now() + this.config.respawnTime;
      this.stats.isCompletedUntil = this.isCompletedUntil;
    }

    this.sync();
  }

  sync() {
    const missions = this.deps.persistance.getItem('missions') || [];
    missions[this.config.id] = this.stats;
    this.deps.persistance.setItem('missions', missions);
  }

  public isDisabled() {
    if (
      this.disabledUntil <= Date.now() &&
      this.stats.notifiedReady === false &&
      this.progress > 0
    ) {
      if (Date.now() - this.stats.lastCompleted > 10000)
        this.deps.notification.notify(`${this.config.title}`);
      this.stats.notifiedReady = true;
      this.sync();
    }
    return this.disabledUntil > Date.now();
  }

  public isCompleted() {
    return this.isCompletedUntil > Date.now();
  }

  public getProgress() {
    return this.progress;
  }

  public getRequiredProgress() {
    return this.requiredProgress;
  }

  public loadMissionStats(id: string) {
    if (this.deps.persistance.getItem('missions')) {
      return this.deps.persistance.getItem('missions')[id];
    } else {
      this.deps.persistance.setItem('missions', {});
      return null;
    }
  }

  public init() {
    if (!this.deps.persistance.getItem('missions')) {
      this.deps.persistance.setItem('missions', {});
    }

    const missions = this.deps.persistance.getItem('missions');
    missions[this.config.id] = this.stats;
    this.deps.persistance.setItem('missions', missions);
  }
}

Date.prototype.toISOString = function toIsoString() {
  const date = this;
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
};
