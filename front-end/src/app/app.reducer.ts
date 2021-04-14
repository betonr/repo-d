import { createReducer, on, Action } from '@ngrx/store';
import {
  closeLoading,
  logout,
  setInfosApp,
  setUser,
  showLoading
} from './app.action';
import { AppState } from './app.state';

/** initial values to App State */
const initialState: AppState = {
  username: localStorage.getItem('repoD_username') ? localStorage.getItem('repoD_username') : '',
  system: {
    title: '',
    enable_remove_images: false,
    registry_url: ''
  },
  loading: false
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

  on(setInfosApp, (state, payload) => {
    return { ...state, system: payload };
  }),

  on(logout, (state) => {
    localStorage.removeItem('repoD_username');
    return { ...state, username: '' };
  }),

  on(showLoading, (state) => {
    return { ...state, loading: true };
  }),
  
  on(closeLoading, (state) => {
    return { ...state, loading: false };
  }),
);

export function reducer(state: AppState | undefined, action: Action) {
  return reducerApp(state, action);
} 
