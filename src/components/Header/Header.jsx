import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { profile, movies, saved, login, registration } from "../../utils/paths";
import logo from "../../images/header-logo.svg";

function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      {isLoggedIn ? (
        <nav className="header__user">
          <NavLink
            to={movies}
            className={({ isActive }) =>
              isActive ? "header__link header__link_active" : "header__link"
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to={saved}
            className={({ isActive }) =>
              isActive ? "header__link header__link_active" : "header__link"
            }
          >
            Сохранённые фильмы
          </NavLink>
          <NavLink to={profile} className="header__profile-btn">
            <span>Аккаунт</span>
            <span></span>
          </NavLink>
          <label className="hamburger-menu" data-open={isOpen}>
            <input
              type="checkbox"
              checked={isOpen}
              onChange={handleMenuClick}
            />
          </label>
        </nav>
      ) : (
        <nav className="header__welcome">
          <NavLink to={registration} className="header__link">
            Регистрация
          </NavLink>
          <NavLink to={login} className="header__link header__button">
            Войти
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
