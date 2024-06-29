import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import { currentUserSelector } from '../../../auth/store/auth.selector';
import { Observable } from 'rxjs';
import { UserInterface } from '../../../auth/models/user.model';
import { UserRolesEnum } from '../../../auth/models/role.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public Roles = UserRolesEnum;
  public currentUser$: Observable<UserInterface | null> = this.store.pipe(
    select(currentUserSelector),
  );
  constructor(private store: Store<AppStateInterface>) {}
}
