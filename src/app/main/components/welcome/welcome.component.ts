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
      this.open = true;
    }
  }

  playFood() {
    var audio = new Audio('assets/audio/food.m4a');
    audio.play();
  }

  playSound() {
    this.count += 1;
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
