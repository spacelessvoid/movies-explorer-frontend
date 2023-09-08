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

function getUserInfo() {
  return sendRequest(USER_ENDPOINT, {
    headers,
  });
}

function updateUserInfo({ name, email }) {
  return sendRequest(USER_ENDPOINT, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ name, email }),
  });
}

export {
  getSavedMovies,
  saveNewMovie,
  deleteSavedMovie,
  getUserInfo,
  updateUserInfo,
};
