import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordInterface } from '../../models/change-password.model';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { isSubmittingSelector } from '../../../auth/store/auth.selector';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import {
  changeCurrentPasswordAction,
  changeCurrentPasswordSuccessAction,
} from '../../../auth/store/actions/change-current-password.action';
import { changePasswordAction } from '../../../auth/store/actions/change-password.action';
import { AppStateInterface } from '../../../models/app-state.model';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss',
})
export class ChangePasswordDialogComponent {
  @Input() username: string = '';

  public changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.min(5)]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.min(5),
    ]),
  });

  public success$ = this.actions$.pipe(
    ofType(changeCurrentPasswordSuccessAction),
    tap(() => {
      this.close();
    }),
  );

  public isSubmitting$ = this.store.select(isSubmittingSelector);

  constructor(
    private store: Store<AppStateInterface>,
    private dialogRef: DialogRef<ChangePasswordDialogComponent>,
    private snackBar: SnackbarService,
    private actions$: Actions,
  ) { }

  public submit(credentials: ChangePasswordInterface) {
    credentials.password === credentials.repeatPassword
      ? this.changePassword(credentials.password)
      : this.snackBar.inform('Пароли не совпадают!');
  }
  public changePassword(password: string) {
    this.username === ''
      ? this.store.dispatch(changeCurrentPasswordAction({ password }))
      : this.store.dispatch(
        changePasswordAction({ username: this.username, password }),
      );
  }

  public close() {
    this.dialogRef.close();
  }
}
