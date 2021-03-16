import { PhotoModel } from './photo.model';

export class AlbumModel {
    id: number;
    userId: number;
    title: string;
    firstPhoto: string;
    photos: Array<PhotoModel>;
}

