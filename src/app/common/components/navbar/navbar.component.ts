import { Component, HostListener } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { ThemeService } from '../../services/theme.service';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import {
  isAnonymousSelector,
  isLoggedInSelector,
} from '../../../auth/store/auth.selector';
import { Observable, interval, of, switchMap, tap } from 'rxjs';
import { MissionsService } from '../../../missions/services/missions.service';
import { PersistanceService } from '../../services/persistance.service';
import { StorageService } from '../../../storage/services/storage.service';
import { RangService } from '../../../rangs/services/rang.service';
import { CommonMissions } from '../../../missions/services/common-missions.list';
import { CompletedPipe } from '../../../missions/utils/pipes/completed.pipe';
import { Streak } from '../../../missions/models/streak.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public currentScroll: number = 0;
  public hideNavbar: boolean = false;

  public isLoggedIn: Observable<boolean | null> = this.store.pipe(
    select(isLoggedInSelector),
  );
  public isAnonymous: Observable<boolean | null> = this.store.pipe(
    select(isAnonymousSelector),
  );

  @HostListener('window:scroll', ['$event.target'])
  onScroll() {
    this.hideNavbar =
      window.scrollY > this.currentScroll && this.currentScroll > 56
        ? true
        : false;
    this.currentScroll = window.scrollY;
  }

  public navbarControl$ = this.navbarService.controlNavbar$.pipe(
    tap((command) => {
      if (command === 'open') this.hideNavbar = false;
      if (command === 'close') this.hideNavbar = true;
    }),
  );

  constructor(
    private navbarService: NavbarService,
    public themeService: ThemeService,
    private store: Store<AppStateInterface>,
    private missions: MissionsService,
    private persistance: PersistanceService,
    private storage: StorageService,
    private rang: RangService,
    private common: CommonMissions,
  ) { }

  showRangs() {
    this.rang.showRangs();
  }

  congrats() {
    this.rang.congratsOnNewRang();
  }

  nextRangProgress() {
    return this.rang.nextRangProgress();
  }

  getRang() {
    return this.rang.getRang();
  }

  getNextRangXp() {
    return this.rang.getNextRangXp();
  }

  getXp() {
    return this.rang.getXp();
  }
  loadMission(id: string): any {
    const missions = this.persistance.getItem('missions');
    return missions[id];
  }

  getMissions() {
    return -1;
    return CompletedPipe.countPending(this.persistance.getItem('missions'));
  }

  getItems() {
    return this.storage.getDiverseItems();
  }

  public openSideNav() {
    this.navbarService.openSideNav();
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }

  public streak = Streak.getStreak().days;
  public doneToday = Streak.getStreak().doneToday;

  public xpToday = this.persistance.getItem('xp-today', 0);

  public dailyRefresh$ = interval(1000).pipe(
    tap(() => {
      this.streak = Streak.getStreak().days;
      this.doneToday = Streak.getStreak().doneToday;
      this.xpToday = this.persistance.getItem('xp-today', 0);

      const today = new Date().toISOString().split('T')[0]; //2025-01-27

      if (!this.persistance.getItem('today'))
        this.persistance.setItem('today', today);

      const localDate = this.persistance.getItem('today');

      if (localDate !== today) {
        //Начался новый день

        downloadLocalStorageAsJSON();

        this.persistance.setItem('xp-today', '0');

        if (!this.persistance.getItem('streak'))
          this.persistance.setItem('streak', new Streak(0, false));
        const streak: Streak = this.persistance.getItem('streak');

        //Если сегодня не был продлён страйк, обнулить дни
        if (streak.doneToday === false) streak.days = 0;
        streak.doneToday = false;
        this.persistance.setItem('streak', streak);

        this.persistance.setItem('today', today);

        location.reload();
      }
    }),
    switchMap(() => {
      return of(true);
    }),
  );
}

function downloadLocalStorageAsJSON(
  filename: string = 'localStorageData.json',
) {
  const localStorageData: { [key: string]: string } = {};

  // Извлекаем данные из localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== null) {
      localStorageData[key] = localStorage.getItem(key) as string;
    }
  }

  // Преобразуем объект в JSON-строку
  const jsonContent = JSON.stringify(localStorageData, null, 2);

  // СоздаемBlob и ссылку для скачивания
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Создаем временный элемент a для скачивания
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  // Добавляем элемент в DOM, инициируем клик и удаляем элемент
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Освобождаем URL-объект
  URL.revokeObjectURL(url);
}
