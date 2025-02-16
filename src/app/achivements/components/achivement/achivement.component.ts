import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-achivement',
  templateUrl: './achivement.component.html',
  styleUrl: './achivement.component.scss',
})
export class AchivementComponent {
  @Input() achivement: any;

  flipped = true;

  flip() {
    this.playSound();
    this.flipped = !this.flipped;
  }

  playSound() {
    var audio = new Audio('assets/audio/slip.mp3');
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 500);
  }
}
