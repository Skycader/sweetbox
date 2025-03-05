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
  ];
}
