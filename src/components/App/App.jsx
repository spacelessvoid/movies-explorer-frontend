import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
import "./App.css";
import { registerUser, authenticateUser, checkToken } from "../../utils/Auth";
import {
  getSavedMovies,
  saveNewMovie,
  deleteSavedMovie,
  getUserInfo,
  updateUserInfo,
} from "../../utils/MainApi";
import { getAllMovies } from "../../utils/MoviesApi";
import { profile, movies, saved, login, registration } from "../../utils/paths";
import {
  ERROR_INVALID_REG_DATA,
  ERROR_INVALID_AUTH_DATA,
  ERROR_EMAIL_EXISTS,
  ERROR_INTERNAL_SERVER,
  LS_ALL_MOVIES,
  LS_SAVED_MOVIES,
} from "../../utils/constants";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resultSuccess, setResultSuccess] = useState(false);

  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const navigate = useNavigate();

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

  function handleRegistration({ name, email, password }) {
    setPreRequestStates();

    registerUser(name, email, password)
      .then(() => handleUserAuthentication({ email, password }))
      .catch(error => processErrorCatch(error))
      .finally(() => setIsLoading(false));
  }

  function handleAuthorization({ email, password }) {
    setPreRequestStates();

    handleUserAuthentication({ email, password })
      .catch(error => processErrorCatch(error))
      .finally(() => setIsLoading(false));
  }

  function handleUserAuthentication({ email, password }) {
    return authenticateUser(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return checkToken(data.token);
        }
      })
      .then(user => {
        handleLogIn(user);
        navigate(movies, { replace: true });
      });
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      checkToken(jwt)
        .then(user => handleLogIn(user))
        .catch(error => processErrorCatch(error))
        .finally(() => setFirstLoad(false));
    } else {
      setFirstLoad(false);
    }
  }

  function handleLogIn(user) {
    setIsLoggedIn(true);
    setCurrentUser(user);
  }

  function handleLogOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setMoviesList([]);
    setSavedMoviesList([]);
    navigate("/");
  }

  function handleGetAllMovies() {
    setPreRequestStates();

    if (!moviesList.length) {
      getAllMovies()
        .then(movies => {
          setMoviesList(movies);
          localStorage.setItem(LS_ALL_MOVIES, JSON.stringify(movies));
        })
        .then(() => {
          if (!savedMoviesList.length) {
            getSavedMovies().then(savedMovies => {
              setSavedMoviesList(savedMovies);
              localStorage.setItem(
                LS_SAVED_MOVIES,
                JSON.stringify(savedMovies),
              );
            });
          }
        })
        .catch(error => processErrorCatch(error))
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
        .catch(error => processErrorCatch(error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }

  function handleSaveMovie(movieId) {
    setIsError(false);

    const movie = moviesList.find(movie => movie.id === movieId);

    saveNewMovie(movie)
      .then(newMovie => setSavedMoviesList([...savedMoviesList, newMovie]))
      .catch(error => processErrorCatch(error));
  }

  function handleDeleteMovie(movieId) {
    setIsError(false);

    const savedMovie = savedMoviesList.find(
      savedMovie => savedMovie.movieId === movieId,
    );

    deleteSavedMovie(savedMovie._id)
      .then(deletedMovie =>
        setSavedMoviesList(() =>
          savedMoviesList.filter(
            movie => movie.movieId !== deletedMovie.movieId,
          ),
        ),
      )
      .catch(error => processErrorCatch(error));
  }

  function handleUpdateUserInfo(input) {
    setPreRequestStates();

    updateUserInfo(input)
      .then(user => setCurrentUser(user))
      .then(() => setResultSuccess(true))
      .catch(error => processErrorCatch(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function processErrorCatch(error, message = "") {
    setIsError(true);
    setResultSuccess(message);
    if (error === 400) {
      console.log(ERROR_INVALID_REG_DATA);
    } else if (error === 401) {
      console.log(ERROR_INVALID_AUTH_DATA);
    } else if (error === 403) {
      console.log(ERROR_INVALID_AUTH_DATA);
    } else if (error === 409) {
      console.log(ERROR_EMAIL_EXISTS);
    } else if (error === 500) {
      console.log(ERROR_INTERNAL_SERVER);
    } else {
      console.error(error);
    }
  }

  useEffect(() => {
    handleCheckToken();

    const localAllMovies = JSON.parse(localStorage.getItem(LS_ALL_MOVIES));
    const localSavedMovies = JSON.parse(localStorage.getItem(LS_SAVED_MOVIES));

    if (localAllMovies) {
      setMoviesList(localAllMovies);
      setSavedMoviesList(localSavedMovies);
    }
  }, []);

  useEffect(() => {
    if (savedMoviesList.length !== 0)
      localStorage.setItem(LS_SAVED_MOVIES, JSON.stringify(savedMoviesList));
  }, [savedMoviesList]);

  return (
    <div className="page">
      <AppContext.Provider
        value={{
          isLoading,
          isError,
          setIsError,
          resultSuccess,
          setResultSuccess,
        }}
      >
        {firstLoad ? (
          <Preloader />
        ) : (
          <CurrentUserContext.Provider value={currentUser}>
            {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}

            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path={registration}
                element={
                  <ProtectedRoute
                    element={Register}
                    isLoggedIn={!isLoggedIn}
                    navigate="/"
                    handleRegistration={handleRegistration}
                  />
                }
              />
              <Route
                path={login}
                element={
                  <ProtectedRoute
                    element={Login}
                    isLoggedIn={!isLoggedIn}
                    navigate="/"
                    handleAuthorization={handleAuthorization}
                  />
                }
              />

              <Route
                path={movies}
                element={
                  <ProtectedRoute
                    element={Movies}
                    isLoggedIn={isLoggedIn}
                    handleGetAllMovies={handleGetAllMovies}
                    moviesList={moviesList}
                    savedMoviesList={savedMoviesList}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                }
              />
              <Route
                path={saved}
                element={
                  <ProtectedRoute
                    element={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    handleGetSavedMovies={handleGetSavedMovies}
                    savedMoviesList={savedMoviesList}
                    handleDeleteMovie={handleDeleteMovie}
                  />
                }
              />
              <Route
                path={profile}
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    handleUpdateUserInfo={handleUpdateUserInfo}
                    handleLogOut={handleLogOut}
                  />
                }
              />

              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route
                path="/404"
                element={<PageNotFound isLoggedIn={isLoggedIn} />}
              />
            </Routes>

            {isFooterVisible && <Footer />}
          </CurrentUserContext.Provider>
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
