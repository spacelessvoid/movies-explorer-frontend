const API_3P_BASE_URL = "https://api.nomoreparties.co";
// const API_BASE_URL = "https://api.spacemovies.nomoreparties.co";
const API_BASE_URL = "http://127.0.0.1:3003";

// API call helper functions

const requestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
function checkResponseStatus(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}
function sendRequest(endpoint, options) {
  return fetch(endpoint, options).then(checkResponseStatus);
}

// RegEx for form validation

const NAME_REGEX = "[A-Za-zА-Яа-яЁё\\s\\-]+";
const EMAIL_REGEX = "^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$";

// Local storage variables

const LS_SEARCH_QUERY = "storageSearchQuery",
  LS_FILTERED_MOVIES = "storageFilteredMovies",
  LS_IS_SHORTS = "storageIsShorts";

export {
  API_3P_BASE_URL,
  API_BASE_URL,
  requestHeaders as headers,
  sendRequest,
  NAME_REGEX,
  EMAIL_REGEX,
  LS_SEARCH_QUERY,
  LS_FILTERED_MOVIES,
  LS_IS_SHORTS,
};
