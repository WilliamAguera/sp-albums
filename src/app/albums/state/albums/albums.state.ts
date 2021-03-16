import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
    GetAlbums,
    GetAlbumsError,
    GetAlbumsSuccess,
    GetPhotos,
    GetPhotosError,
    GetPhotosSuccess,
} from './albums.actions';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlbumModel } from '../../../shared/models/album.model';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map } from 'rxjs/operators';
import { PhotoModel } from '../../../shared/models/photo.model';
import { Observable } from 'rxjs';

export interface AlbumsStateModel {
    isLoading: boolean;
    albums: Array<AlbumModel>;
    photos: Array<PhotoModel>;
}

@State<AlbumsStateModel>({
    name: 'albums',
    defaults: {
        isLoading: false,
        albums: [],
        photos: []
    }
})
@Injectable()
export class AlbumsState {

    @Selector()
    static isLoading(state: AlbumsStateModel) {
        return state.isLoading;
    }

    @Selector()
    static albums(state: AlbumsStateModel) {
        return state.albums;
    }

    @Selector()
    static photos(state: AlbumsStateModel) {
        return state.photos;
    }

    constructor(private router: Router,
                private http: HttpClient,
                private snackBar: MatSnackBar) {
    }

    @Action(GetAlbums)
    getAlbums(ctx: StateContext<AlbumsStateModel>) {
        ctx.patchState({ isLoading: true });
        return this.fetchAlbums().pipe(
            map((data: Array<AlbumModel>) => ctx.dispatch(new GetAlbumsSuccess(data))),
            catchError((err) => ctx.dispatch(new GetAlbumsError(err)))
        );
    }

    @Action(GetAlbumsSuccess)
    getAlbumsSuccess(ctx: StateContext<AlbumsStateModel>, { payload }: GetAlbumsSuccess) {
        ctx.patchState({ albums: payload });
        ctx.dispatch(new GetPhotos());
    }


    @Action(GetAlbumsError)
    getAlbumsError(ctx: StateContext<AlbumsStateModel>, { payload }: GetAlbumsError) {
        this.snackBar.open(payload, '', { duration: 3000});
        ctx.patchState({ isLoading: false });
    }

    @Action(GetPhotos)
    getPhotos(ctx: StateContext<AlbumsStateModel>) {
        return this.fetchPhotos().pipe(
            delay(2000),
            map(( response: Array<PhotoModel> ) => {
                const albumsWithPhotos = ctx.getState().albums.map(( item: AlbumModel, idx: number ) => {
                    const photosByAlbum = response.filter(( photo ) => photo.albumId === item.id);
                    return {
                        ...item,
                        firstPhoto: photosByAlbum[0].url,
                        photos: photosByAlbum.slice(0, 10)
                    };
                });
                ctx.patchState({ albums: albumsWithPhotos });
                return ctx.dispatch(new GetPhotosSuccess( response ));
            }),
            catchError((err) => ctx.dispatch(new GetPhotosError(err.message))),
        );
    }

    @Action(GetPhotosSuccess)
    getPhotosSuccess(ctx: StateContext<AlbumsStateModel>, { payload }: GetPhotosSuccess) {
        ctx.patchState({ photos: payload,  isLoading: false });
    }

    @Action(GetPhotosError)
    getPhotosError(ctx: StateContext<AlbumsStateModel>, { payload }: GetPhotosError) {
        this.snackBar.open(payload, '', { duration: 3000});
        ctx.patchState({ isLoading: false });
    }

    fetchAlbums(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/albums');
    }

    fetchPhotos(): Observable<any> {
        return this.http.get(`https://jsonplaceholder.typicode.com/photos`);
    }

}
