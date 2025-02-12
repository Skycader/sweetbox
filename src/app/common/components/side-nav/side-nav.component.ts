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
  method?: any;
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
      title: 'База данных',
      items: [
        {
          icon: 'grade',
          title: 'Экспорт',
          method: this.exportLocalStorage,
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
  ) { }

  public closeSideNav() {
    this.navbarService.closeSideNav();
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }

  public exportLocalStorage() {
    downloadLocalStorageAsJSON();
  }
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
