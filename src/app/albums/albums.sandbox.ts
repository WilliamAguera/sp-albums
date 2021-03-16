import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AlbumsState } from './state/albums/albums.state';
import { AlbumModel } from '../shared/models/album.model';
import { GetAlbums } from './state/albums/albums.actions';
import { PhotoModel } from '../shared/models/photo.model';
import { AlbumsSelectors } from './state/albums/albums.selectors';

@Injectable({
    providedIn: 'root'
})
export class AlbumsSandbox {

    @Select(AlbumsSelectors.isLoading) isLoading$: Observable<boolean>;

    @Select(AlbumsState.albums) albums$: Observable<Array<AlbumModel>>;

    @Select(AlbumsState.photos) photos$: Observable<Array<PhotoModel>>;

    constructor(private store: Store) {
    }

    getAlbums() {
        this.store.dispatch(new GetAlbums());
    }
}
