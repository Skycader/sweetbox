import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordInterface } from '../../models/change-password.model';
import { SnackbarService } from '../../../common/services/snackbar.service';
import { isSubmittingSelector } from '../../../auth/store/auth.selector';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import {
  addUserAction,
  addUserSuccessAction,
} from '../../../auth/store/actions/add-user.action';
import { AuthCredentialsDtoInterface } from '../../../auth/models/auth-dto.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
})
export class AddUserDialogComponent {
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(5)]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.min(5),
    ]),
  });

  public success$ = this.actions$.pipe(
    ofType(addUserSuccessAction),
    tap(() => {
      this.close();
    }),
  );

  public isSubmitting$ = this.store.select(isSubmittingSelector);

  constructor(
    private store: Store<AppStateInterface>,
    private dialogRef: DialogRef<AddUserDialogComponent>,
    private snackBar: SnackbarService,
    private actions$: Actions,
  ) { }

  public submit(credentials: ChangePasswordInterface) {
    const authCredentials: AuthCredentialsDtoInterface = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    credentials.password === credentials.repeatPassword
      ? this.addUser(authCredentials)
      : this.snackBar.inform('Пароли не совпадают!');
  }
  public addUser(authCredentials: AuthCredentialsDtoInterface) {
    this.store.dispatch(addUserAction({ authCredentials }));
  }

  public close() {
    this.dialogRef.close();
  }
}
