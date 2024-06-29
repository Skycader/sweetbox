import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';
import { UserInterface } from '../../models/user.model';

export const getUserAction = createAction(
  ActionTypes.GET_USER,
  props<{ username: string }>(),
);
export const getUserSuccessAction = createAction(
  ActionTypes.GET_USER_SUCCESS,
  props<{ user: UserInterface }>(),
);
export const getUserFailureAction = createAction(ActionTypes.GET_USER_FAILURE);
