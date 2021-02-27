import { createReducer, on, Action } from '@ngrx/store';
import {
  setUser
} from './app.action';
import { AppState } from './app.state';

/** initial values to App State */
const initialState: AppState = {
  username: localStorage.getItem('repoD_username') ? localStorage.getItem('repoD_username') : ''
};

/**
 * reducer to manage App state
 * set new values in AppState
 */
const reducerApp = createReducer(initialState,
  on(setUser, (state, payload) => {
    localStorage.setItem('repoD_username', payload['username']);
    return { ...state, username: payload['username'] };
  }),
);

export function reducer(state: AppState | undefined, action: Action) {
  return reducerApp(state, action);
} 
