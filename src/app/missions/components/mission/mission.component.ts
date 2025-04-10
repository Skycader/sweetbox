import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Mission } from '../../services/mission.class';
import { NavbarService } from '../../../common/services/navbar.service';
import { SkinsListComponent } from '../skins-list/skins-list.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss',
})
export class MissionComponent {
  @Input() mission!: Mission;
  @Input() unlockMission: boolean = false;
  @Input() mining: boolean = false;

  constructor(
    private navbarService: NavbarService,
    private dialog: MatDialog,
  ) { }

  public showSkins() {
    this.dialog.open(SkinsListComponent, {
      width: '90vw',
    });
  }

  public remeainingTime() {
    let remainingTime = this.mission.getStats().isCompletedUntil - Date.now();

    if (remainingTime < 0) {
      remainingTime = this.mission.getStats().disabledUntil - Date.now();
    }

    if (remainingTime < 0) return '💪';

    return formatMilliseconds(remainingTime);
  }

  public earnXp() {
    this.navbarService.controlNavbar$.next('open');

    const combo = this.mission.getStats().onFire === 3 ? 2 : 1;
    this.animateXp(Math.floor((this.mission.getConfig().xp * combo) / 10));
  }

  public animateXp(amount: number = 1) {
    if (amount > 10) amount = 10;
    for (let i = 0; i < amount; i++) {
      setTimeout(
        () => {
          let clonedElement = this.copyElementToFixedPosition(
            `#M${this.mission.getConfig().hash}`,
          );
          clonedElement!.style.transitionDuration = '1.5s';
          clonedElement!.classList.remove('hidden');
          setTimeout(() => {
            const userXp = document.querySelector('#user-xp');
            const rect = userXp?.getBoundingClientRect();

            clonedElement!.style.top = rect?.top + 'px';
            clonedElement!.style.left = rect?.left + 'px';

            setTimeout(() => {
              clonedElement!.remove();
            }, 1500);
          }, 100);
        },
        200 + 200 * i,
      );
    }
  }

  public getReward(mission: any, element: any) {
    if (mission.isCompletedUntil <= Date.now()) return;
    setTimeout(() => {
      this.navbarService.controlNavbar$.next('open');
      let clonedElement = this.copyElementToFixedPosition2(element);
      clonedElement!.style.transitionDuration = '3s';
      clonedElement!.classList.remove('hidden');
      setTimeout(() => {
        const storageIcon = document.querySelector('#storage');
        const rect = storageIcon?.getBoundingClientRect();

        clonedElement!.style.top = -1500 + 'px';
        clonedElement!.style.left = rect!.left + 150 + 'px';
        clonedElement!.style.transform = 'scale(0) rotate(45deg)';

        setTimeout(() => {
          clonedElement!.remove();
        }, 3000);
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
    clonedElement.style.top = `${rect.top + window.scrollY}px`; // Учитываем прокрутку
    clonedElement.style.left = `${rect.left + window.scrollX}px`; // Учитываем прокрутку

    // Добавляем клонированный элемент в корень документа
    document.body.appendChild(clonedElement);
    return clonedElement;
  }

  public copyElementToFixedPosition(selector: string) {
    const originalElement = document.querySelector<HTMLElement>(selector);

    if (!originalElement) {
      console.error('Element not found');
      return;
    }

    // Получаем позицию элемента относительно окна
    const rect = originalElement.getBoundingClientRect();

    // Создаем новый элемент, который будет копией оригинала
    const copyElement = originalElement.cloneNode(true) as HTMLElement;

    // Устанавливаем ему стиль `fixed`
    copyElement.style.position = 'fixed';
    copyElement.style.top = `${rect.top}px`;
    copyElement.style.left = `${rect.left}px`;
    copyElement.style.zIndex = '9999'; // Можно настроить z-index по необходимости

    // Добавляем новый элемент в body (или другой контейнер)
    document.body.appendChild(copyElement);
    return copyElement;
  }

  public copyElementToFixedPosition2(originalElement: any) {
    if (!originalElement) {
      console.error('Element not found');
      return;
    }

    // Получаем позицию элемента относительно окна
    const rect = originalElement.getBoundingClientRect();

    // Создаем новый элемент, который будет копией оригинала
    const copyElement = originalElement.cloneNode(true) as HTMLElement;

    // Устанавливаем ему стиль `fixed`
    copyElement.style.position = 'fixed';
    copyElement.style.top = `${rect.top}px`;
    copyElement.style.left = `${rect.left}px`;
    copyElement.style.zIndex = '9999'; // Можно настроить z-index по необходимости

    // Добавляем новый элемент в body (или другой контейнер)
    document.body.appendChild(copyElement);
    return copyElement;
  }
}

function formatMilliseconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatNumber = (num: number): string => String(num).padStart(2, '0');

  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
    seconds,
  )}`;
}
