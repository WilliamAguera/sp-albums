import {Selector} from '@ngxs/store';
import { AlbumsState, AlbumsStateModel } from './albums.state';

export class AlbumsSelectors {

  @Selector([AlbumsState.isLoading])
  static isLoading(isLoading: AlbumsStateModel['isLoading']) {
    return isLoading;
  }

  @Selector([AlbumsState.albums])
  static albums(albums: AlbumsStateModel['albums']) {
    return albums;
  }

}
