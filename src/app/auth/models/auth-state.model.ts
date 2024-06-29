import { GetUsersListResponseInterface } from './get-users-response.interface';
import { UserInterface } from './user.model';

export interface AuthStateInterface {
  isLoggedIn: boolean | null;
  isSubmitting: boolean;
  currentUser: UserInterface | null;
  userList: null | GetUsersListResponseInterface;
}
