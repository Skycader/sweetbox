import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';
import { UserRolesEnum } from '../../models/role.enum';

export const updateUserRoleAction = createAction(
  ActionTypes.UPDATE_USER_ROLE,
  props<{ username: string; role: UserRolesEnum }>(),
);
export const updateUserRoleSuccessAction = createAction(
  ActionTypes.UPDATE_USER_ROLE_SUCCESS,
);
export const updateUserRoleFailureAction = createAction(
  ActionTypes.UPDATE_USER_ROLE_FAILURE,
);
