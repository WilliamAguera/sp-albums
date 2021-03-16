import { Component, OnInit } from '@angular/core';
import { AlbumsSandbox } from '../albums.sandbox';
import { ModalAlbumComponent } from './modal-album/modal-album.component';
import { MatDialog } from '@angular/material/dialog';
import { AlbumModel } from '../../shared/models/album.model';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss'],
    animations: [
        trigger('fade', [
            transition('* => *', [
                query(':enter', [
                        style({ opacity: 0 }),
                        stagger(50, [animate('0.2s', style({ opacity: 1 }))])
                    ], { optional: true }
                )
            ])
        ])
    ]
})
export class AlbumsComponent implements OnInit {

    albumsCollection$ = this.albumsSandbox.albums$;

    isLoading$ = this.albumsSandbox.isLoading$;

    constructor(private albumsSandbox: AlbumsSandbox, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.albumsSandbox.getAlbums();
    }

    openAlbum( album: AlbumModel ) {
        this.dialog.open(ModalAlbumComponent, { data: album, minHeight: '800px' });
    }

}
