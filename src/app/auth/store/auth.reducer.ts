import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../models/auth-state.model';
import {
  logInAction,
  logInActionFailure,
  logInActionSuccess,
} from './actions/log-in.action';
import { logOutAction } from './actions/log-out.action';
import { getUsersListSuccessAction } from './actions/get-users-list.action';

import {
  addUserAction,
  addUserFailureAction,
  addUserSuccessAction,
} from './actions/add-user.action';
import {
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/get-current-user.action';
import { patchCurrentUserSuccessAction } from './actions/patch-current-user.action';
import {
  changeCurrentPasswordAction,
  changeCurrentPasswordFailureAction,
  changeCurrentPasswordSuccessAction,
} from './actions/change-current-password.action';

export const initialState: AuthStateInterface = {
  isLoggedIn: null,
  isSubmitting: false,
  currentUser: null,
  userList: null,
};

const reducer = createReducer(
  initialState,
  on(
    logInAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      currentUser: null,
    }),
  ),
  on(
    logInActionSuccess,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoggedIn: true,
      isSubmitting: false,
      currentUser: action.currentUser,
    }),
  ),
  on(
    logInActionFailure,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      isSubmitting: false,
      currentUser: null,
    }),
  ),
  on(
    logOutAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      currentUser: null,
      userList: null,
    }),
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoggedIn: true,
      currentUser: action.currentUser,
    }),
  ),
  on(
    getCurrentUserFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      currentUser: null,
    }),
  ),
  on(
    patchCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      currentUser: action.user,
    }),
  ),
  on(
    getUsersListSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      userList: action.usersList,
    }),
  ),
  on(
    changeCurrentPasswordAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    }),
  ),
  on(
    changeCurrentPasswordSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    changeCurrentPasswordFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    addUserAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    }),
  ),
  on(
    addUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
  on(
    addUserFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    }),
  ),
);

export function authReducer(state: AuthStateInterface, action: Action) {
  return reducer(state, action);
}
