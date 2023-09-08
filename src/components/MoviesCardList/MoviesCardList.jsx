import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./MoviesCardList.css";
import usePath from "../../hooks/usePath";
import { saved } from "../../utils/paths";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  filteredMovieList,
  renderMovies,
  searchQuery,
  numberOfCards,
  morePage,
  incrementMorePage,
}) {
  const { isLoading, isError } = useContext(AppContext);

  const isPathSavedMovies = usePath(saved);

  const { initialCards, additionalCards } = numberOfCards;

  const showMoreButton =
    !isPathSavedMovies &&
    (filteredMovieList.length > 12 ||
      (initialCards === 5 && filteredMovieList.length > 5)) &&
    !(initialCards + additionalCards * morePage >= filteredMovieList.length);

  function handleIncrementMorePage() {
    incrementMorePage();
  }

  function handleRenderMovies() {
    const movies = renderMovies();

    return movies.map(movie => (
      <MoviesCard
        key={movie.id}
        movie={movie}
        isPathSavedMovies={isPathSavedMovies}
      />
    ));
  }

  const renderedCards = handleRenderMovies();

  return (
    <section className="movies__list">
      {isLoading ? <Preloader /> : renderedCards}

      {renderedCards.length === 0 && searchQuery && !isError && !isLoading && (
        <p className="movies__result-text">Ничего не найдено</p>
      )}

      {!isPathSavedMovies && searchQuery && isError  && (
        <p className="movies__result-text">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
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
