import { UserRolesEnum } from './role.enum';
import { UserInterface } from './user.model';

export class User implements UserInterface {
  id = 0;
  username = '';
  name = '';
  birthdate = 0;
  telephone = '';
  midname = '';
  surname = '';
  information = '';
  role = UserRolesEnum.User;
}
