import { Injectable } from '@angular/core';
import { Mission } from './mission.class';
import { MissionConfig, MissionsService } from './missions.service';
import { TimeEnum } from '../models/time.list.enum';
import { RangService } from '../../rangs/services/rang.service';
import { SkinsEnum } from '../models/skins.enum';

@Injectable({
  providedIn: 'root',
})
export class CommonMissions {
  constructor(
    private mission: MissionsService,
    private rang: RangService,
  ) { }

  getIncomeLevel(income: number) {
    return Math.ceil(Math.log2(income / 100000));
  }

  private commonMissions: MissionConfig[] = [
    {
      id: 'everyday-hero',
      title:
        '🎁 Выполните все ежедневные миссии в течении суток, чтобы получить эту награду',
      step: 100,
      skin: SkinsEnum[this.getIncomeLevel(this.rang.getXp())],
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 5, xp: 1000 },
      autocomplete: true,
    },

    //Прием добавок
    {
      id: 'antidepresant',
      title: '❤️  Выпить антидепресант',
      step: 100,
      refreshTime: 0,
      respawnTime: 24 * TimeEnum.HOUR,
      reward: { keyType: 4, amount: 1, xp: 10 },
      openHours: [9, 24],
    },
    {
      id: 'b-vitamins',
      title: '🍫 Выпить витамминный комплекс Б',
      step: 100,
      refreshTime: 0,
      respawnTime: 24 * TimeEnum.HOUR,
      reward: { keyType: 4, amount: 1, xp: 10 },
      openHours: [0, 24],
    },
    {
      id: 'gainer',
      title: '🏋️‍♂️  Принять гейнер',
      step: 100,
      refreshTime: 0,
      respawnTime: 24 * TimeEnum.HOUR,
      reward: { keyType: 4, amount: 1, xp: 10 },
      openHours: [9, 24],
    },
    {
      id: 'ptorein',
      title: '🏋️‍♂️  Принять протеин',
      step: 100,
      refreshTime: 0,
      respawnTime: 24 * TimeEnum.HOUR,
      reward: { keyType: 4, amount: 1, xp: 10 },
      openHours: [14, 24],
    },
    {
      id: 'kalogen',
      title: '🏋️‍♂️  Принять креатин',
      step: 100,
      refreshTime: 0,
      respawnTime: 24 * TimeEnum.HOUR,
      reward: { keyType: 4, amount: 1, xp: 10 },
      openHours: [18, 24],
    },

