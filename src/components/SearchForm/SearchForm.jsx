import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <form id="search" className="search__form">
        <fieldset className="search__fieldset">
          <input type="text" className="search__input" placeholder="Фильм" />
          <button
            type="submit"
            className="search__button"
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