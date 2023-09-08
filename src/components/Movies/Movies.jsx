import { useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import useMoviesFilter from "../../hooks/useMoviesFilter";

function Movies({ moviesList, handleGetAllMovies }) {
  const {
    filteredMovieList,
    setFilteredMovieList,
    searchQuery,
    setSearchQuery,
    isShorts,
    numberOfCards,
    morePage,
    setMorePage,
    setContentWidth,
    toggleShortsFilter,
    incrementMorePage,
    filterMovies,
    renderMovies,
  } = useMoviesFilter();

  // console.log(numberOfCards);

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
  }, [moviesList, searchQuery, isShorts]);

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
        filteredMovieList={filteredMovieList}
        renderMovies={renderMovies}
        searchQuery={searchQuery}
        numberOfCards={numberOfCards}
        morePage={morePage}
        handleIncrementMorePage={incrementMorePage}
      />
    </main>
  );
}

export default Movies;
