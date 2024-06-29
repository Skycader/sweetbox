import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';
import { UserInterface } from '../../models/user.model';

export const getCurrentUserAction = createAction(ActionTypes.GET_CURRENT_USER);
export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: UserInterface }>(),
);
export const getCurrentUserFailureAction = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE,
);
