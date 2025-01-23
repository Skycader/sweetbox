import { Component } from '@angular/core';
import { StorageService } from '../../../storage/services/storage.service';
import { keys } from '../../../sweetbox/resources/keys.resource';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  constructor(private storageService: StorageService) { }

  public getKeys(keyType: number) {
    let amount = this.storageService.getItem(keys[keyType]);
    return amount || 0;
  }
}
