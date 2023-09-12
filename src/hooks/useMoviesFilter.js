import { useState } from "react";
import {
  CARDS_PER_PAGE_1280,
  CARDS_PER_PAGE_320,
  CARDS_PER_PAGE_768,
  SHORT_DURATION,
} from "../utils/constants";

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
    let cards = {};

    if (contentWidth > 1088) {
      cards = CARDS_PER_PAGE_1280;
    }

    if (1088 > contentWidth && contentWidth > 689) {
      cards = CARDS_PER_PAGE_768;
    }

    if (contentWidth <= 689) {
      cards = CARDS_PER_PAGE_320;
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
      return filteredArray.filter(short => short.duration <= SHORT_DURATION);
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
