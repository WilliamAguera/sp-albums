import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateUser, CreateUserSuccess, Login, LoginError, LoginSuccess, Logoff } from './auth.actions';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../../shared/models/user.model';

export interface AuthStateModel {
    isLogging: boolean;
    isLogged: boolean;
    users: Array<UserModel>;
    userLogged: UserModel;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        isLogging: false,
        isLogged: false,
        users: [],
        userLogged: {email: '', password: '', name: '' }
    }
})
@Injectable()
export class AuthState {

    @Selector()
    static isLogging(state: AuthStateModel) {
        return state.isLogging;
    }

    @Selector()
    static isLogged(state: AuthStateModel) {
        return state.isLogged;
    }

    @Selector()
    static userLogged(state: AuthStateModel) {
        return state.userLogged;
    }

    constructor(private router: Router,
                private ngZone: NgZone,
                private snackBar: MatSnackBar) {
    }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, {payload}: Login) {
        ctx.patchState({isLogging: true});
        return new Observable((subscriber => {
            // Fake Request com delay de login
            const findUser = ctx.getState().users.find(( item: UserModel ) => item.email === payload.email);
            if ( !findUser ) {
                subscriber.error('Usuário ou senha incorretos');
                return;
            }
            if ((payload.email === findUser.email) &&
                (payload.password === findUser.password)) {
                subscriber.next(findUser);
                return;
            }
            subscriber.error('Usuário ou senha incorretos');
        })).pipe(
            delay(3000),
            tap((data: any) => ctx.dispatch(new LoginSuccess(data))),
            catchError((err) => ctx.dispatch(new LoginError(err)))
        );
    }

    @Action(Logoff)
    logoff(ctx: StateContext<AuthStateModel>) {
        ctx.patchState({ isLogged: false, userLogged: {email: '', password: '', name: '' }});
        this.ngZone.run(() => this.router.navigate(['/auth/login']));
    }

    @Action(LoginSuccess)
    loginSuccess(ctx: StateContext<AuthStateModel>, {payload}: LoginSuccess) {
        ctx.patchState({isLogging: false, isLogged: true, userLogged: payload });
        this.ngZone.run(() => this.router.navigate(['main']));
    }

    @Action(LoginError)
    loginError(ctx: StateContext<AuthStateModel>, {payload}: LoginError) {
      ctx.patchState({isLogging: false, isLogged: false });
      this.snackBar.open(payload, '', { duration: 2000 });
    }

    @Action(CreateUser)
    createUser(ctx: StateContext<AuthStateModel>, {payload}: CreateUser) {
        const findUser = ctx.getState().users.find(( item: UserModel ) => item.email === payload.email);
        if ( findUser ) {
            this.snackBar.open(`Usuario "${findUser.email}" já existe`, '', { duration: 2000 });
            return;
        }
        ctx.dispatch(new CreateUserSuccess(payload));
    }

    @Action(CreateUserSuccess)
    createUserSuccess(ctx: StateContext<AuthStateModel>, {payload}: CreateUserSuccess) {
        ctx.patchState({ users: [ ...ctx.getState().users, payload ]});
        this.snackBar.open('Usuario criado com sucesso ⚡', '', { duration: 2000 });
        this.ngZone.run(() => this.router.navigate(['albums/login']));
    }


}
