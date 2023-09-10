import { useState } from "react";
import "./MoviesCard.css";
import { API_3P_BASE_URL } from "../../utils/constants";

function MoviesCard({
  movie: { nameRU: name, duration, trailerLink, image, id = null, movieId },
  saved,
  isPathSavedMovies,
  handleSaveMovie,
  handleDeleteMovie,
}) {
  const [isSaved, setIsSaved] = useState(saved);

  const cardImage = isPathSavedMovies ? image : API_3P_BASE_URL + image.url;

  const cardButtonClassName = isPathSavedMovies
    ? `button card__btn card__del-btn`
    : `button card__btn card__fav-btn`;

  const cardButtonAriaLabel = isPathSavedMovies
    ? "Удалить из избранного"
    : "Добавить в избранное";

  function handleLikeButtonClick() {
    if (!isSaved && !isPathSavedMovies)
      Promise.resolve(handleSaveMovie(id)).then(() => setIsSaved(true));

    if (isSaved)
      Promise.resolve(handleDeleteMovie(id ?? movieId)).then(() =>
        setIsSaved(false),
      );
  }

  function convertDuration(t) {
    const hours = Math.floor(t / 60);
    const minutes = t % 60;

    let duration = hours < 1 ? `${minutes}м` : `${hours}ч ${minutes}м`;

    return duration;
  }

  return (
    <article className="card" data-saved={isSaved}>
      <a href={trailerLink} target="blank">
        <img src={cardImage} alt={name} className="card__image" />
      </a>
      <div className="card__info">
        <div className="card__wrapper">
          <h2 className="card__name">{name}</h2>
          <button
            className={cardButtonClassName}
            type="button"
            aria-label={cardButtonAriaLabel}
            onClick={handleLikeButtonClick}
          />
        </div>
        <p className="card__duration">{convertDuration(duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
