import { BASE_URL } from "./constants";

function getMoviesFrom3rdPartyApi() {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export { getMoviesFrom3rdPartyApi as getAllMovies };
