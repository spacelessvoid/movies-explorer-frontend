import { USER_ENDPOINT, MOVIES_ENDPOINT } from "./api-endpoints";
import { headers, sendRequest } from "./constants";

function getSavedMovies() {
  return sendRequest(MOVIES_ENDPOINT, {
    headers,
  });
}

function saveNewMovie(movie) {
  return sendRequest(MOVIES_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(movie),
  });
}

function deleteSavedMovie(movieID) {
  return sendRequest(`${MOVIES_ENDPOINT}/${movieID}`, {
    method: "DELETE",
    headers,
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
