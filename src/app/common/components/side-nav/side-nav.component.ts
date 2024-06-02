import { Component, HostListener } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { map, of, switchMap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../../services/theme.service';

interface NavGroup {
  icon: string;
  title: string;
  items: NavItem[];
}

interface NavItem {
  icon: string;
  title: string;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  public recentArticles$ = of([]);

  public groups: NavGroup[] = [
    {
      icon: 'flag',
      title: 'Some group',
      items: [
        {
          icon: 'grade',
          title: 'Some item',
        },
        {
          icon: 'grade',
          title: 'Some item',
        },

        {
          icon: 'grade',
          title: 'Some item',
        },
      ],
    },
    {
      icon: 'flag',
      title: 'Some group',
      items: [
        {
          icon: 'grade',
          title: 'Some item',
        },
        {
          icon: 'grade',
          title: 'Some item',
        },
      ],
    },
  ];

  public get isSideNav() {
    return this.navbarService.isSideNav;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent,
  ) {
    this.closeSideNav();
  }

  constructor(
    private http: HttpClient,
    private navbarService: NavbarService,
    public readonly themeService: ThemeService,
  ) {}

  public closeSideNav() {
    this.navbarService.closeSideNav();
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }
}
