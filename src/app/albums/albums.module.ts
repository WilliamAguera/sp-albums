import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './containers/albums.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AlbumsState } from './state/albums/albums.state';
import { SharedModule } from '../shared/shared.module';
import { ModalAlbumComponent } from './containers/modal-album/modal-album.component';


const routes: Routes = [
    {
        path: '',
        component: AlbumsComponent,
    }
];

@NgModule({
    declarations: [AlbumsComponent, ModalAlbumComponent],
    imports: [
        RouterModule.forChild(routes),
        NgxsModule.forFeature( [ AlbumsState ] ),
        SharedModule,
        HttpClientModule,
        CommonModule
    ]
})
export class AlbumsModule {
}
