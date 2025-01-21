import { Injectable } from '@angular/core';
import { ItemModelInterface } from '../../sweetbox/models/item.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { }

  addItem(item: ItemModelInterface) { }
}
