import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import { logInAction } from '../../store/actions/log-in.action';
import { AuthCredentialsDtoInterface } from '../../models/auth-dto.model';
import { isAnonymousSelector } from '../../store/auth.selector';
import { tap } from 'rxjs';

@Component({
  selector: 'ardon-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrl: './sign-form.component.scss',
})
export class SignFormComponent {
  signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    passwordAgain: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(private store: Store<AppStateInterface>) { }

  public submitSignUpForm() { }

  signInForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  public submitSignInForm() { }

  public logIn() {
    this.store.dispatch(
      logInAction({ authCredentials: this.signInForm.value }),
    );
  }
}
