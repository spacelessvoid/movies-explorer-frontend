import { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import usePath from "../../hooks/usePath";
import { saved } from "../../utils/paths";

function Movies({ moviesList, handleGetAllMovies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [renderedMovieList, setRenderedMovieList] = useState([]);

  const isPathSavedMovies = usePath(saved);

  useEffect(() => {
    const filteredMovieList = moviesList.filter(
      movie =>
        movie.nameRU.toLowerCase().includes(searchQuery) ||
        movie.nameEN.toLowerCase().includes(searchQuery),
    );

    setRenderedMovieList(() =>
      filteredMovieList.map(movie => (
        <MoviesCard
          key={movie.id}
          movie={movie}
          isPathSavedMovies={isPathSavedMovies}
        />
      )),
    );
  }, [searchQuery, moviesList]);

  return (
    <main className="movies">
      <SearchForm
        onSearchClick={handleGetAllMovies}
        setSearchQuery={setSearchQuery}
      />
      <MoviesCardList renderedMovieList={renderedMovieList} />
    </main>
  );
}

export default Movies;
