const API_3P_BASE_URL = "https://api.nomoreparties.co";
const API_BASE_URL = "https://api.spacemovies.nomoreparties.co";
// const API_BASE_URL = "http://127.0.0.1:3003";

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

// Rendered cards

const CARDS_PER_PAGE_1280 = { initialCards: 12, additionalCards: 3 };
const CARDS_PER_PAGE_768 = { initialCards: 8, additionalCards: 2 };
const CARDS_PER_PAGE_320 = { initialCards: 5, additionalCards: 2 };

const SHORT_DURATION = 40;

// RegEx for form validation

const NAME_REGEX = "[A-Za-zА-Яа-яЁё\\s\\-]+";
const EMAIL_REGEX = "^[a-zA-Z0-9+_.\\-]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]{2,4}$";

// Local storage variables

const LS_SEARCH_QUERY = "storageSearchQuery",
  LS_ALL_MOVIES = "storageAllMovies",
  LS_SAVED_MOVIES = "storageSavedMovies",
  LS_IS_SHORTS = "storageIsShorts";

// Messages

const MSG_PROFILE_UPDATE_SUCCESS = "Обновленные данные сохранены",
  MSG_EMPTY_SEARCH = "Введите название фильма",
  MSG_NOTHING_FOUND = "Ничего не найдено",
  MSG_SEARCH_ERROR =
    "Во время запроса произошла ошибка.\r\nВозможно, проблема с соединением или сервер недоступен.\r\nПодождите немного и попробуйте ещё раз";

// Errors

const ERROR_INVALID_REG_DATA = "При регистрации пользователя произошла ошибка.",
  ERROR_INVALID_AUTH_DATA = "Вы ввели неправильный логин или пароль.",
  ERROR_EMAIL_EXISTS = "Пользователь с таким email уже существует.",
  ERROR_INTERNAL_SERVER = "500 На сервере произошла ошибка.";

export {
  API_3P_BASE_URL,
  API_BASE_URL,
  requestHeaders as headers,
  sendRequest,
  NAME_REGEX,
  EMAIL_REGEX,
  LS_SEARCH_QUERY,
  LS_ALL_MOVIES,
  LS_SAVED_MOVIES,
  LS_IS_SHORTS,
  MSG_PROFILE_UPDATE_SUCCESS,
  MSG_EMPTY_SEARCH,
  MSG_NOTHING_FOUND,
  MSG_SEARCH_ERROR,
  ERROR_INVALID_REG_DATA,
  ERROR_INVALID_AUTH_DATA,
  ERROR_EMAIL_EXISTS,
  ERROR_INTERNAL_SERVER,
  CARDS_PER_PAGE_1280,
  CARDS_PER_PAGE_768,
  CARDS_PER_PAGE_320,
  SHORT_DURATION,
};
