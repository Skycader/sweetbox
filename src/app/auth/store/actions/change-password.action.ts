import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';

export const changePasswordAction = createAction(
  ActionTypes.CHANGE_PASSWORD,
  props<{ username: string; password: string }>(),
);
export const changePasswordSuccessAction = createAction(
  ActionTypes.CHANGE_PASSWORD_SUCCESS,
);
export const changePasswordFailureAction = createAction(
  ActionTypes.CHANGE_PASSWORD_FAILURE,
);
