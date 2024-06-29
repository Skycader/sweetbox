import { createAction } from '@ngrx/store';
import { ActionTypes } from '../action-types.enum';

export const logOutAction = createAction(ActionTypes.LOG_OUT);
