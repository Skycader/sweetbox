import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';
import { AuthCredentialsDtoInterface } from '../../models/auth-dto.model';

export const addUserAction = createAction(
  ActionTypes.ADD_USER,
  props<{ authCredentials: AuthCredentialsDtoInterface }>(),
);
export const addUserSuccessAction = createAction(ActionTypes.ADD_USER_SUCCESS);
export const addUserFailureAction = createAction(ActionTypes.ADD_USER_FAILURE);
