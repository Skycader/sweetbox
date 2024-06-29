import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../models/app-state.model';
import { AuthStateInterface } from '../models/auth-state.model';

export const authFeatureSelector = (
  state: AppStateInterface,
): AuthStateInterface => state.auth;

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn,
);

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn === false,
);

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting,
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser,
);

export const usersListSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.userList,
);
