import "./MoviesCard.css";
import { useState } from "react";

function MoviesCard({
  movie: { nameRU: name, duration, owner },
  isPathSavedMovies,
}) {
  //TODO For testing, remove after
  const [isFavorite, setIsFavorite] = useState(false);

  const image =
    "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg";

  function handleAddFavClick() {
    setIsFavorite(!isFavorite);
  }

  //TODO Should be in parent component
  // const isFavorite = owner.some();

  const cardButtonClassName = isPathSavedMovies
    ? `card__btn card__del-btn`
    : `card__btn card__fav-btn ${isFavorite && "card__fav-btn_active"}`;

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
      <img src={image} alt={name} className="card__image" />
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
