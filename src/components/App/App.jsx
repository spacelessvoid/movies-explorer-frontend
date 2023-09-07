import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";
import "./App.css";
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

  function handleGetAllMovies() {
    setIsLoading(true);
    setIsError(false);
    if (!moviesList.length) {
      getAllMovies()
        .then(data => setMoviesList(data))
        .catch(error => {
          setIsError(true);
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, isError }}>
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
                />
              }
            />
            <Route path={saved} element={<SavedMovies />} />
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
