import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UserInterface } from '../../../auth/models/user.model';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../models/app-state.model';
import {
  currentUserSelector,
  usersListSelector,
} from '../../../auth/store/auth.selector';
import { GetUsersListResponseInterface } from '../../../auth/models/get-users-response.interface';
import { getUsersListAction } from '../../../auth/store/actions/get-users-list.action';
import { PageEvent } from '@angular/material/paginator';
import { RolesDictionaryEnum } from '../../models/roles.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserCardDialogComponent } from '../user-card-dialog/user-card-dialog.component';
import { getUserAction } from '../../../auth/store/actions/get-user.action';
import { UserRolesEnum } from '../../../auth/models/role.enum';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent {
  public Roles = UserRolesEnum;
  public currentUser$ = this.store.pipe(select(currentUserSelector));
  displayedColumns: string[] = ['surname', 'name', 'midname', 'role'];

  public totalUsers$: Observable<number> = this.store.pipe(
    select(usersListSelector),
    map((response: GetUsersListResponseInterface | null) =>
      response ? response.totalUsers : 0,
    ),
  );

  dataSource$: Observable<UserInterface[]> = this.store.pipe(
    select(usersListSelector),
    map((response: GetUsersListResponseInterface | null) =>
      response ? response.users : [],
    ),
  );

  constructor(
    private store: Store<AppStateInterface>,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.store.dispatch(getUsersListAction({ page: 1 }));
  }

  public currentPage: number = 1;
  public handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.store.dispatch(getUsersListAction({ page: this.currentPage }));
  }

  public updateList() {
    this.store.dispatch(getUsersListAction({ page: this.currentPage }));
  }

  public openAddUserDialog() {
    this.dialog.open(AddUserDialogComponent, {
      autoFocus: false,
    });
  }

  public openUserCard(username: string) {
    const dialog = this.dialog.open(UserCardDialogComponent, {
      autoFocus: false,
    });
    dialog.afterClosed().subscribe(() => {
      this.updateList();
    });
    const instance = dialog.componentInstance;
    instance.username = username;
  }
}
