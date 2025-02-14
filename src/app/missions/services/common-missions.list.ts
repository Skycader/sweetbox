import { Injectable } from '@angular/core';
import { Mission } from './mission.class';
import { MissionConfig, MissionsService } from './missions.service';
import { TimeEnum } from '../models/time.list.enum';

@Injectable({
  providedIn: 'root',
})
export class CommonMissions {
  constructor(private mission: MissionsService) { }

  private commonMissions: MissionConfig[] = [
    {
      id: 'everyday-hero',
      title:
        '🎁 Выполните все ежедневные миссии в течении суток, чтобы получить эту награду',
      step: 100,
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 3, xp: 1000 },
      autocomplete: true,
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
      step: 25,
      refreshTime: 10 * TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 2, xp: 100 }, //1xp за работу
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
    },
    {
      id: 'ao-obi-no-kata',
      title: '🥋🟦 Сделать Ао Оби Но Ката',
      step: 50,
      refreshTime: 3 * TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },

    //Силовые упражнения
    {
      id: 'push-ups',
      title: '💪 Сделать 10 отжиманий',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      id: 'abs',
      title: '💪 Сделать 20 скручиваний',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      id: 'squats',
      title: '💪 Сделать 10 приседаний',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      id: 'bicycle-exercise',
      title: '💪 Упражнение "Велиосипед" - махи ногами лёжа 100 раз',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      id: 'leg-swinging',
      title: '💪 Махи ногами - 20 каждой ногой',
      step: 50,
      refreshTime: 10 * TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 25 },
    },
    {
      id: 'hand-training',
      title: '💪 100 сжиманий кулаков - с эспандером',
      step: 10,
      refreshTime: 1 * TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
    },
    {
      id: 'fist-training',
      title: '💪 2-х минутная тренировка прочности костяшек кулаков',
      step: 20,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
      maxPerDay: 10,
    },
    {
      id: 'back-training',
      title:
        '💪 Тренировка мышц спины с 2 дисками по 2 кг - 3 подхода по 20 раз',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
    },
    {
      id: 'kegel-training',
      title: '💪 Упражнения кегеля 100 раз и ноги назад 100 раз каждая',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      id: 'elbow-up-downs',
      title: '💪 Вверх-вниз на коленях x100',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
    },
    {
      id: 'legs-statics',
      title: '💪 Держать ноги на весу - вперед и вбок 1 минуту',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 60 },
    },
    {
      id: 'protein',
      title: '🍹 Выпить стакан протеина после тренировки',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 10 },
    },

    //Растяжка
    {
      id: 'kitchen-stretching',
      title: '🥋 Сделать растяжку ног на кухне',
      step: 20,
      refreshTime: 20 * TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      maxPerDay: 2,
    },
    {
      id: 'carpet-stretching',
      title: '🥋 Сделать растяжку ног на коврике - с дисками гантелей',
      step: 50,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: 40 * TimeEnum.MINUTE,
      reward: { keyType: 0, amount: 1, xp: 125 },
      level: '🟦 125°',
      maxPerDay: 3,
    },
    {
      id: 'long-split',
      title:
        '🥋 Растяжка - продольный шпагат на полу - обе ноги по 2 минуты 2 подхода',
      step: 50,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: 40 * TimeEnum.MINUTE,
      reward: { keyType: 0, amount: 1, xp: 125 },
      level: '🟦 125°',
      maxPerDay: 3,
    },
    {
      id: 'transverse-split',
      title: '🥋 Растяжка - поперечный шпагат у стенки - 2 подхода по 4 минуты',
      step: 50,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: 40 * TimeEnum.MINUTE,
      reward: { keyType: 0, amount: 1, xp: 124 },
      level: '🟦🟡 124°',
      maxPerDay: 3,
    },

    //Ментальные упражнения
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
      id: 'memos-add-card',
      title: '❤️  Memos - добавить 1 карточку',
      step: 100,
      refreshTime: 0,
      respawnTime: TimeEnum.MINUTE,
      reward: { keyType: 0, amount: 1, xp: 40 },
      maxPerDay: 5,
    },
    {
      id: 'duolingo-japanese-practice',
      title: '🇯🇵 1 практика японского языка на дуолинго',
      step: 25,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: 12 * TimeEnum.HOUR,
      reward: { keyType: 0, amount: 2, xp: 12 },
      level: '⬜️🔵',
      maxPerDay: 5,
    },
    {
      id: 'duolingo-new-japanese-lesson',
      title: '🇯🇵 Сделать 1 новый урок японского на дуолинго',
      step: 25,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 2, xp: 20 },
      level: '⬜️🔵',
      maxPerDay: 5,
    },
    {
      id: 'finish-morsecode-level',
      title: '⛵️ Закончить уровень морязки',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
      maxPerDay: 5,
    },
    {
      id: 'rubics-cube',
      title: '🧠 Собрать кубик рубика',
      step: 50,
      refreshTime: 3 * TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      id: 'reading',
      title: '📖 Прочитать 1 главу книги',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 2, xp: 40 },
      maxPerDay: 10,
    },
    {
      id: 'raptorium',
      title: '🧑‍💻 Убить демона в Raptorium',
      step: 50,
      refreshTime: TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 20 },
    },
    {
      id: 'regexp',
      title: '🧑‍💻 Решить случайное regexp задание',
      step: 50,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 40 },
    },
    {
      id: 'chess-training',
      title: '🧠 Решить упражнение по шахматам на lichess.org (всего 10)',
      step: 10,
      refreshTime: 10 * TimeEnum.SECOND,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 10 },
    },

    //Хозяйственные активности
    {
      id: 'iron-clothes',
      title: '👕 Погладить вещи',
      step: 100,
      refreshTime: TimeEnum.SECOND,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 0, amount: 1, xp: 100 },
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
