import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import createLikeButtonPresenterWithMovie from './helpers/testFactories';

describe('Unliking Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteMovieIdb.putMovie({ id: 1 });
  });
  afterEach(async () => {
    await FavoriteMovieIdb.deleteMovie(1);
  });

  it('Should display unlike widget when the movie has been liked', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label = "unlike this movie"]')
    ).toBeTruthy();
  });

  it('Should not display like widget when the movie has been liked', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    expect(
      document.querySelector('[aria-label = "like this movie"]')
    ).toBeFalsy();
  });

  it('Should be able to remove liked movie from the list', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    document
      .querySelector('[aria-label = "unlike this movie"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });

  it('Should not throw error if the unliked movie is not in the list', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    // hapus dulu dari film yang disukai
    await FavoriteMovieIdb.deleteMovie(1);

    // simulasikan user menekan tombol batal menyukai film
    document
      .querySelector('[aria-label = "unlike this movie"]')
      .dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
