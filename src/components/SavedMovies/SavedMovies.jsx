import { useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useMoviesFilter from "../../hooks/useMoviesFilter";

function SavedMovies({ moviesList, handleGetSavedMovies }) {
  const {
    filteredMovieList,
    setFilteredMovieList,
    searchQuery,
    setSearchQuery,
    isShorts,
    numberOfCards,
    toggleShortsFilter,
    filterMovies,
  } = useMoviesFilter();

  // console.log(numberOfCards);

  useEffect(() => {
    setFilteredMovieList(filterMovies(moviesList));
  }, [moviesList, searchQuery, isShorts]);

  const renderMovies = () => filteredMovieList;

  return (
    <main className="movies">
      <SearchForm
        onSearchSubmit={handleGetSavedMovies}
        setSearchQuery={setSearchQuery}
        toggleShortsFilter={toggleShortsFilter}
        isShorts={isShorts}
      />
      <MoviesCardList
        filteredMovieList={filteredMovieList}
        renderMovies={renderMovies}
        searchQuery={searchQuery}
        numberOfCards={numberOfCards}
      />
    </main>
  );
}

export default SavedMovies;
