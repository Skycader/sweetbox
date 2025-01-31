import { Component, HostListener } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { ThemeService } from '../../services/theme.service';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import {
  isAnonymousSelector,
  isLoggedInSelector,
} from '../../../auth/store/auth.selector';
import { Observable } from 'rxjs';
import { MissionsService } from '../../../missions/services/missions.service';
import { PersistanceService } from '../../services/persistance.service';
import { StorageService } from '../../../storage/services/storage.service';
import { RangService } from '../../../rangs/services/rang.service';
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

  constructor(
    private navbarService: NavbarService,
    public themeService: ThemeService,
    private store: Store<AppStateInterface>,
    private missions: MissionsService,
    private persistance: PersistanceService,
    private storage: StorageService,
    private rang: RangService,
  ) { }

  showRangs() {
    this.rang.showRangs();
  }

  congrats() {
    this.rang.congratsOnNewRang();
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
  loadMission(title: string): any {
    const missions = this.persistance.getItem('missions');
    return missions[title];
  }

  getMissions() {
    let count = 0;
    Object.keys(JSON.parse(localStorage.getItem('missions') || '[]')).forEach(
      (mission) => {
        if (this.loadMission(mission).isCompletedUntil < Date.now()) count++;
      },
    );

    return count;
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
}
