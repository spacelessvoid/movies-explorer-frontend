import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./SearchForm.css";
import {
  LS_IS_SHORTS,
  LS_SEARCH_QUERY,
  MSG_EMPTY_SEARCH,
} from "../../utils/constants";
import { saved } from "../../utils/paths";
import usePath from "../../hooks/usePath";

function SearchForm({
  onSearchSubmit,
  setSearchQuery,
  toggleShortsFilter,
  isShorts,
}) {
  const [input, setInput] = useState("");

  const { isLoading, isError, setIsError } = useContext(AppContext);

  const isPathSavedMovies = usePath(saved);

  function onChange(e) {
    setInput(e.target.value);
  }

  function onCheckboxToggle() {
    if (!isPathSavedMovies) localStorage.setItem(LS_IS_SHORTS, !isShorts);
    toggleShortsFilter();
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsError(false);

    if (!input) {
      setIsError(true);

      setTimeout(() => {
        document.getElementById("searchField").focus();
      }, 5);

      return;
    }

    if (!isPathSavedMovies) localStorage.setItem(LS_SEARCH_QUERY, input);

    onSearchSubmit();
    setSearchQuery(input.toLowerCase());
  }

  useEffect(() => {
    if (!isPathSavedMovies) {
      const localSearchQuery = localStorage.getItem(LS_SEARCH_QUERY);
      if (localSearchQuery) {
        setInput(localSearchQuery);
        setSearchQuery(localSearchQuery);
      }
    }
  }, []);

  return (
    <section className="search">
      <form
        id="search"
        className="search__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className="search__fieldset">
          <input
            id="searchField"
            type="text"
            className={`search__input ${isError && "search__input-error"}`}
            placeholder={isError ? MSG_EMPTY_SEARCH : "Найти фильм"}
            required
            autoFocus
            disabled={isLoading}
            value={input}
            onChange={onChange}
          />
          <button
            type="submit"
            className="button search__button"
            aria-label="Искать фильмы"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
            >
              <rect width="34" height="34" rx="17" fill="#4285F4" />
              <path
                d="M15 23L20 17L15 11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </fieldset>

        <fieldset className="search__shorts">
          <input
            form="search"
            id="shorts"
            type="checkbox"
            className="search__checkbox"
            checked={isShorts}
            onChange={onCheckboxToggle}
          />
          <label htmlFor="shorts"></label>
          <label htmlFor="shorts" className="search__label">
            Короткометражки
          </label>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
