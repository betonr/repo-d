import { createAction, props } from '@ngrx/store';

/**
 * set loading as true
 */
export const setUser = createAction(
    '[Login Component] setUser',
    props<Object>()
);
