import "./Techs.css";

function Techs() {
  return (
    <section className="tech" id="tech">
      <div className="tech__wrapper">
        <h2 className="tech__title section-title">Технологии</h2>
        <div className="tech__content">
          <h3 className="tech__text-focus">7 технологий</h3>
          <p className="tech__text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="tech__list">
            <li className="tech__list-item">HTML</li>
            <li className="tech__list-item">CSS</li>
            <li className="tech__list-item">JS</li>
            <li className="tech__list-item">React</li>
            <li className="tech__list-item">Git</li>
            <li className="tech__list-item">Express.js</li>
            <li className="tech__list-item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
