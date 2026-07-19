import { Injectable } from '@angular/core';
import { Mission } from './mission.class';
import { MissionConfig, MissionsService } from './missions.service';
import { TimeEnum } from '../models/time.list.enum';
import { SkinsEnum } from '../models/skins.enum';

@Injectable({
  providedIn: 'root',
})
export class CommonMissions {
  constructor(private mission: MissionsService) {}

  getIncomeLevel(income: number) {
    return Math.ceil(Math.log2(income / 100000)) - 1;
  }

  private commonMissions: MissionConfig[] = [
    {
      id: 'everyday-hero',
      title: '✨ 🍫 🍰 🍬 Пряничное оформление 🍫 🍰 🍬',
      step: 100,
      skin: SkinsEnum[4],
      refreshTime: TimeEnum.DAY,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 1, amount: 5, xp: 1000 },
      autocomplete: true,
    },
    {
      id: 'duolingo-german',
      title: '🇩🇪 Сделать урок немецкого',
      step: 100,
      maxPerDay: 1,
      refreshTime: 3 * TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 5, amount: 1, xp: 100 },
      logo: {
        path: 'TH/Town_Hall$',
        size: 50,
        levels: 17,
        moveUp: 15,
      },
    },
    {
      id: 'walk-time',
      title: '🦶 Прогулка - 3 000 шагов',
      step: 100,
      maxPerDay: 1,
      refreshTime: 3 * TimeEnum.HOUR,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 5, amount: 1, xp: 100 },
      logo: {
        path: 'TH/Town_Hall$',
        size: 50,
        levels: 17,
        moveUp: 15,
      },
    },
    {
      id: 'magnium-vitamins',
      title: '💊 Выпить магний',
      step: 100,
      refreshTime: 0,
      respawnTime: 24 * TimeEnum.HOUR,
      reward: { keyType: 5, amount: 1, xp: 100 },

      openHours: [0, 24],
    },
    {
      id: 'd-vitamins',
      title: '💊 Выпить витамин Д',
      step: 100,
      refreshTime: 0,
      respawnTime: 24 * TimeEnum.HOUR,
      reward: { keyType: 5, amount: 1, xp: 100 },
      openHours: [0, 24],
    },
    {
      id: 'clean-memos',
      title: '🔄 Memos - повторить 10 карточек',
      step: 100,
      refreshTime: 0,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 5, amount: 1, xp: 100 },
      maxPerDay: 5,
      logo: {
        path: 'TH/Town_Hall$',
        size: 50,
        levels: 17,
        moveUp: 15,
      },
    },

    //Силовые упражнения
    {
      id: 'push-ups',
      title: '💪 Сделать 10 отжиманий',
      step: 100,
      refreshTime: 0,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 5, amount: 1, xp: 100 },
      stars: 1, //за каждые 20 отжиманий (20/100 => 10/50 => 1/5)
      logo: {
        path: 'TH/Town_Hall$',
        size: 50,
        levels: 17,
        moveUp: 15,
      },
    },
    {
      id: 'abs',
      title: '💪 Сделать 100 мини-скручиваний',
      step: 100,
      refreshTime: TimeEnum.MINUTE,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 5, amount: 1, xp: 100 },
      stars: 1, //сделать 500 мини-скручиваний за 1 проход - 5 звёзд
      logo: {
        path: 'TH/Town_Hall$',
        size: 50,
        levels: 17,
        moveUp: 15,
      },
    },

    //Ментальные упражнения
    {
      id: 'memos-add-card',
      title: '📔✍️  Memos - добавить 1 карточку',
      step: 100,
      refreshTime: 0,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 5, amount: 1, xp: 100 },
      maxPerDay: 20,
      logo: {
        path: 'TH/Town_Hall$',
        size: 50,
        levels: 17,
        moveUp: 15,
      },
    },
    {
      id: 'finish-morsecode-level',
      title: '⛵️ Закончить уровень морязки',
      step: 100,
      refreshTime: 0,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 5, amount: 1, xp: 100 },
      maxPerDay: 5,
      logo: {
        path: 'TH/Town_Hall$',
        size: 50,
        levels: 17,
        moveUp: 15,
      },
      stars: 1, //(15/30 WPM + 3/40 SPM)/2 => 0.2875 (каждые 20% = 1 звезда навыка)
      //WPM = words per minute, rather sounds per second such as . or -
      //SPM => spaces per minute, i.e. the pause in ms between letters such as (...) or (---)
    },

    {
      id: 'regexp',
      title: '🧑‍💻 Решить случайное regexp задание',
      step: 50,
      refreshTime: 0,
      respawnTime: TimeEnum.DAY,
      reward: { keyType: 5, amount: 1, xp: 100 },
      stars: 3,
      logo: {
        path: 'TH/Town_Hall$',
        size: 50,
        levels: 17,
        moveUp: 15,
      },
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
