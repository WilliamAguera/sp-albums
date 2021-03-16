import { AlbumModel } from '../../../shared/models/album.model';
import { PhotoModel } from '../../../shared/models/photo.model';

export class GetAlbums {
  static readonly type = '[ALBUMS] Get all albums';
}

export class GetAlbumsSuccess {
  static readonly type = '[ALBUMS] Get all albums Success';
  constructor(public payload: AlbumModel[]) {}
}

export class GetAlbumsError {
  static readonly type = '[ALBUMS] Get all albums Error';
  constructor(public payload: string) {}
}

export class GetPhotos {
  static readonly type = '[ALBUMS] Get all photos';
}

export class GetPhotosSuccess {
  static readonly type = '[ALBUMS] Get all photos Success';
  constructor(public payload: Array<PhotoModel>) {}
}

export class GetPhotosError {
  static readonly type = '[ALBUMS] Get all photos Error';
  constructor(public payload: string) {}
}
