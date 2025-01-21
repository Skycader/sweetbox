import { Component, Input } from '@angular/core';
import {
  CardModelInterface,
  ItemModelInterface,
} from '../../models/item.model';
import { ContainerService } from '../../services/container.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss',
})
export class PackageComponent {
  public isShowingPackage = false;
  public slider = 0; //material slider

  public iterator = 0;

  public items: CardModelInterface[] = [];

  public cards: ItemModelInterface[] = [];

  constructor(private containerService: ContainerService) { }

  public openContainer() {
    this.generateContainer(10);

    this.isShowingPackage = !this.isShowingPackage;
    this.get();
    this.iterator = 0;
    this.slider = 0;
  }

  public generateContainer(cards: number) {
    this.cards = this.containerService.generateContainer(cards);

    const accumulator = this.cards
      .map((card) => {
        return {
          ...card,
          isRemoved: false,
          isShowingTitle: false,
          isTaken: false,
          amount: 0,
        };
      })
      .reduce((acc: any, item) => {
        const key = item.title;

        if (!acc[key]) {
          // Если ключа еще нет, добавляем его с начальным значением
          acc[key] = {
            title: item.title,
            image: item.image,
            sound: item.sound,
            type: item.type,
            amount: 0,
          };
        }

        // Увеличиваем количество
        acc[key].amount++;
        return acc;
      }, {});

    this.items = Object.values(accumulator);
  }

  iterate() {
    this.playSound();
    if (this.items[this.iterator]) {
      this.playAudio(this.items[this.iterator].sound);
      this.items[this.iterator].isTaken = true;
      let copy = this.iterator;
      setTimeout(() => {
        this.items[copy].isShowingTitle = true;
      }, 1000);
    }
    if (this.iterator > 0) {
      this.items[this.iterator - 1].isRemoved = true;
      this.items[this.iterator - 1].isShowingTitle = false;
    }

    this.iterator++;

    if (this.iterator === this.items.length + 1) {
      setTimeout(() => {
        this.isShowingPackage = false;
        this.items = [];
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
      audio.pause();
    }, 500);
  }

  get() {
    var audio = new Audio('assets/audio/pull.mp3');
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 1000);
  }
}