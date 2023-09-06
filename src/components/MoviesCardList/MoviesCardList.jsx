import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./MoviesCardList.css";
import usePath from "../../hooks/usePath";
import { saved } from "../../utils/paths";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ renderedMovieList }) {
  const { isLoading } = useContext(AppContext);

  const isPathSavedMovies = usePath(saved);

  return (
    <section className="movies__list">
      {isLoading ? <Preloader /> : renderedMovieList}
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
