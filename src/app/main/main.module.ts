import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth.guard';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
    {
        path: 'main', component: MainComponent,
        children: [
            {
                path: '', redirectTo: 'albums', pathMatch: 'full'
            },
            {
                path: 'albums',
                loadChildren: () => import('../albums/albums.module').then(m => m.AlbumsModule),
                canActivate: [AuthGuardService]
            }
        ]
    },
];
@NgModule({
    declarations: [MainComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class MainModule {
}
