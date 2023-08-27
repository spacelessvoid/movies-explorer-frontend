import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import * as path from "../../utils/paths";
//TODO remove after testing
import * as data from "../../temp/data";
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
  const { profile, movies, saved, login, registration } = path;
  const isPathProfile = usePath(profile);
  const isPathRegistration = usePath(registration);
  const isPathLogin = usePath(login);
  const isPageNotFound = usePath("/404");

  return (
    <div className="page">
      {!(isPathRegistration || isPathLogin || isPageNotFound) && <Header />}

      <Routes>
        <Route path="/" element={<Main />} />
        {/* TODO Update data after testing */}
        <Route path={movies} element={<Movies movies={data.data} />} />
        <Route path={saved} element={<SavedMovies movies={data.data} />} />
        <Route path={profile} element={<Profile />} />
        <Route path={registration} element={<Register />} />
        <Route path={login} element={<Login />} />

        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<PageNotFound />} />
      </Routes>

      {!(
        isPathProfile ||
        isPathRegistration ||
        isPathLogin ||
        isPageNotFound
      ) && <Footer />}
    </div>
  );
}

export default App;
