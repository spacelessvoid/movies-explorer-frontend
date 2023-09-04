import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ moviesList, handleGetAllMovies }) {

  return (
    <main className="movies">
      <SearchForm onSearchClick={handleGetAllMovies} />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
