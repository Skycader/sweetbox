import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';
import { AuthCredentialsDtoInterface } from '../../models/auth-dto.model';
import { UserInterface } from '../../models/user.model';

export const logInAction = createAction(
  ActionTypes.LOG_IN,
  props<{ authCredentials: AuthCredentialsDtoInterface }>(),
);

export const logInActionSuccess = createAction(
  ActionTypes.LOG_IN_SUCCESS,
  props<{ currentUser: UserInterface }>(),
);

export const logInActionFailure = createAction(ActionTypes.LOG_IN_FAILURE);
