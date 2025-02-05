import { Component, Input } from '@angular/core';
import {
  CardModelInterface,
  ItemModelInterface,
} from '../../models/item.model';
import { ContainerService } from '../../services/container.service';
import { ContainerType } from '../../models/container.type';
import { containerEnum } from '../../models/container.enum';
import { containerColorEnum } from '../../models/container.enum';
import { StorageService } from '../../../storage/services/storage.service';
import { keys } from '../../resources/keys.resource';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemsDisplayComponent } from '../items-display/items-display.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss',
})
export class PackageComponent {
  @Input() containerType: ContainerType = 'common';
  @Input() keyType: number = 0;
  @Input() itemsAmount: number = 10;

  public debug = false;

  public isShowingPackage = false;
  public containerEnum = containerEnum;
  public containerColorEnum = containerColorEnum;
  public slider = 0; //material slider

  public iterator = 0;

  public items: CardModelInterface[] = [];

  public cards: ItemModelInterface[] = [];

  public getKeys() {
    let amount = this.storageService.getItem(keys[this.keyType]);
    return amount || 0;
  }

  constructor(
    private containerService: ContainerService,
    private storageService: StorageService,
    private snackbar: SnackbarService,
    private modal: MatDialog,
  ) { }

  addKey() {
    this.storageService.addItem(keys[this.keyType], 10);
  }

  public openContainer(openAll: boolean = false) {
    if (
      this.storageService.getItem(keys[this.keyType]) < 1 ||
      !this.storageService.getItem(keys[this.keyType])
    ) {
      this.snackbar.inform('Нет ключей!');
      return;
    }

    this.generateContainer(
      openAll ? this.getKeys() * this.itemsAmount : this.itemsAmount,
      this.containerType,
    );

    this.storageService.addItem(
      keys[this.keyType],
      openAll ? -this.getKeys() : -1,
    );

    console.log(this.items);

    this.isShowingPackage = !this.isShowingPackage;
    this.get();
    this.iterator = 0;
    this.slider = 0;
  }

  getStarImage() {
    return `url("assets/images/common/${this.containerType}-star.png")`;
  }

  displayItems(containerType: ContainerType) {
    this.modal.open(ItemsDisplayComponent, {
      autoFocus: false,
      height: '90vh',
      width: '1200px',
      data: { containerType },
    });
  }

  ngOnInit() {
    const audio = new Audio(`assets/audio/sweetbox.mp3`);
    audio.volume = 0.1;
    audio.play();
  }

  public generateContainer(cards: number, containerType: ContainerType) {
    this.cards = this.containerService.generateContainer(cards, containerType);

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
            amt: item.amt || 0,
            scale: item.scale,
            height: item.height,
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
      const currentItem = this.items[this.iterator];

      this.storageService.addItem(
        currentItem,
        currentItem.amount * (currentItem.amt ? currentItem.amt : 1),
      );

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
