import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  logInAction,
  logInActionFailure,
  logInActionSuccess,
} from '../actions/log-in.action';
import { catchError, map, of, repeat, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PersistanceService } from '../../../common/services/persistance.service';

import { Router } from '@angular/router';
import { logOutAction } from '../actions/log-out.action';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { SignInResponseInterface } from '../../models/sign-in-response.model';
import { UserInterface } from '../../models/user.model';
import { User } from '../../models/user.class';
import { GetUsersListResponseInterface } from '../../models/get-users-response.interface';
import {
  getUsersListAction,
  getUsersListFailureAction,
  getUsersListSuccessAction,
} from '../actions/get-users-list.action';

import {
  addUserAction,
  addUserFailureAction,
  addUserSuccessAction,
} from '../actions/add-user.action';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/get-current-user.action';
import {
  getUserAction,
  getUserFailureAction,
  getUserSuccessAction,
} from '../actions/get-user.action';
import {
  patchCurrentUserAction,
  patchCurrentUserFailureAction,
  patchCurrentUserSuccessAction,
} from '../actions/patch-current-user.action';
import {
  patchUserAction,
  patchUserFailureAction,
  patchUserSuccessAction,
} from '../actions/patch-user.action';
import {
  changeCurrentPasswordAction,
  changeCurrentPasswordFailureAction,
  changeCurrentPasswordSuccessAction,
} from '../actions/change-current-password.action';
import {
  changePasswordAction,
  changePasswordFailureAction,
  changePasswordSuccessAction,
} from '../actions/change-password.action';
import {
  updateUserRoleAction,
  updateUserRoleFailureAction,
  updateUserRoleSuccessAction,
} from '../actions/update-role.action';
import { LoadingBarService } from '../../../common/services/loading-bar.service';

@Injectable()
export class AuthEffect {
  logIn$ = createEffect(() =>
    this.action$.pipe(
      ofType(logInAction),
      tap(() => {
        this.loadingBarService.showLoading();
      }),
      switchMap(({ authCredentials }) => {
        return this.authService.logIn(authCredentials).pipe(
          map((response: SignInResponseInterface) => {
            this.persistance.setItem('accessToken', response.accessToken);
            this.snackBar.inform('Успешный вход');
            this.loadingBarService.hideLoading();
            return logInActionSuccess({ currentUser: new User() });
          }),
          catchError(() => {
            this.loadingBarService.hideLoading();
            this.snackBar.inform('Invalid auth credentials!');
            return of(logInActionFailure());
          }),
        );
      }),
    ),
  );

  signUp$ = createEffect(() =>
    this.action$.pipe(
      ofType(addUserAction),
      switchMap(({ authCredentials }) => {
        return this.authService.signUp(authCredentials).pipe(
          map(() => {
            return addUserSuccessAction();
          }),
        );
      }),
      catchError(() => {
        return of(addUserFailureAction());
      }),
    ),
  );

  logOut$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(logOutAction),
        tap(() => {
          this.authService.logOut();
          this.router.navigate(['/', 'auth']);
          this.snackBar.inform('Sign in success');
        }),
      ),
    {
      dispatch: false,
    },
  );

  getCurrentUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((currentUser: UserInterface) => {
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          }),
        );
      }),
    ),
  );

  getUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getUserAction),
      switchMap(({ username }) => {
        return this.authService.getUser(username).pipe(
          map((user: UserInterface) => {
            return getUserSuccessAction({ user });
          }),
          catchError(() => {
            this.snackBar.inform('Failed to fetch user data');
            return of(getUserFailureAction());
          }),
        );
      }),
    ),
  );

  patchUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(patchUserAction),
      switchMap(({ username, profileDto }) => {
        return this.authService.patchProfile(username, profileDto).pipe(
          map((user: UserInterface) => patchUserSuccessAction({ user })),
          tap(() => {
            this.snackBar.inform('Profile update success');
          }),
          catchError(() => {
            this.snackBar.inform('Error on saving profile');
            return of(patchUserFailureAction());
          }),
        );
      }),
    ),
  );

  patchCurrentUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(patchCurrentUserAction),
      switchMap(({ profileDto }) => {
        return this.authService.patchCurrentProfile(profileDto).pipe(
          map((user: UserInterface) => patchCurrentUserSuccessAction({ user })),
          tap(() => {
            this.snackBar.inform('Profile saved');
          }),
          catchError(() => {
            this.snackBar.inform('Profile saving failed');
            return of(patchCurrentUserFailureAction());
          }),
        );
      }),
    ),
  );

  getUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(getUsersListAction),
      switchMap(({ page }) => {
        return this.authService.getUsersList(page).pipe(
          map((usersList: GetUsersListResponseInterface) =>
            getUsersListSuccessAction({ usersList }),
          ),
          catchError(() => {
            this.snackBar.inform('Failed to fetch user');
            return of(getUsersListFailureAction);
          }),
        );
      }),
    ),
  );

  updateUserRole$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateUserRoleAction),
      switchMap(({ username, role }) => {
        return this.authService.updateRole(username, role).pipe(
          tap(() => {
            this.snackBar.inform('Role patched!');
          }),
          map(() => updateUserRoleSuccessAction()),
          catchError(() => {
            this.snackBar.inform('Failed to patch role');
            return of(updateUserRoleFailureAction());
          }),
        );
      }),
    ),
  );

  changePassword$ = createEffect(() =>
    this.action$.pipe(
      ofType(changePasswordAction),
      switchMap(({ username, password }) => {
        return this.authService.changePassword(username, password).pipe(
          tap(() => {
            this.snackBar.inform('Password changed!');
          }),
          map(() => changePasswordSuccessAction()),
          catchError(() => {
            this.snackBar.inform('Failed to change password');
            return of(changePasswordFailureAction());
          }),
        );
      }),
    ),
  );

  changeCurrentPassword$ = createEffect(() =>
    this.action$.pipe(
      ofType(changeCurrentPasswordAction),
      switchMap(({ password }) => {
        return this.authService.changeCurrentPassword(password).pipe(
          tap(() => {
            this.snackBar.inform('Password changed!');
          }),
          map(() => changeCurrentPasswordSuccessAction()),
          catchError(() => {
            this.snackBar.inform('Failed to change password');
            return of(changeCurrentPasswordFailureAction());
          }),
        );
      }),
    ),
  );

  redirectAfterLogin$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(logInActionSuccess),
        tap(() => {
          this.router.navigate(['/']);
        }),
      ),
    {
      dispatch: false,
    },
  );

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private persistance: PersistanceService,
    private snackBar: SnackbarService,
    private loadingBarService: LoadingBarService,
  ) { }
}
