import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';

export const changeCurrentPasswordAction = createAction(
  ActionTypes.CHANGE_CURRENT_PASSWORD,
  props<{ password: string }>(),
);
export const changeCurrentPasswordSuccessAction = createAction(
  ActionTypes.CHANGE_CURRENT_PASSWORD_SUCCESS,
);
export const changeCurrentPasswordFailureAction = createAction(
  ActionTypes.CHANGE_CURRENT_PASSWORD_FAILURE,
);
