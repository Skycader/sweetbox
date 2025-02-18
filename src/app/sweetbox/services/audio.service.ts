import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor() {}

  playSound(fileName: string, stopAfter: number = 0) {
    const audio = new Audio(`assets/audio/${fileName}`);
    audio.play();

    if (stopAfter) {
      setTimeout(() => {
        audio.pause();
      }, stopAfter);
    }
  }

  playGainXp(xp: number = 1) {
    xp = Math.floor(xp / 20);
    if (xp > 5) xp = 5;
    if (xp < 1) xp = 1;
    for (let i = 0; i < xp; i++) {
      setTimeout(() => {
        const audio = new Audio(`assets/audio/xp/${getRandomInt(1, 5)}.mp3`);
        audio.play();
      }, 500 * i);
    }
  }
}

function getRandomInt(min: number, max: number): number {
  // Убедимся, что min и max - целые числа
  min = Math.ceil(min);
  max = Math.floor(max);

  // Генерируем случайное целое число в диапазоне [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
