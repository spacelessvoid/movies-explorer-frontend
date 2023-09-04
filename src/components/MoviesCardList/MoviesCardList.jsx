import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import usePath from "../../hooks/usePath";
import { saved } from "../../utils/paths";

function MoviesCardList({ moviesList }) {
  const isPathSavedMovies = usePath(saved);

  // const moviesList = movies.map((movie, i) => (
  //   <MoviesCard key={movie.id} movie={movie} isPathSavedMovies={isPathSavedMovies} />
  // ));

  return (
    <section className="movies__list">
      {moviesList}
      {!isPathSavedMovies && (
        <button className="button movies__more-btn" aria-label="Загрузить еще" type="button">
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
