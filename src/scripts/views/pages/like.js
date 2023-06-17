import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import { createMovieItemTemplate } from '../templates/template-creator';
import FavoriteMovieSearchPresenter from './liked-movies/favorite-movie-search-presenter';
import FavoriteMovieSearchView from './liked-movies/favorite-movie-search-view.js. ';
import FavoriteMovieShowPresenter from './liked-movies/favorite-movie-show-presenter';
const view = new FavoriteMovieSearchView();
const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteMovieShowPresenter({ view, favoriteMovies: FavoriteMovieIdb });
    new FavoriteMovieSearchPresenter({
      view,
      favoriteMovies: FavoriteMovieIdb,
    });
  },
};

export default Like;
