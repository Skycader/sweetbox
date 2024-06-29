import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { logOutAction } from '../../../auth/store/actions/log-out.action';
import { Observable, filter, map, skipWhile, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInterface } from '../../../auth/models/user.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { getCurrentUserAction } from '../../../auth/store/actions/get-current-user.action';
import { Actions, ofType } from '@ngrx/effects';
import {
  getUserAction,
  getUserSuccessAction,
} from '../../../auth/store/actions/get-user.action';
import { ProfileDtoInterface } from '../../../auth/models/profile.dto';
import {
  patchUserAction,
  patchUserSuccessAction,
} from '../../../auth/store/actions/patch-user.action';
import { currentUserSelector } from '../../../auth/store/auth.selector';
import { UserRolesEnum } from '../../../auth/models/role.enum';
import { User } from '../../../auth/models/user.class';
import { updateUserRoleAction } from '../../../auth/store/actions/update-role.action';
import { AppStateInterface } from '../../../models/app-state.model';

@Component({
  selector: 'app-user-card-dialog',
  templateUrl: './user-card-dialog.component.html',
  styleUrl: './user-card-dialog.component.scss',
})
export class UserCardDialogComponent {
  @Input() username: string = '';

  public Roles = UserRolesEnum;
  public currentUser$ = this.store.pipe(select(currentUserSelector));
  public selectedRole: UserRolesEnum = UserRolesEnum.User;
  public user$: Observable<UserInterface> = this.actions$.pipe(
    ofType(getUserSuccessAction, patchUserSuccessAction),
    map(({ user }) => user),
    tap((user: UserInterface) => (this.selectedRole = user.role)),
  );

  public setRole(role: UserRolesEnum) {
    this.selectedRole = role;
    this.store.dispatch(
      updateUserRoleAction({
        username: this.username,
        role: this.selectedRole,
      }),
    );
  }
  public currentUserForm$: Observable<FormGroup> = this.actions$.pipe(
    ofType(getUserSuccessAction),
    map(
      ({ user }) =>
        new FormGroup({
          name: new FormControl(user.name),
          surname: new FormControl(user.surname),
          midname: new FormControl(user.midname),
        }),
    ),
  );

  constructor(
    private store: Store<AppStateInterface>,
    private dialog: MatDialog,
    private actions$: Actions,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(getUserAction({ username: this.username }));
  }

  public logOut() {
    this.store.dispatch(logOutAction());
  }

  public patchUser(username: string, profileDto: ProfileDtoInterface): void {
    this.store.dispatch(patchUserAction({ username, profileDto }));
  }

  public openChangePasswordDialog() {
    const instance = this.dialog.open(ChangePasswordDialogComponent, {
      autoFocus: false,
    }).componentInstance;
    instance.username = this.username;
  }

  public close() {
    this.dialogRef.close();
  }
}
