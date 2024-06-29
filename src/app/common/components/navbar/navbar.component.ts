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
  ) { }

  public openSideNav() {
    this.navbarService.openSideNav();
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }
}
