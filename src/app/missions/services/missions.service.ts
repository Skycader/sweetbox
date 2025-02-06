import { Injectable } from '@angular/core';
import { PersistanceService } from '../../common/services/persistance.service';
import { StorageService } from '../../storage/services/storage.service';
import { RangService } from '../../rangs/services/rang.service';
import { Mission } from './mission.class';

export interface MissionConfig {
  title: string;
  step: number;
  refreshTime: number;
  respawnTime: number;
  reward: Reward;
  autocomplete?: boolean;
  level?: string;
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
  ) { }

  public make(config: MissionConfig) {
    if (!config?.autocomplete) config.autocomplete = false;
    return new Mission(config, {
      rang: this.rang,
      persistance: this.persistance,
      storage: this.storage,
    });
  }
}
