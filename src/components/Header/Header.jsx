import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { profile, movies, saved, login, registration } from "../../utils/paths";
import Logo from "../Logo/Logo";

function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="header">
      <Logo isPositionHeader={true} />
      {isLoggedIn ? (
        <>
          <label className="hamburger-menu" data-open={isOpen}>
            <input
              type="checkbox"
              checked={isOpen}
              onChange={handleMenuClick}
            />
          </label>
          <nav className="header__user">
            <NavLink
              onClick={handleCloseMenu}
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "link header__hidden header__link header__link_active"
                  : "link header__hidden header__link"
              }
            >
              Главная
            </NavLink>
            <NavLink
              onClick={handleCloseMenu}
              to={movies}
              className={({ isActive }) =>
                isActive
                  ? "link header__link header__link_active"
                  : "link header__link"
              }
            >
              Фильмы
            </NavLink>
            <NavLink
              onClick={handleCloseMenu}
              to={saved}
              className={({ isActive }) =>
                isActive
                  ? "link header__link header__link_active"
                  : "link header__link"
              }
            >
              Сохранённые фильмы
            </NavLink>
            <NavLink
              onClick={handleCloseMenu}
              to={profile}
              className="link header__profile-btn"
            >
              <span>Аккаунт</span>
              <span></span>
            </NavLink>
          </nav>
        </>
      ) : (
        <nav className="header__welcome">
          <NavLink to={registration} className="link header__link">
            Регистрация
          </NavLink>
          <NavLink to={login} className="link header__link header__button">
            Войти
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
