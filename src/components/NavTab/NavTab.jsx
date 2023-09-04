import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <a href="#project" className="link navigation__link">
            О проекте
          </a>
        </li>
        <li className="navigation__list-item">
          <a href="#tech" className="link navigation__link">
            Технологии
          </a>
        </li>
        <li className="navigation__list-item">
          <a href="#about" className="link navigation__link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
