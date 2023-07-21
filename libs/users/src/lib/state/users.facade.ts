import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { UsersState } from './users.reducer';

@Injectable()
export class UsersFacade {
  currentUser$ = this.store.pipe(select(UsersSelectors.getUser));
  isAuthenticated$ = this.store.pipe(select(UsersSelectors.getUserIsAuth));

  constructor(private store: Store<UsersState>) {}

  buildUserSession() {
    this.store.dispatch(UsersActions.buildUserSession());
  }
}
