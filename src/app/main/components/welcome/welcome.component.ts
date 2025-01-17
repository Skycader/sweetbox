import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  public open = false;
  public hasCard = false;
  public remove = false;
  public count = 0;
  public slider = 0;

  public iterator = 0;

  public items: any[] = [];

  initialize() {
    this.items = [
      {
        id: 1,
        title: 'Volt - Lime',
        sound: 'water.m4a',
        type: 'rare',
        img: 'assets/images/products/volt-lime.png',
        opened: false,
        removed: false,
        showTitle: false,
      },
      {
        id: 1,
        title: 'Деньги - 500 рублей',
        sound: 'money.m4a',
        type: 'rare',
        img: 'assets/images/money/500.jpg',
        opened: false,
        removed: false,
        showTitle: false,
      },

      {
        id: 1,
        title: 'Деньги - 10 рублей',
        sound: 'money.m4a',
        type: 'rare',
        img: 'assets/images/money/10.jpg',
        opened: false,
        removed: false,
        showTitle: false,
      },
      {
        id: 1,
        title: '500 танкоинов',
        type: 'gold',
        img: 'assets/images/legendary/tancoins.png',
        sound: 'legendary.m4a',
        opened: false,
        removed: false,
        showTitle: false,
      },
      {
        id: 2,
        title: 'Зеленый Горошек',
        img: 'assets/images/products/peas.png',
        sound: 'food.m4a',
        opened: false,
        removed: false,
        showTitle: false,
      },

      {
        id: 2,
        title: 'Шоколадное мороженое',
        img: 'assets/images/products/ice-cream.png',
        sound: 'food.m4a',
        opened: false,
        removed: false,
      },

      {
        id: 2,
        title: 'Батарейка',
        img: 'assets/images/energy/battery.png',
        sound: 'energy.m4a',
        opened: false,
        removed: false,
      },

      {
        id: 2,
        title: 'Молочный напиток',
        img: 'assets/images/products/chocolate-drink.png',
        sound: 'food.m4a',
        opened: false,
        removed: false,
      },
    ];
  }

  iterate() {
    this.playSound();
    if (this.items[this.iterator]) {
      this.playAudio(this.items[this.iterator].sound);
      this.items[this.iterator].opened = true;
      let copy = this.iterator;
      setTimeout(() => {
        this.items[copy].showTitle = true;
      }, 1000);
    }
    if (this.iterator > 0) {
      this.items[this.iterator - 1].removed = true;
      this.items[this.iterator - 1].showTitle = false;
    }

    this.iterator++;

    if (this.iterator === this.items.length + 1) {
      setTimeout(() => {
        this.hasCard = false;
      }, 800);
    }
  }

  public slide(event: any) {
    if (this.slider === 0) {
      var audio = new Audio('assets/audio/paper.mp3');
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 1000);
    }
    if (this.slider === 100) {
      this.playSound();
      this.iterate();
    }
  }

  playFood() {
    var audio = new Audio('assets/audio/food.m4a');
    audio.play();
  }

  playAudio(name: string) {
    var audio = new Audio(`assets/audio/${name}`);
    audio.play();
  }

  playSound() {
    var audio = new Audio('assets/audio/slip.mp3');
    audio.play();

    setTimeout(() => {
      if (this.count === 1) this.playFood();
    }, 1000);
    setTimeout(() => {
      audio.pause();
    }, 500);

    if (this.count > 1) {
      var audio2 = new Audio('assets/audio/special.m4a');
      audio2.play();
    }
  }

  get() {
    var audio = new Audio('assets/audio/pull.mp3');
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1000);
  }
}
