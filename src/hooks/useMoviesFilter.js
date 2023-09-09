import { useState } from "react";

function useMoviesFilter() {
  const [filteredMovieList, setFilteredMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isShorts, setIsShorts] = useState(false);

  const [numberOfCards, setNumberOfCards] = useState({
    initialCards: 0,
    additionalCards: 0,
  });
  const [morePage, setMorePage] = useState(0);

  function setContentWidth() {
    setNumberOfCards(calcNumberOfCards(document.body.clientWidth));
  }

  function calcNumberOfCards(contentWidth) {
    const cards = { initialCards: 0, additionalCards: 0 };

    if (contentWidth > 1088) {
      cards.initialCards = 12;
      cards.additionalCards = 3;
    }

    if (1088 > contentWidth && contentWidth > 689) {
      cards.initialCards = 8;
      cards.additionalCards = 2;
    }

    if (contentWidth <= 689) {
      cards.initialCards = 5;
      cards.additionalCards = 2;
    }

    return cards;
  }

  function toggleShortsFilter() {
    setIsShorts(prev => !prev);
  }

  function incrementMorePage() {
    setMorePage(prev => prev + 1);
    renderMovies();
  }

  function filterMovies(moviesArray) {
    const filteredArray = moviesArray.filter(
      movie =>
        movie.nameRU.toLowerCase().includes(searchQuery) ||
        movie.nameEN.toLowerCase().includes(searchQuery),
    );

    if (isShorts) {
      return filteredArray.filter(short => short.duration <= 40);
    }

    return filteredArray;
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

  return {
    filteredMovieList,
    setFilteredMovieList,
    searchQuery,
    setSearchQuery,
    isShorts,
    setIsShorts,
    numberOfCards,
    setNumberOfCards,
    morePage,
    setMorePage,
    setContentWidth,
    calcNumberOfCards,
    toggleShortsFilter,
    incrementMorePage,
    filterMovies,
    renderMovies,
  };
}

export default useMoviesFilter;
