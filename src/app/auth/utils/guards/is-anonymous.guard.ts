import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, skipWhile, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import {
  isAnonymousSelector,
  isLoggedInSelector,
} from '../../store/auth.selector';

@Injectable()
export class IsAnonymousGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private store: Store<AppStateInterface>,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.store.pipe(
      select(isAnonymousSelector),
      tap((isAnonymous) => {
        if (!isAnonymous) this.router.navigate(['/', 'profile']);
      }),
    );
  }
}
