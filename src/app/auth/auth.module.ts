import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignFormComponent } from './components/sign-form/sign-form.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/effects/auth.effect';
import { IsAnonymousGuard } from './utils/guards/is-anonymous.guard';
import {
  AuthInterceptor,
  AuthInterceptorProvider,
} from './utils/interceptors/auth.interceptor';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { RolePipe } from './utils/pipes/role.pipe';

@NgModule({ declarations: [SignFormComponent, SignInFormComponent, RolePipe],
    exports: [RolePipe], imports: [CommonModule,
        MaterialModule,
        RouterModule.forChild([
            {
                path: 'auth',
                component: SignFormComponent,
                canActivate: [],
            },
        ]),
        ReactiveFormsModule,
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffect])], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        IsAnonymousGuard,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AuthModule {}
