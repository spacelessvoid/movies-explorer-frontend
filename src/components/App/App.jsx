import { Routes, Route } from "react-router-dom";
import * as path from "../../utils/paths";
//TODO remove after testing
import * as movies from "../../temp/data";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import "./App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="page">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        {/* TODO Update data after testing */}
        <Route path={path.movies} element={<Movies movies={movies.data} />} />
        <Route
          path={path.saved}
          element={<SavedMovies movies={movies.data} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
