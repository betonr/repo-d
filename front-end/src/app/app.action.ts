import { createAction, props } from '@ngrx/store';
import { InfoSystem } from './app.state';

/**
 * set info system
 */
export const setInfosApp = createAction(
    '[infos App Component] setInfosApp',
    props<InfoSystem>()
);

/**
 * set user info
 */
export const setUser = createAction(
    '[Login Component] setUser',
    props<Object>()
);

/**
 * logout system
 */
export const logout = createAction(
    '[Login Component] logout'
);

/**
 * set loading as true
 */
export const showLoading = createAction(
    '[Loading Component] showLoading'
);

/**
 * set loading as false
 */
export const closeLoading = createAction(
    '[Loading Component] closeLoading'
);