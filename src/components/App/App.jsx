import { Routes, Route } from "react-router-dom";
import * as route from "../../utils/routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import "./App.css";

function App() {
  return (
    <div className="page">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path={route.movies} element={<Movies />} /> */}
        {/* <Route path={route.saved} element={<SavedMovies />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
