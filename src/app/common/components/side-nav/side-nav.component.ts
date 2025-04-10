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
          title: 'Импорт',
          method: this.importLocalStorage,
        },
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

  public importLocalStorage() {
    importJSONToLocalStorage();
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

// Функция для импорта данных в localStorage
function importJSONToLocalStorage() {
  // Создаем динамический input элемент
  const inputElement: HTMLInputElement = document.createElement('input');
  inputElement.type = 'file';

  // Обработчик события 'change'
  inputElement.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement;
    const fileList: FileList | null = target.files;

    if (fileList && fileList.length > 0) {
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const localStorageData = JSON.parse(event.target?.result as string);
            for (const key in localStorageData) {
              if (localStorageData.hasOwnProperty(key)) {
                localStorage.setItem(key, localStorageData[key]);
              }
            }
            console.log('Данные успешно импортированы в localStorage.');
          } catch (error) {
            console.error('Ошибка при импорте данных:', error);
          }
        };
        reader.readAsText(file);
      } else {
        console.warn('Пожалуйста, выберите файл для загрузки.');
      }
    }
  });

  // Программно вызываем клик на элементе input
  inputElement.click();
}
