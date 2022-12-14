import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { User } from '../models/user';

import { loadUsers, loadUsersSuccess } from './01-actions';
import { RootActions } from './01-actions';

export const ROOT_FEATURE_KEY = 'root';

export interface State {
  readonly [ROOT_FEATURE_KEY]: RootState;
}

export interface RootState {
  appName: string;
  user: User;
  users: User[];
}

const initialState: RootState = {
  appName: 'NgRx',
  user: {
    isAdmin: false,
    username: ''
  },
  users: []
};

function log(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const currentState = reducer(state, action);

    console.groupCollapsed(action.type)
    console.log('Etat precedent: ', state);
    console.log('Action: ', action);
    console.log('Etat suivant: ', currentState);
    console.groupEnd()

    return currentState;
  }
}

export const metaReducers: MetaReducer[] = [log];

export const rootReducer = createReducer<RootState, Action>(initialState,

  on(RootActions.initApp, (state: RootState) => {
    return {
      ...state,
      user: {
        ...state.user,
        isAdmin: true
      }
    }
  }),
  on(RootActions.changeUsername, (state: RootState, props) => {
    return {
      ...state,
      user: {
        ...state.user,
        username: props.username
      }
    };
  }),
  on(loadUsers, (state: RootState) => {
    return {
      ...state
    }
  }),
  on(loadUsersSuccess, (state: RootState, props) => {
    return {
      ...state,
      users: props.users
    }
  })
);