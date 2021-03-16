import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NgxsModule.forRoot([], {developmentMode: !environment.production}),
        NgxsLoggerPluginModule.forRoot({disabled: false}),
        NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production}),
        NgxsStoragePluginModule.forRoot({ key: ['auth.users', 'auth.isLogged', 'auth.userLogged']}),
        MainModule,
        AuthModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
