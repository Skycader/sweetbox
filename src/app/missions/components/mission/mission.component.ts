import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Mission } from '../../services/mission.class';
import { NavbarService } from '../../../common/services/navbar.service';
import { SkinsListComponent } from '../skins-list/skins-list.component';
import { MatDialog } from '@angular/material/dialog';
import { RangListComponent } from '../../../rangs/components/rang-list/rang-list.component';
import { RangService } from '../../../rangs/services/rang.service';
import { AudioService } from '../../../sweetbox/services/audio.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss',
  providers: [RangService],
})
export class MissionComponent {
  @Input() mission!: Mission;
  @Input() unlockMission: boolean = false;
  @Input() mining: boolean = false;

  constructor(
    private navbarService: NavbarService,
    private dialog: MatDialog,
    private rang: RangService,
    private audio: AudioService,
  ) { }

  public showLogoPath() {
    const dialog = this.dialog.open(RangListComponent, {
      data: {
        rang: this.rang,
      },
    });
    dialog.componentInstance.optionalSkillXp = this.mission.getStats().skillXp;

    dialog.componentInstance.optionalLogo = this.mission.getLogoById(
      this.mission.getConfig(),
    );
  }

  public showSkins() {
    this.dialog.open(SkinsListComponent, {
      width: '90vw',
    });
  }

  public remeainingTime = 'X';

  public makeReady() {
    this.mission.makeReady();
  }

  public earnXp() {
    this.navbarService.controlNavbar$.next('open');

    const totalXp =
      this.mission.getConfig().xp +
      this.mission.getStats().streak.days +
      (this.mission.getStats().earlyBirdBonus
        ? this.mission.getConfig().xp
        : 0) +
      (this.mission.getStats().onFire === 3 ? this.mission.getConfig().xp : 0) +
      (this.mission.getStats().doneToday >= 3
        ? this.mission.getConfig().xp
        : 0);

    this.animateXp(Math.floor(totalXp / 10));
    this.audio.playGainXp(totalXp);
  }

  public animateXp(amount: number = 1) {
    if (amount > 1000) amount = 1000;
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
