import { useState, useContext, useRef } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./SearchForm.css";

function SearchForm({
  onSearchSubmit,
  setSearchQuery,
  toggleShortsFilter,
  isShorts,
}) {
  const [input, setInput] = useState("");
  const searchField = useRef(null);

  const { isLoading, isError, setIsError } = useContext(AppContext);

  const errorText = "Введите название фильма" //TODO Move all text strings to constants.js

  function onChange(e) {
    setInput(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();

    setIsError(false);

    if (!input) {
      setIsError(true);

      setTimeout(() => {
        searchField.current.focus();
      }, 1);

      return;
    }

    onSearchSubmit();
    setSearchQuery(input);
  }

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
            type="text"
            className={`search__input ${isError && "search__input-error"}`}
            placeholder={isError ? errorText : "Найти фильм"} //TODO
            required
            autoFocus
            disabled={isLoading}
            value={input}
            checked={isShorts}
            onChange={onChange}
            ref={searchField}
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
            onClick={toggleShortsFilter}
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
