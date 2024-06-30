import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import { logOutAction } from '../../../auth/store/actions/log-out.action';
import { Observable, filter, map } from 'rxjs';
import { currentUserSelector } from '../../../auth/store/auth.selector';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInterface } from '../../../auth/models/user.model';
import { ProfileDtoInterface } from '../../../auth/models/profile.dto';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { getCurrentUserAction } from '../../../auth/store/actions/get-current-user.action';
import { patchCurrentUserAction } from '../../../auth/store/actions/patch-current-user.action';
import { notNull } from '../../../common/utils/operators/not-null.operator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  public currentUser$: Observable<UserInterface> = this.store.pipe(
    select(currentUserSelector),
    filter(notNull),
  );

  public currentUserForm$: Observable<FormGroup> = this.store.pipe(
    select(currentUserSelector),
    filter(notNull),
    map(
      (currentUser: UserInterface) =>
        new FormGroup({
          name: new FormControl(currentUser.name),
          surname: new FormControl(currentUser.surname),
          midname: new FormControl(currentUser.midname),
        }),
    ),
  );

  constructor(
    private store: Store<AppStateInterface>,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }

  public logOut() {
    this.store.dispatch(logOutAction());
  }

  public patchUser(profileDto: ProfileDtoInterface): void {
    this.store.dispatch(patchCurrentUserAction({ profileDto }));
  }

  public openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {
      autoFocus: false,
    });
  }
}
