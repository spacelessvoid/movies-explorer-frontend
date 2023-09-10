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
        savedMoviesList={savedMoviesList}
        filteredMovieList={filteredMovieList}
        renderMovies={renderMovies}
        searchQuery={searchQuery}
        numberOfCards={numberOfCards}
        handleDeleteMovie={handleDeleteMovie}
      />
    </main>
  );
}

export default SavedMovies;
