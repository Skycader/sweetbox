import { UserRolesEnum } from './role.enum';

export interface UserInterface {
  id: number;
  username: string;
  name: string;
  midname: string;
  surname: string;
  birthdate: number;
  information: string;
  role: UserRolesEnum;
  telephone: string;
}
