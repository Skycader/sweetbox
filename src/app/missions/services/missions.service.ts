import { Injectable } from '@angular/core';
import { PersistanceService } from '../../common/services/persistance.service';
import { StorageService } from '../../storage/services/storage.service';
import { RangService } from '../../rangs/services/rang.service';
import { Mission } from './mission.class';
import { NotificationService } from '../../common/services/notification.service';
import { SnackbarService } from '../../common/services/snackbar.service';

export interface MissionConfig {
  id: string;
  title: string;
  skin?: string;
  step: number;
  refreshTime: number;
  respawnTime: number;
  maxPerDay?: number;
  reward: Reward;
  autocomplete?: boolean;
  level?: string;
  openHours?: [number, number];
  maxHearts?: number;
}

interface Reward {
  keyType: number;
  amount: number;
  xp: number;
}

@Injectable({
  providedIn: 'root',
})
export class MissionsService {
  constructor(
    private persistance: PersistanceService,
    private storage: StorageService,
    private rang: RangService,
    private notification: NotificationService,
    private snackbar: SnackbarService,
  ) { }

  public make(config: MissionConfig) {
    if (!config?.autocomplete) config.autocomplete = false;
    return new Mission(config, {
      rang: this.rang,
      persistance: this.persistance,
      storage: this.storage,
      notification: this.notification,
      snackbar: this.snackbar,
    });
  }
}
