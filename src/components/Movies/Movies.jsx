import { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ moviesList, handleGetAllMovies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovieList, setFilteredMovieList] = useState([]);

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
    setMorePage(prevValue => prevValue + 1);
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

  useEffect(() => {
    setFilteredMovieList(() =>
      moviesList.filter(
        movie =>
          movie.nameRU.toLowerCase().includes(searchQuery) ||
          movie.nameEN.toLowerCase().includes(searchQuery),
      ),
    );
  }, [searchQuery, moviesList]);

  useEffect(() => {
    calcNumberOfCards(document.body.clientWidth);
  }, []);

  useEffect(() => {
    setMorePage(0);
  }, [searchQuery]);

  return (
    <main className="movies">
      <SearchForm
        onSearchClick={handleGetAllMovies}
        setSearchQuery={setSearchQuery}
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
