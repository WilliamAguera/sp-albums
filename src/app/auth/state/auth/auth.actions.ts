import { LoginModel } from '../../../shared/models/login.model';
import { UserModel } from '../../../shared/models/user.model';

export class Login {
  static readonly type = '[AUTH] Logging...';
  constructor( public payload: LoginModel ) {}
}

export class Logoff {
  static readonly type = '[AUTH] Logging off...';
}

export class LoginSuccess {
  static readonly type = '[AUTH] Login Success';
  constructor( public  payload: UserModel ) {}
}

export class LoginError {
  static readonly type = '[AUTH] Login Error';
  constructor( public payload: string ) {}
}

export class CreateUser {
  static readonly type = '[AUTH] Create user';
  constructor( public payload: UserModel ) {}
}

export class CreateUserSuccess {
  static readonly type = '[AUTH] Create user Success';
  constructor( public payload: UserModel ) {}
}

