import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';
import { UserInterface } from '../../models/user.model';
import { ProfileDtoInterface } from '../../models/profile.dto';

export const patchCurrentUserAction = createAction(
  ActionTypes.PATCH_CURRENT_USER,
  props<{ profileDto: ProfileDtoInterface }>(),
);
export const patchCurrentUserSuccessAction = createAction(
  ActionTypes.PATCH_CURRENT_USER_SUCCESS,
  props<{ user: UserInterface }>(),
);
export const patchCurrentUserFailureAction = createAction(
  ActionTypes.PATCH_CURRENT_USER_FAILURE,
);
