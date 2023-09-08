const API_3P_BASE_URL = "https://api.nomoreparties.co";
const API_BASE_URL = "https://api.spacemovies.nomoreparties.co";

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

export {
  API_3P_BASE_URL,
  API_BASE_URL,
  requestHeaders,
  sendRequest as headers,
};
