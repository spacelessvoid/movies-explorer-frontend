import { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ moviesList, handleGetAllMovies }) {
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShorts, setIsShorts] = useState(false);

  const [numberOfCards, setNumberOfCards] = useState({
    initialCards: 0,
    additionalCards: 0,
  });
  const [morePage, setMorePage] = useState(0);

  console.log(numberOfCards, morePage);

  function calcNumberOfCards(contentWidth) {
    let initialCards, additionalCards;

    if (contentWidth >= 1088) {
      initialCards = 12;
      additionalCards = 3;
    }

    if (1088 > contentWidth > 689) {
      initialCards = 8;
      additionalCards = 2;
    }

    if (contentWidth <= 689) {
      initialCards = 5;
      additionalCards = 2;
    }

    setNumberOfCards({ initialCards, additionalCards });
  }

  function incrementMorePage() {
    setMorePage(prev => prev + 1);
    renderMovies();
  }

  function renderMovies() {
    const { initialCards, additionalCards } = numberOfCards;

    if (filteredMovieList.length > initialCards) {
      return filteredMovieList.slice(
        0,
        initialCards + additionalCards * morePage,
      );
    } else return filteredMovieList;
  }

  function toggleShortsFilter() {
    setIsShorts(prev => !prev);
  }

  useEffect(() => {
    setFilteredMovieList(() => {
      const filtered = moviesList.filter(
        movie =>
          movie.nameRU.toLowerCase().includes(searchQuery) ||
          movie.nameEN.toLowerCase().includes(searchQuery),
      );

      if (isShorts) {
        return filtered.filter(short => short.duration <= 40);
      }

      return filtered;
    });
  }, [moviesList, searchQuery, isShorts]);

  useEffect(() => {
    calcNumberOfCards(document.body.clientWidth);
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
        filteredMovieList={filteredMovieList}
        renderMovies={renderMovies}
        searchQuery={searchQuery}
        numberOfCards={numberOfCards}
        morePage={morePage}
        incrementMorePage={incrementMorePage}
      />
    </main>
  );
}

export default Movies;
