import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  achivements = [
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
      title: 'Начинающий боец',
      statement: 'Получить синий пояс',
      achived: false,
      image: 'blue_belt.jpeg',
    },
    {
      title: 'Железные кулаки',
      statement: 'Не ощущать боль при отжимании на стальном листе',
      achived: false,
      image: 'iron_fists.jpeg',
    },
    {
      title: 'Кофеин',
      statement: 'Закончить курс по Java от Skillbox',
      achived: false,
      image: 'java_hero.jpeg',
    },
    {
      title: 'Начинающий анимешник',
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
      title: 'The World!',
      statement: 'Продержаться в планке 25 минут',
      achived: false,
      image: 'za_warudo.jpeg',
    },
    {
      title: 'Книжный червь',
      statement: 'Прочитать 1 000 книг',
      achived: false,
      image: 'book_magic.jpeg',
    },
    {
      title: 'Стальные ноги',
      statement: 'сделать 1 000 приседаний на стопе за час',
      achived: false,
      image: 'iron_legs.jpeg',
    },
    {
      title: 'Гонщик',
      statement: 'Получить права',
      achived: false,
      image: 'racer.jpeg',
    },
    {
      title: 'Чемпион арены',
      statement: 'Занять первое место в соревнованиях по каратэ',
      achived: false,
      image: 'arena_champion.jpeg',
    },
    {
      title: 'Мастер спорта',
      statement: 'Получить черный пояс',
      achived: false,
      image: 'black_belt.jpeg',
    },

    {
      title: 'Железный хват',
      statement: 'Сделать 1 000 сжиманий эспандера в режиме 60 кг',
      achived: false,
      image: 'iron_hands.jpeg',
    },
    {
      title: 'Стальной пресс',
      statement: 'Сделать 1 000 скручиваний подряд',
      achived: false,
      image: 'iron_abs.jpeg',
    },
    {
      title: 'Мышечная масса',
      statement: 'Набрать вес в 80 кг',
      achived: false,
      image: 'full_weight.jpeg',
    },
  ];
}
