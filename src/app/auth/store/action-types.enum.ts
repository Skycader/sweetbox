export enum ActionTypes {
  LOG_IN = '[Auth] Log in',
  LOG_IN_SUCCESS = '[Auth] Log in success',
  LOG_IN_FAILURE = '[Auth] Log in failure',

  LOG_OUT = '[Auth] Log out',

  ADD_USER = '[Auth] Add user',
  ADD_USER_SUCCESS = '[Auth] Add user success',
  ADD_USER_FAILURE = '[Auth] Add user failure',

  GET_USER = '[Auth] Get user',
  GET_USER_SUCCESS = '[Auth] Get user success',
  GET_USER_FAILURE = '[Auth] Get user failure',

  GET_CURRENT_USER = '[Auth] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',

  GET_USERS_LIST = '[Auth] Get users list',
  GET_USERS_LIST_SUCCESS = '[Auth] Get users list success',
  GET_USERS_LIST_FAILURE = '[Auth] Get users list failure',

  PATCH_USER = '[Auth] Patch user',
  PATCH_USER_SUCCESS = '[Auth] Patch user success',
  PATCH_USER_FAILURE = '[Auth] Patch user failure',

  PATCH_CURRENT_USER = '[Auth] Patch current user',
  PATCH_CURRENT_USER_SUCCESS = '[Auth] Patch current user success',
  PATCH_CURRENT_USER_FAILURE = '[Auth] Patch current user failure',

  CHANGE_PASSWORD = '[Auth] Change password',
  CHANGE_PASSWORD_SUCCESS = '[Auth] Change password success',
  CHANGE_PASSWORD_FAILURE = '[Auth] Change password failure',

  CHANGE_CURRENT_PASSWORD = '[Auth] Change current password',
  CHANGE_CURRENT_PASSWORD_SUCCESS = '[Auth] Change current password success',
  CHANGE_CURRENT_PASSWORD_FAILURE = '[Auth] Change current password failure',

  UPDATE_USER_ROLE = '[Auth] Update user role',
  UPDATE_USER_ROLE_SUCCESS = '[Auth] Update user role success',
  UPDATE_USER_ROLE_FAILURE = '[Auth] Update user role failure',
}
