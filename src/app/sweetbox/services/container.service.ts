import { Injectable } from '@angular/core';
import { commonContainer } from '../containers/common.config';
import { ItemModelInterface } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ContainerService {
  constructor() { }

  public generateContainer(cards: number) {
    const container: ItemModelInterface[] = [];
    while (cards--) {
      container.push(commonContainer.getRandomElement());
    }
    return container;
  }
}
