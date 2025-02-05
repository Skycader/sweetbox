import { Component } from '@angular/core';
import { RangService } from '../../services/rang.service';
import { DialogRef } from '@angular/cdk/dialog';
import { keys } from '../../../sweetbox/resources/keys.resource';
import { StorageService } from '../../../storage/services/storage.service';

@Component({
  selector: 'app-new-rang',
  templateUrl: './new-rang.component.html',
  styleUrl: './new-rang.component.scss',
})
export class NewRangComponent {
  public rang = this.rangService.getRang();

  constructor(
    private rangService: RangService,
    private modalRef: DialogRef,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    const audio = new Audio(`assets/audio/level-up.mp3`);
    audio.volume = 1;
    audio.play();
  }

  close() {
    this.modalRef.close();
  }

  ngOnDestroy() {
    const audio = new Audio('assets/audio/close.mp3');
    audio.volume = 0.3;
    audio.play();
  }

  public gotReward = false;

  public getReward(element: any) {
    this.gotReward = true;

    this.storage.addItem(keys[0], 1);

    setTimeout(() => {
      let clonedElement = this.cloneElementById(element);

      element.style.opacity = 0;
      clonedElement.style.opacity = 1;
      clonedElement.style.position = 'fixed';
      clonedElement.style.opacity = 1;
      clonedElement.style.transitionDuration = '3s';
      clonedElement.classList.remove('hidden');
      setTimeout(() => {
        clonedElement.style.top = '-1000px';
        clonedElement.style.left =
          clonedElement.style.left.slice(0, -2) * 1 + 1000 + 'px';
        clonedElement.style.transform = 'scale(0) rotate(45deg)';

        setTimeout(() => {
          clonedElement.remove();
        }, 1000);

        setTimeout(() => {
          const audio = new Audio('assets/audio/mission-complete.mp3');
          audio.volume = 0.3;
          audio.play();
        });
      }, 100);
    });
  }

  public cloneElementById(element: any) {
    // Получаем элемент по ID
    const originalElement = element;
    if (!originalElement) {
      console.error(`Элемент с ID "${element}" не найден.`);
      return;
    }

    // Клонируем элемент
    const clonedElement: any = originalElement.cloneNode(true);

    // Удаляем ID у клонированного элемента, чтобы избежать конфликтов
    clonedElement.id = '-clone';
    clonedElement.style.zIndex = 1000;

    // Получаем координаты оригинального элемента
    const rect = originalElement.getBoundingClientRect();
    // Задаем стиль для абсолютного позиционирования
    clonedElement.style.position = 'absolute';
    clonedElement.style.top = `${rect.top + window.scrollY}px`; // Учитываем прокрутку
    clonedElement.style.left = `${rect.left + window.scrollX}px`; // Учитываем прокрутку

    // Добавляем клонированный элемент в корень документа
    document.body.appendChild(clonedElement);
    return clonedElement;
  }
}