    //Избранное
    {
      id: 'clean-memos',
      title: '❤️  Отчистить Memos',
      step: 100,
      refreshTime: 0,
      respawnTime: 6 * TimeEnum.HOUR,
      reward: { keyType: 0, amount: 1, xp: 40 },
      maxPerDay: 4,
    },
    {
      id: 'take-shower-jump',
      title: '🚿 Принять душ + холодный душ + 100 раз попрыгать',
      step: 50,
      refreshTime: TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      id: 'calf-muscles',
      title: '💪 Тренировка икроножных мышц - 100 раз',
      step: 50,
      refreshTime: 10 * TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 100 }, //1xp за работу
      stars: 1,
    },
    {
      id: 'eat-apple',
      title: '🍏 Съесть яблоко',
      step: 100,
      refreshTime: TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 10 },
    },

    //Ката
    {
      id: 'shiro-obi-no-kata',
      title: '🥋⬜️ Сделать Широ Оби Но Ката',
      step: 50,
      refreshTime: 3 * TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 2,
    },
    {
      id: 'ao-obi-no-kata',
      title: '🥋🟦 Сделать Ао Оби Но Ката',
      step: 50,
      refreshTime: 3 * TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 1,
    },

    //Силовые упражнения
    {
      id: 'push-ups',
      title: '💪 Сделать 10 отжиманий',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 1, //за каждые 20 отжиманий (20/100 => 10/50 => 1/5)
    },
    {
      id: 'abs',
      title: '💪 Сделать 20 скручиваний',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 2,
    },
    {
      id: 'squats',
      title: '💪 Сделать 10 приседаний',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 1,
    },
    {
      id: 'bicycle-exercise',
      title: '💪 Упражнение "Велиосипед" - махи ногами лёжа 100 раз',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 1,
    },
    {
      id: 'leg-swinging',
      title: '💪 Махи ногами - 20 каждой ногой',
      step: 50,
      refreshTime: 10 * TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 25 },
      stars: 2,
    },
    {
      id: 'hand-training',
      title: '💪 100 сжиманий кулаков - с эспандером',
      step: 10,
      refreshTime: 1 * TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
      stars: 2,
    },
    {
      id: 'fist-training',
      title: '💪 2-х минутная тренировка прочности костяшек кулаков',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
      maxPerDay: 10,
      stars: 1,
    },
    {
      id: 'back-training',
      title:
        '💪 Тренировка мышц спины с 2 дисками по 2 кг - 3 подхода по 20 раз',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
      stars: 1,
    },
    {
      id: 'kegel-training',
      title: '💪 Упражнения кегеля 100 раз и ноги назад 100 раз каждая',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 1,
    },
    {
      id: 'elbow-up-downs',
      title: '💪 Вверх-вниз на коленях x100',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
      stars: 1,
    },
    {
      id: 'legs-statics',
      title: '💪 Держать ноги на весу - вперед и вбок 1 минуту',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 60 },
      stars: 1,
    },

    //Растяжка
    {
      id: 'kitchen-stretching',
      title: '🤸 Сделать растяжку ног на кухне x6',
      step: 20,
      refreshTime: 20 * TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      maxPerDay: 2,
      stars: 3,
    },
    {
      id: 'carpet-stretching',
      title: '🧘 Сделать растяжку ног на коврике - с дисками гантелей 2x3',
      step: 50,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: 40 * TimeEnum.MINUTE,
      reward: { keyType: 0, amount: 1, xp: 120 },
      level: '🟦 125°',
      stars: 3,
      maxPerDay: 3,
    },
    {
      id: 'long-split',
      title: '🦵 Растяжка - продольный шпагат на полу 1x4',
      step: 50,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: 40 * TimeEnum.MINUTE,
      reward: { keyType: 0, amount: 1, xp: 120 },
      level: '🟦 125°',
      stars: 3,
      maxPerDay: 3,
    },
    {
      id: 'transverse-split',
      title: '🤸 Растяжка - поперечный шпагат у стенки - 2x4',
      step: 50,
      refreshTime: TimeEnum.SECOND,
      respawnTime: TimeEnum.SECOND,
      reward: { keyType: 0, amount: 1, xp: 120 },
      level: '🟦🟡 124°',
      stars: 3,
      maxPerDay: 5,
    },
    {
      id: 'spring-exc',
      title: '🤸 Растяжка - на коврике голову к полу + пружинка 1x4',
      step: 50,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: 40 * TimeEnum.MINUTE,
      reward: { keyType: 0, amount: 1, xp: 120 },
      maxPerDay: 5,
      skin: 'epic/emerald.webp',
      stars: 1,
    },

    //Ментальные упражнения

    {
      id: 'memos-add-card',
      title: '❤️  Memos - добавить 1 карточку',
      step: 100,
      refreshTime: TimeEnum.SECOND,
      respawnTime: TimeEnum.SECOND,
      reward: { keyType: 0, amount: 1, xp: 40 },
      maxPerDay: 10,
      stars: 1,
    },
    {
      id: 'duolingo-japanese-practice',
      title: '🇯🇵 1 практика японского языка на дуолинго',
      step: 25,
      refreshTime: TimeEnum.SECOND,
      respawnTime: 12 * TimeEnum.SECOND,
      reward: { keyType: 0, amount: 2, xp: 20 },
      level: '⬜️🔵',
      maxPerDay: 5,
      stars: 1,
    },
    {
      id: 'duolingo-new-japanese-lesson',
      title: '🇯🇵 Сделать 1 новый урок японского на дуолинго',
      step: 25,
      refreshTime: TimeEnum.SECOND,
      respawnTime: TimeEnum.SECOND,
      reward: { keyType: 0, amount: 2, xp: 40 },
      level: '⬜️🔵',
      maxPerDay: 5,
      stars: 1,
    },
    {
      id: 'finish-morsecode-level',
      title: '⛵️ Закончить уровень морязки',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 0, amount: 1, xp: 120 },
      maxPerDay: 5,
      stars: 2,
    },
    {
      id: 'rubics-cube',
      title: '🧠 Собрать кубик рубика',
      step: 50,
      refreshTime: 3 * TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 1, //1 минута (1 звезда), 30 сек (2), 15 сек(3), 10 сек (4), 5 сек (5)
    },
    {
      id: 'reading',
      title: '📖 Прочитать 1 главу книги',
      step: 50,
      refreshTime: TimeEnum.SECOND,
      respawnTime: TimeEnum.SECOND,
      reward: { keyType: 0, amount: 2, xp: 400 },
      maxPerDay: 10,
      stars: 1,
    },
    {
      id: 'raptorium',
      title: '🧑‍💻 Убить демона в Raptorium',
      step: 50,
      refreshTime: TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
      stars: 4,
    },
    {
      id: 'regexp',
      title: '🧑‍💻 Решить случайное regexp задание',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      stars: 3,
    },
    {
      id: 'chess-training',
      title: '🧠 Решить упражнение по шахматам на lichess.org (всего 10)',
      step: 10,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 10 },
      stars: 1,
    },
  ];

  public get(): Mission[] {
    let xp = 0;
    this.commonMissions.forEach(
      (mission) => (xp += mission.reward.xp * (100 / mission.step)),
    );
    return this.commonMissions.map((mission) => this.mission.make(mission));
  }
}
