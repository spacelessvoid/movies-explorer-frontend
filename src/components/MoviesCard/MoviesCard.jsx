import "./MoviesCard.css";
import { useState } from "react";
import { API_3P_BASE_URL } from "../../utils/constants";

function MoviesCard({
  movie: { nameRU: name, duration, trailerLink, image },
  isPathSavedMovies,
}) {
  //TODO For testing, remove after
  const [isFavorite, setIsFavorite] = useState(false);

  function handleAddFavClick() {
    setIsFavorite(!isFavorite);
  }

  //TODO Should be in parent component
  // const isFavorite = owner.some();

  const cardButtonClassName = isPathSavedMovies
    ? `button card__btn card__del-btn`
    : `button card__btn card__fav-btn ${isFavorite && "card__fav-btn_active"}`;

  const cardButtonAriaLabel = isPathSavedMovies
    ? "Удалить из избранного"
    : "Добавить в избранное";

  function durationConvert(t) {
    const hours = Math.floor(t / 60);
    const minutes = t % 60;

    return `${hours}ч ${minutes}м`;
  }

  return (
    <article className="card">
      <a href={trailerLink} target="blank">
        <img
          src={API_3P_BASE_URL + image.url}
          alt={name}
          className="card__image"
        />
      </a>
      <div className="card__info">
        <div className="card__wrapper">
          <h2 className="card__name">{name}</h2>
          <button
            className={cardButtonClassName}
            type="button"
            aria-label={cardButtonAriaLabel}
            onClick={handleAddFavClick}
          />
        </div>
        <p className="card__duration">{durationConvert(duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
