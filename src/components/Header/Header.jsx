import "./Header.css";
import logo from "../../images/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <div className="header__user">
        <a href="/sign-up" className="header__link">
          Регистрация
        </a>
        <a href="/sign-in" className="header__link header__button">
          Войти
        </a>
      </div>
    </header>
  );
}

export default Header;
