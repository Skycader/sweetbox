import { UserInterface } from './user.model';

export interface SignInResponseInterface {
  user: UserInterface;
  accessToken: string;
}
