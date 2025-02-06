import { Component, Input } from '@angular/core';
import { Mission } from '../../services/mission.class';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss',
})
export class MissionComponent {
  @Input() mission!: Mission;
  @Input() unlockMission: boolean = false;

  public getReward(mission: any, element: any) {
    if (mission.isCompletedUntil <= Date.now()) return;
    setTimeout(() => {
      let clonedElement = this.cloneElementById(element);
      clonedElement.style.transitionDuration = '3s';
      clonedElement.classList.remove('hidden');
      setTimeout(() => {
        clonedElement.style.top = '0px';
        clonedElement.style.left =
          clonedElement.style.left.slice(0, -2) * 1 + 55 + 'px';
        clonedElement.style.transform = 'scale(0) rotate(45deg)';

        setTimeout(() => {
          clonedElement.remove();
        }, 1000);
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
