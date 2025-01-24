import { Component } from '@angular/core';
import { PersistanceService } from '../../../common/services/persistance.service';
import { resourcesList } from '../../../sweetbox/resources/all.resource';
import { ItemModelInterface } from '../../../sweetbox/models/item.model';
import { StorageService } from '../../services/storage.service';
import { Subject, interval, mergeMap, of, switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss',
})
export class StorageComponent {
  public emitter$ = new Subject();
  public items = zip([this.emitter$]).pipe(
    switchMap(() => {
      return of(this.getItems());
    }),
  );

  ngOnInit() {
    const audio = new Audio(`assets/audio/storage.mp3`);
    audio.volume = 0.3;
    audio.play();
  }

  ngAfterViewInit() {
    this.emitter$.next(1);
  }

  getItems() {
    return Object.keys(this.persistance.getItem('storage')).map((key) => {
      return {
        title: key,
        key: key,
        amount: this.persistance.getItem('storage')[key],
        type: dict(
          resourcesList.find((resource) => resource.title === key)?.type,
        ),
        image: resourcesList.find((resource) => resource.title === key)?.image,
      };
    });
  }

  constructor(
    private persistance: PersistanceService,
    private storageService: StorageService,
  ) { }

  public takeOut(item: any) {
    const audio = new Audio(`assets/audio/takeout.mp3`);
    audio.volume = 0.3;
    audio.play();

    this.storageService.addItem(item as ItemModelInterface, -item.amount);
    this.emitter$.next(1);
  }

  public takeOutOne(item: any) {
    const audio = new Audio(`assets/audio/takeout.mp3`);
    audio.volume = 0.3;
    audio.play();

    this.storageService.addItem(item as ItemModelInterface, -1);
    this.emitter$.next(1);
  }
}

const dict = (type: any) => d[type];
const d: any = {
  common: 'Обычный предмет',
  food: 'Еда',
  rare: 'Редкий предмет',
  epic: 'Эпический предмет',
  legendary: 'Легендарный предмет',
};
