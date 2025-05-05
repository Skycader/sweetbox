import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  ngOnInit() {
    const audio = new Audio('assets/audio/takeout.mp3');
    audio.play();
  }

  common_achivements = [
    {
      title: 'Цирк Уродов',
      statement: 'Закончить 1-ую книгу саги о Даррэне Шэне',
      achived: true,
      image: 'collectables/cirk_urodov.jpeg',
    },
    {
      title: 'Помощник Вампира',
      statement: 'Закончить 2-ую книгу саги о Даррэне Шэне',
      achived: true,
      image: 'collectables/vampire_assistant.jpeg',
    },
    {
      title: 'История Одного Вампира',
      statement: 'Закончить 3-ую книгу саги о Даррэне Шэне',
      achived: true,
      image: 'collectables/one_vampire_story.jpeg',
    },
    {
      title: 'Туннели Крови',
      statement: 'Закончить 4-ую книгу саги о Даррэне Шэне',
      achived: true,
      image: 'collectables/tunnels.jpeg',
    },
    {
      title: 'Гора Вампиров',
      statement: 'Закончить 5-ую книгу саги о Даррэне Шэне',
      achived: false,
      image: 'collectables/gora_vampirov.jpeg',
    },
  ];

  rare_achivements = [
    {
      title: 'Начало пути',
      statement: 'Закончить 2-ую (35) секцию японского из 5',
      achived: true,
      image: 'japanese_course_2_unit_finished.jpeg',
    },
    {
      title: 'За чертой смелости',
      statement: 'Закончить 3-ую (91) юнит японского из 5',
      achived: false,
      image: 'japanese_course_3_unit_finished.jpeg',
    },
    {
      title: 'Позади горы',
      statement: 'Закончить 4-ую (80) юнит японского из 5',
      achived: false,
      image: 'japanese_course_4_unit_finished.jpeg',
    },
  ];

  games = [
    {
      title: 'Tiny Bunny',
      statement: `
          🎮 ██▒▒▒▒▒▒▒
          🖼️ ██▒▒▒▒▒▒▒
          ⚙️  ██▒▒▒▒▒▒▒
          🕹️ ██▒▒▒▒▒▒▒
          🗺️ ██▒▒▒▒▒▒▒
          📖 ██▒▒▒▒▒▒▒
          🔉 ██▒▒▒▒▒▒▒
          🎧 ██▒▒▒▒▒▒▒
`,
      achived: false,
      image: 'games/tiny-bunny.jpeg',
    },
  ];

  challanges = [
    {
      title: 'Yamato Starship UGF',
      statement: 'Учи японский в поте лица (18 000 EXP / Month)',
      achived: true,
      image: 'yamato.jpeg',
    },
    {
      title: 'UGF CITHADEL',
      statement: 'Читай книги в поте лица (112 000 EXP / Month)',
      achived: false,
      image: 'cithadel.jpeg',
    },
    {
      title: 'Subway Surfers',
      statement: 'Работай ножками, вложено 10 000 EXP за неделю',
      achived: false,
      image: 'game.jpeg',
    },
  ];

  achivements = [
    {
      title: 'Начинающий боец',
      statement: 'Получить синий пояс',
      achived: false,
      image: 'blue_belt.jpeg',
    },
    {
      title: 'Продвинутый боец',
      statement: 'Получить желтый пояс',
      achived: false,
      image: 'yellow_belt.jpeg',
    },
    {
      title: 'Опытный боец',
      statement: 'Получить зеленый пояс',
      achived: false,
      image: 'green_belt.jpeg',
    },
    {
      title: 'Профессиональный боец',
      statement: 'Получить коричневый пояс',
      achived: false,
      image: 'brown_belt.jpeg',
    },
    {
      title: 'Мастер боевых искусств',
      statement: 'Получить черный пояс',
      achived: false,
      image: 'black_belt.jpeg',
    },
    {
      title: 'Завидная гибкость',
      statement: 'Сесть на полный шпагат',
      achived: false,
      image: 'full_split.jpeg',
    },
    {
      title: 'Непревзойденный силач',
      statement: 'Отжаться 100 раз за 5 минут',
      achived: false,
      image: 'full_power.jpeg',
    },
    {
      title: 'Железные кулаки',
      statement: 'Не ощущать боль при отжимании на стальном листе',
      achived: false,
      image: 'iron_fists.jpeg',
    },
    {
      title: 'Стальные ноги',
      statement: 'Сделать 1 000 икроножных приседаний за час',
      achived: false,
      image: 'iron_legs.jpeg',
    },
    {
      title: 'Мышечная масса',
      statement: 'Набрать вес в 80 кг',
      achived: false,
      image: 'full_weight.jpeg',
    },
    {
      title: 'Железный хват',
      statement: 'Сделать 1 000 сжиманий эспандера в режиме 60 кг',
      achived: false,
      image: 'iron_hands.jpeg',
    },
    {
      title: 'The World!',
      statement: 'Продержаться в планке 60 минут',
      achived: false,
      image: 'za_warudo.jpeg',
    },
    //
    {
      title: 'Чемпион арены',
      statement: 'Занять первое место в соревнованиях по каратэ',
      achived: false,
      image: 'arena_champion.jpeg',
    },
    {
      title: 'Стальной пресс',
      statement: 'Сделать 1 000 скручиваний подряд',
      achived: false,
      image: 'iron_abs.jpeg',
    },
    {
      title: 'Сила двух сотен',
      statement: 'Боксировать на протяжении 60 минут без остановки',
      achived: false,
      image: 'full_stamina.jpeg',
    },
    {
      title: 'Кофеин',
      statement: 'Закончить курс по Java от Skillbox',
      achived: false,
      image: 'java_hero.jpeg',
    },
    {
      title: 'Листопад',
      statement: 'Сделать копию GetContact на Spring фреймворке',
      achived: false,
      image: 'spring_framework.jpeg',
    },
    {
      title: 'Укратитель львов',
      statement: 'Сделать копию GetContact на Nest.JS фреймворке',
      achived: false,
      image: 'nest_framework.jpeg',
    },
    {
      title: 'Путь самурая',
      statement: 'Закончить курс японского на дуолинго',
      achived: false,
      image: 'japanese_hero.jpeg',
    },
    {
      title: '... --- ...',
      statement: 'Освоить морзянку на высшем уровне',
      achived: false,
      image: 'morse_expert.jpeg',
    },

    {
      title: 'Книжный червь',
      statement: 'Прочитать 1 000 книг',
      achived: false,
      image: 'book_magic.jpeg',
    },

    {
      title: 'Гонщик',
      statement: 'Получить права',
      achived: false,
      image: 'racer.jpeg',
    },
    {
      title: 'Истинный воин',
      statement: 'Получить все достижения',
      achived: false,
      image: 'true_warrior.jpeg',
    },
  ];
}
