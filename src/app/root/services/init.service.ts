import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../models/app-state.model';
import { getCurrentUserAction } from '../../auth/store/actions/get-current-user.action';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  constructor(private store: Store<AppStateInterface>) {
    this.store.dispatch(getCurrentUserAction());
  }
}
