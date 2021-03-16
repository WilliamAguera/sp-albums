import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumModel } from '../../../shared/models/album.model';
import { PhotoModel } from '../../../shared/models/photo.model';

@Component({
    selector: 'app-modal-album',
    templateUrl: './modal-album.component.html',
    styleUrls: ['./modal-album.component.scss']
})
export class ModalAlbumComponent implements OnInit {

    public selected: { index: number, photo: PhotoModel };

    constructor(
        @Inject(MAT_DIALOG_DATA) public album: AlbumModel) {
    }

    ngOnInit(): void {
        this.setSelected(0);
    }

    selectPhoto(photo: PhotoModel) {
        const idx = this.album.photos.findIndex((item) => item.id === photo.id);
        this.setSelected(idx);
    }

    previous() {
        const idx = this.selected.index - 1;
        this.setSelected( idx );
    }

    next() {
        const idx = this.selected.index + 1;
        this.setSelected( idx );
    }

    setSelected( idx: number ) {
        this.selected = {
            index: idx,
            photo: this.album.photos[idx]
        };
    }

}
