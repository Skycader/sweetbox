import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { IsLoggedInGuard } from '../auth/utils/guards/is-logged-in.guard';
import { MaterialModule } from '../material/material.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { UserCardDialogComponent } from './components/user-card-dialog/user-card-dialog.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ManageUsersComponent,
    ChangePasswordDialogComponent,
    AddUserDialogComponent,
    UserCardDialogComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [],
      },
    ]),
  ],
  providers: [],
})
export class ProfileModule { }
