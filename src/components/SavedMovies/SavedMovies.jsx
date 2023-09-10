import { useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useMoviesFilter from "../../hooks/useMoviesFilter";

function SavedMovies({
  savedMoviesList,
  handleGetSavedMovies,
  handleDeleteMovie,
}) {
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

  useEffect(() => {
    setFilteredMovieList(filterMovies(savedMoviesList));
  }, [savedMoviesList, searchQuery, isShorts]);

  useEffect(() => {
    setFilteredMovieList([]);
  }, []);

  return (
    <main className="movies">
      <SearchForm
        onSearchSubmit={handleGetSavedMovies}
        setSearchQuery={setSearchQuery}
        toggleShortsFilter={toggleShortsFilter}
        isShorts={isShorts}
      />
      <MoviesCardList
        savedMoviesList={savedMoviesList}
        filteredMovieList={filteredMovieList}
        renderedMovies={filteredMovieList}
        searchQuery={searchQuery}
        numberOfCards={numberOfCards}
        handleDeleteMovie={handleDeleteMovie}
      />
    </main>
  );
}

export default SavedMovies;
