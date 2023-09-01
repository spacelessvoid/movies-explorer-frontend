import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <ul className="footer__bottom">
        <li className="footer__copy">©2023</li>
        <li>
          <a
            href="https://practicum.yandex.ru"
            className="footer__link"
            target="blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
        </li>
        <li>
          <a
            href="https://github.com/spacelessvoid/movies-explorer-frontend"
            className="footer__link"
            target="blank"
            rel="noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
