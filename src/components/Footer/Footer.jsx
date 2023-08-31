import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__bottom">
        <p className="footer__copy">©2023</p>
        <a href="https://practicum.yandex.ru" className="footer__link">
          Яндекс.Практикум
        </a>
        <a
          href="https://github.com/spacelessvoid/movies-explorer-frontend"
          className="footer__link"
        >
          Github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
