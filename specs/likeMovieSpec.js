import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import createLikeButtonPresenterWithMovie from './helpers/testFactories';

describe('Like a Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = "<div id='likeButtonContainer'></div>";
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });
  it('Should show the like button when the movie has not been liked before', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });
    expect(
      document.querySelector('[aria-label="like this movie"]')
    ).toBeTruthy();
  });

  it('Should not show the unlike button when the movie has not been liked before', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this movie"]')
    ).toBeFalsy();
  });

  it('Should be able to like the movie', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const movie = await FavoriteMovieIdb.getMovie(1);
    expect(movie).toEqual({ id: 1 });

    FavoriteMovieIdb.deleteMovie(1);
  });

  it('Should not add a movie again when its already liked', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    // tambahkan movie dengan id 1 ke daftar film yang disukai
    await FavoriteMovieIdb.putMovie({ id: 1 });

    // simulasikan user menekan tombol suka

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // tidak ada film ganda

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([{ id: 1 }]);

    FavoriteMovieIdb.deleteMovie(1);
  });

  it('Should not add a movie when it has no id', async () => {
    await createLikeButtonPresenterWithMovie({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
