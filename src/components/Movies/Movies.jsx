import { useEffect } from "react";
import "./Movies.css";
import { LS_FILTERED_MOVIES, LS_IS_SHORTS } from "../../utils/constants";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useMoviesFilter from "../../hooks/useMoviesFilter";

function Movies({
  moviesList,
  savedMoviesList,
  handleGetAllMovies,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  const {
    filteredMovieList,
    setFilteredMovieList,
    searchQuery,
    setSearchQuery,
    isShorts,
    setIsShorts,
    numberOfCards,
    morePage,
    setMorePage,
    setContentWidth,
    toggleShortsFilter,
    incrementMorePage,
    filterMovies,
    renderMovies,
  } = useMoviesFilter();

  useEffect(() => {
    setContentWidth();

    let timer;

    function handleResizeEvent() {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        setContentWidth();
      }, 404);

      return timer;
    }

    window.addEventListener("resize", handleResizeEvent);

    return () => window.removeEventListener("resize", handleResizeEvent);
  }, []);

  useEffect(() => {
    setFilteredMovieList(filterMovies(moviesList));
  }, [savedMoviesList, searchQuery, isShorts]);

  useEffect(() => {
    if (
      filteredMovieList.length !== moviesList.length &&
      filteredMovieList.length !== 0
    ) {
      localStorage.setItem(
        LS_FILTERED_MOVIES,
        JSON.stringify(filteredMovieList),
      );
    }
  }, [filteredMovieList]);

  useEffect(() => {
    const localFilteredMovies = localStorage.getItem(LS_FILTERED_MOVIES);
    if (localFilteredMovies) {
      setFilteredMovieList(JSON.parse(localFilteredMovies));
    }

    const isShortsChecked = localStorage.getItem(LS_IS_SHORTS) === "true";
    setIsShorts(isShortsChecked);
  }, []);

  useEffect(() => {
    setMorePage(0);
  }, [searchQuery, isShorts]);

  return (
    <main className="movies">
      <SearchForm
        onSearchSubmit={handleGetAllMovies}
        setSearchQuery={setSearchQuery}
        toggleShortsFilter={toggleShortsFilter}
        isShorts={isShorts}
      />
      <MoviesCardList
        savedMoviesList={savedMoviesList}
        filteredMovieList={filteredMovieList}
        renderedMovies={renderMovies()}
        searchQuery={searchQuery}
        numberOfCards={numberOfCards}
        morePage={morePage}
        handleIncrementMorePage={incrementMorePage}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
      />
    </main>
  );
}

export default Movies;
