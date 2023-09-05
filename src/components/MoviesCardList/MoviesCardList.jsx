import "./MoviesCardList.css";
import usePath from "../../hooks/usePath";
import { saved } from "../../utils/paths";

function MoviesCardList({ renderedMovieList }) {
  const isPathSavedMovies = usePath(saved);

  return (
    <section className="movies__list">
      {renderedMovieList}
      {!isPathSavedMovies && (
        <button
          className="button movies__more-btn"
          aria-label="Загрузить еще"
          type="button"
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
