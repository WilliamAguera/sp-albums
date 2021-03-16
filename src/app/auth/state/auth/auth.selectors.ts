import {Selector} from '@ngxs/store';
import {AuthState, AuthStateModel} from './auth.state';

export class AuthSelectors {

  @Selector([AuthState.isLogging])
  static isLogging(isLogging: AuthStateModel['isLogging']) {
    return isLogging;
  }

  @Selector([AuthState.userLogged])
  static userLogged(userLogged: AuthStateModel['userLogged']) {
    return userLogged;
  }

}
