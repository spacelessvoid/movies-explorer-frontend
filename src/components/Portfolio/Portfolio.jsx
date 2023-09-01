import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://github.com/spacelessvoid/how-to-learn"
            className="portfolio__link"
            target="blank"
            rel="noreferrer"
          >
            <span>Статичный сайт</span>
            <span>↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/spacelessvoid/russian-travel"
            className="portfolio__link"
            target="blank"
            rel="noreferrer"
          >
            <span>Адаптивный сайт</span>
            <span>↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/spacelessvoid/react-mesto-api-full-gha"
            className="portfolio__link"
            target="blank"
            rel="noreferrer"
          >
            <span>Одностраничное приложение</span>
            <span>↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
