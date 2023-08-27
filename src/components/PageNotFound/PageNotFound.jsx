import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => (
  <>
    <main className="pnf">
      <div className="pnf__wrapper">
        <h1 className="pnf__title">404</h1>
        <p className="pnf__text">Страница не найдена</p>
      </div>
    </main>
    <footer className="pnf__footer">
      <Link className="pnf__link" to="/">
        Назад
      </Link>
    </footer>
  </>
);

export default PageNotFound;
