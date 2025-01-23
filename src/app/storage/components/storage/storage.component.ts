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
      image: resourcesList.find((resource) => resource.title === key)?.image,
    };
  });

  constructor(private persistance: PersistanceService) { }
}
