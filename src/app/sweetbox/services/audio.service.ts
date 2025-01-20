import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor() { }

  playSound(fileName: string, stopAfter: number = 0) {
    const audio = new Audio(`assets/audio/${fileName}`);
    audio.play();

    if (stopAfter) {
      setTimeout(() => {
        audio.pause();
      }, stopAfter);
    }
  }
}
