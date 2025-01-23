import { Component } from '@angular/core';
import { PersistanceService } from '../../../common/services/persistance.service';
import { resourcesList } from '../../../sweetbox/resources/all.resource';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss',
})
export class StorageComponent {
  public storage = this.persistance.getItem('storage');
  public items = Object.keys(this.storage).map((key) => {
    return {
      key: key,
      amount: this.storage[key],
      type: dict(
        resourcesList.find((resource) => resource.title === key)?.type,
      ),
      image: resourcesList.find((resource) => resource.title === key)?.image,
    };
  });

  constructor(private persistance: PersistanceService) { }
}

const dict = (type: any) => d[type];
const d: any = {
  common: 'Обычный предмет',
  food: 'Еда',
  rare: 'Редкий предмет',
  epic: 'Эпический предмет',
  legendary: 'Легендарный предмет',
};
