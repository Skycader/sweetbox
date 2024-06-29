import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  public get loading$() {
    return of(this._loading$.getValue());
  }
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  public query$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  public showLoading() {
    this._loading$.next(true);
    this.query$.next(false);
  }

  public hideLoading() {
    this._loading$.next(false);
    this.query$.next(true);
    setTimeout(() => {
      this.query$.next(false);
    }, 1000);
  }
}
