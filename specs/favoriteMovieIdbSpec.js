import { itsActsFavoriteMovieModel } from './contract/favoriteMovieContract';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteMovieIdb.getAllMovies()).forEach(async (movies) => {
      await FavoriteMovieIdb.deleteMovie(movies.id);
    });
  });

  itsActsFavoriteMovieModel(FavoriteMovieIdb);
});
