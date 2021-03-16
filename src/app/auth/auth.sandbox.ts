import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CreateUser, Login, Logoff } from './state/auth/auth.actions';
import { LoginModel } from '../shared/models/login.model';
import { Observable } from 'rxjs';
import { AuthSelectors } from './state/auth/auth.selectors';
import { UserModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthSandbox {

  @Select(AuthSelectors.isLogging) isLogging$: Observable<boolean>;

  @Select(AuthSelectors.userLogged) userLogged$: Observable<UserModel>;

  constructor(private store: Store) { }

  login( credentials: LoginModel ) {
    this.store.dispatch(new Login(credentials));
  }

  logoff() {
    this.store.dispatch(new Logoff());
  }

  createUser( user: UserModel ) {
    this.store.dispatch(new CreateUser(user));
  }

}
