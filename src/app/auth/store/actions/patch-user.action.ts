import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';
import { UserInterface } from '../../models/user.model';
import { ProfileDtoInterface } from '../../models/profile.dto';

export const patchUserAction = createAction(
  ActionTypes.PATCH_USER,
  props<{ username: string; profileDto: ProfileDtoInterface }>(),
);
export const patchUserSuccessAction = createAction(
  ActionTypes.PATCH_USER_SUCCESS,
  props<{ user: UserInterface }>(),
);
export const patchUserFailureAction = createAction(
  ActionTypes.PATCH_USER_FAILURE,
);
