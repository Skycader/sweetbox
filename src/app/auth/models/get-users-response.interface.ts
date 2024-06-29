import { UserInterface } from './user.model';

export interface GetUsersListResponseInterface {
  users: UserInterface[];
  totalUsers: number;
}
