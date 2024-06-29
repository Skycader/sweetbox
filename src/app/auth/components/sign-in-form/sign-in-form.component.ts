import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import { logInAction } from '../../store/actions/log-in.action';
import { isSubmittingSelector } from '../../store/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent {
  public isSubmitting$: Observable<boolean> = this.store.pipe(
    select(isSubmittingSelector),
  );

  public signInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(private store: Store<AppStateInterface>) {}

  public submit() {
    this.store.dispatch(
      logInAction({ authCredentials: this.signInForm.value }),
    );
  }
}
