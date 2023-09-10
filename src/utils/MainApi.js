import { USER_ENDPOINT, MOVIES_ENDPOINT } from "./api-endpoints";
import { API_3P_BASE_URL, headers, sendRequest } from "./constants";

function getSavedMovies() {
  const token = localStorage.getItem("jwt");

  return sendRequest(MOVIES_ENDPOINT, {
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });
}

function saveNewMovie(movie) {
  const token = localStorage.getItem("jwt");

  return sendRequest(MOVIES_ENDPOINT, {
    method: "POST",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: API_3P_BASE_URL + movie.image.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: API_3P_BASE_URL + movie.image.formats.thumbnail.url,
      movieId: movie.id,
    }),
  });
}

function deleteSavedMovie(movieId) {
  const token = localStorage.getItem("jwt");

  return sendRequest(`${MOVIES_ENDPOINT}/${movieId}`, {
    method: "DELETE",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  });
}

function updateUserInfo({ name, email }) {
  const token = localStorage.getItem("jwt");

  return sendRequest(USER_ENDPOINT, {
    method: "PATCH",
    headers: { ...headers, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, email }),
  });
}

export { getSavedMovies, saveNewMovie, deleteSavedMovie, updateUserInfo };
