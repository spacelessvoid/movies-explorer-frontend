import { Link, useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <>
      <main className="pnf">
        <section className="pnf__wrapper">
          <h1 className="pnf__title">404</h1>
          <p className="pnf__text">Страница не найдена</p>
        </section>
        <section className="pnf__footer">
          <Link
            className="link pnf__link"
            onClick={isLoggedIn ? () => navigate(-1) : () => navigate("/")}
          >
            Назад
          </Link>
        </section>
      </main>
    </>
  );
};

export default PageNotFound;
