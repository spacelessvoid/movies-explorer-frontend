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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
      .catch(error => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAuthorization({ email, password }) {
    setPreRequestStates();

    handleUserAuthentication({ email, password })
      .catch(error => {
        setIsError(true);
        console.error(error);
      })
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
    setPreRequestStates();

    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      checkToken(jwt)
        .then(user => handleLogIn(user))
        .catch(error => {
          setIsError(true);
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }

  function handleLogIn(user) {
    setIsLoggedIn(true);
    setCurrentUser(user);
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setMoviesList([]);
    setSavedMoviesList([]);
    navigate("/");
  }

  function handleGetAllMovies() {
    setPreRequestStates();

    if (!moviesList.length) {
      getAllMovies()
        .then(movies => setMoviesList(movies))
        .then(() => {
          if (!savedMoviesList.length) {
            getSavedMovies().then(savedMovies =>
              setSavedMoviesList(savedMovies),
            );
          }
        })
        .catch(error => {
          setIsError(true);
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }
  //TODO filter by owner
  function handleGetSavedMovies() {
    setPreRequestStates();

    if (!savedMoviesList.length) {
      getSavedMovies()
        .then(movies =>
          setSavedMoviesList(() =>
            movies.filter(movie => movie.owner === currentUser._id),
          ),
        )
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
    setIsError(false);

    const movie = moviesList.find(movie => movie.id === movieId);

    saveNewMovie(movie)
      .then(newMovie => setSavedMoviesList([...savedMoviesList, newMovie]))
      .catch(error => {
        setIsError(true);
        console.error(error);
      });
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
      .catch(error => {
        setIsError(true);
        console.error(error);
      });
  }

  function handleUpdateUserInfo(input) {
    setPreRequestStates();

    updateUserInfo(input)
      .then(user => setCurrentUser(user))
      .catch(error => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, isError, setIsError }}>
        <CurrentUserContext.Provider value={currentUser}>
          {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}

          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path={registration}
              element={<Register handleRegistration={handleRegistration} />}
            />
            <Route
              path={login}
              element={<Login handleAuthorization={handleAuthorization} />}
            />

            <Route
              path={movies}
              element={
                <Movies
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
                <SavedMovies
                  handleGetSavedMovies={handleGetSavedMovies}
                  savedMoviesList={savedMoviesList}
                  handleDeleteMovie={handleDeleteMovie}
                />
              }
            />
            <Route
              path={profile}
              element={
                <Profile
                  handleUpdateUserInfo={handleUpdateUserInfo}
                  handleLogOut={handleLogOut}
                />
              }
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
