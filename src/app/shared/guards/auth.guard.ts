import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthState } from '../../auth/state/auth/auth.state';
import { Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

    constructor(
        private store: Store,
        private router: Router
    ) {}

    canActivate() {
        const isLogged = this.store.selectSnapshot( AuthState.isLogged );
        if (!isLogged){
            return this.router.parseUrl('/albums');
        }
        return true;
    }
}
