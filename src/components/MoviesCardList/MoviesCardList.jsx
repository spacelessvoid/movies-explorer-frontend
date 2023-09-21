import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./MoviesCardList.css";
import { MSG_NOTHING_FOUND, MSG_SEARCH_ERROR } from "../../utils/constants";
import { saved } from "../../utils/paths";
import usePath from "../../hooks/usePath";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  savedMoviesList,
  filteredMovieList,
  renderedMovies,
  searchQuery,
  numberOfCards,
  morePage,
  handleIncrementMorePage,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  const { isLoading, isError } = useContext(AppContext);

  const isPathSavedMovies = usePath(saved);

  const { initialCards, additionalCards } = numberOfCards;

  const showMoreButton =
    !isPathSavedMovies &&
    (filteredMovieList.length > 12 ||
      (initialCards === 5 && filteredMovieList.length > 5)) &&
    !(initialCards + additionalCards * morePage >= filteredMovieList.length);

  function checkIsSaved(movie) {
    if (!isPathSavedMovies) {
      const isSaved = savedMoviesList.some(sm => sm.movieId === movie.id);
      return isSaved;
    } else return true;
  }

  const renderedCards = renderedMovies.map(movie => (
    <MoviesCard
      key={movie.id ?? movie._id}
      movie={movie}
      saved={checkIsSaved(movie)}
      isPathSavedMovies={isPathSavedMovies}
      handleSaveMovie={handleSaveMovie}
      handleDeleteMovie={handleDeleteMovie}
    />
  ));

  return (
    <section className="movies__list">
      {isLoading ? <Preloader /> : renderedCards}

      {renderedCards.length === 0 && searchQuery && !isError && !isLoading && (
        <p className="movies__result-text">{MSG_NOTHING_FOUND}</p>
      )}

      {!isPathSavedMovies && searchQuery && isError && (
        <p className="movies__result-text">{MSG_SEARCH_ERROR}</p>
      )}

      {showMoreButton && (
        <button
          className="button movies__more-btn"
          aria-label="Загрузить еще"
          type="button"
          onClick={handleIncrementMorePage}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
