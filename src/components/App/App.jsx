import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
import "./App.css";
import { registerUser, authorizeUser, checkToken } from "../../utils/Auth";
import {
  getSavedMovies,
  saveNewMovie,
  deleteSavedMovie,
  getUserInfo,
  updateUserInfo,
} from "../../utils/MainApi";
import { getAllMovies } from "../../utils/MoviesApi";
import { profile, movies, saved, login, registration } from "../../utils/paths";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import usePath from "../../hooks/usePath";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const isPathProfile = usePath(profile);
  const isPathRegistration = usePath(registration);
  const isPathLogin = usePath(login);
  const isPageNotFound = usePath("/404");

  const isHeaderVisible = !(
    isPathRegistration ||
    isPathLogin ||
    isPageNotFound
  );
  const isFooterVisible = !(
    isPathProfile ||
    isPathRegistration ||
    isPathLogin ||
    isPageNotFound
  );

  function setPreRequestStates() {
    setIsLoading(true);
    setIsError(false);
  }

  function handleGetAllMovies() {
    setPreRequestStates();

    if (!moviesList.length) {
      getAllMovies()
        .then(movies => setMoviesList(movies))
        .catch(error => {
          setIsError(true);
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }

  function handleGetSavedMovies() {
    setPreRequestStates();

    if (!savedMoviesList.length) {
      getSavedMovies()
        .then(movies => setSavedMoviesList(movies))
        .catch(error => {
          setIsError(true);
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }

  function handleSaveMovie(movieId) {
    setPreRequestStates();

    const movie = moviesList.find(movie => movie.id === movieId);

    saveNewMovie(movie)
      .then(newMovie => setSavedMoviesList([...savedMoviesList, newMovie]))
      .catch(error => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, isError, setIsError }}>
        <CurrentUserContext.Provider value={currentUser}>
          {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path={registration} element={<Register />} />
            <Route path={login} element={<Login />} />

            <Route
              path={movies}
              element={
                <Movies
                  handleGetAllMovies={handleGetAllMovies}
                  moviesList={moviesList}
                  handleSaveMovie={handleSaveMovie}
                />
              }
            />
            <Route
              path={saved}
              element={
                <SavedMovies
                  handleGetSavedMovies={handleGetSavedMovies}
                  moviesList={savedMoviesList}
                />
              }
            />
            <Route
              path={profile}
              element={<Profile setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="/404" element={<PageNotFound />} />
          </Routes>

          {isFooterVisible && <Footer />}
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
