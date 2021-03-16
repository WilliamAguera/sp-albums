import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './containers/auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './state/auth/auth.state';
import { LoginComponent } from './containers/login/login.component';
import { NewUserComponent } from './containers/new-user/new-user.component';

@NgModule({
    declarations: [AuthComponent, LoginComponent, NewUserComponent],
    imports: [
        RouterModule.forChild([
            {
                path: 'auth', component: AuthComponent,
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    { path: 'login', component: LoginComponent },
                    { path: 'new-user', component: NewUserComponent },
                ]
            }
        ]),
        NgxsModule.forFeature( [ AuthState ] ),
        SharedModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class AuthModule {
}
