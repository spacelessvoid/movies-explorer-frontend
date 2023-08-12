import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="https://ya.ru" className="portfolio__link">
            Статичный сайт
          </a>
          <span>↗</span>
        </li>
        <li className="portfolio__list-item">
          <a href="https://ya.ru" className="portfolio__link">
            Адаптивный сайт
          </a>
          <span>↗</span>
        </li>
        <li className="portfolio__list-item">
          <a href="https://ya.ru" className="portfolio__link">
            Одностраничное приложение
          </a>
          <span>↗</span>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
