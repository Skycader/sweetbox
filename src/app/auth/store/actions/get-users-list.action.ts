import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';
import { GetUsersListResponseInterface } from '../../models/get-users-response.interface';

export const getUsersListAction = createAction(
  ActionTypes.GET_USERS_LIST,
  props<{ page: number }>(),
);
export const getUsersListSuccessAction = createAction(
  ActionTypes.GET_USERS_LIST_SUCCESS,
  props<{ usersList: GetUsersListResponseInterface }>(),
);
export const getUsersListFailureAction = createAction(
  ActionTypes.GET_USERS_LIST_FAILURE,
);
