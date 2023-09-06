import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./MoviesCardList.css";
import usePath from "../../hooks/usePath";
import { saved } from "../../utils/paths";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ renderedMovieList, searchQuery }) {
  const { isLoading, isError } = useContext(AppContext);

  const isPathSavedMovies = usePath(saved);

  return (
    <section className="movies__list">
      {renderedMovieList.length === 0 &&
        searchQuery &&
        !isError &&
        !isLoading && <p className="movies__result-text">Ничего не найдено</p>}
      {isError && (
        <p className="movies__result-text">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      )}
      {isLoading ? <Preloader /> : renderedMovieList}
      {!isPathSavedMovies && renderedMovieList.length !== 0 && (
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
