import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project" id="project">
      <h2 className="project__title section-title">О проекте</h2>
      <div className="project__content">
        <h3 className="project__text-focus">Дипломный проект включал 5 этапов</h3>
        <p className="project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="project__text-focus">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
        <div className="project__timeline timeline">
          <p className="timeline__item">1 неделя</p>
          <p className="timeline__item">4 недели</p>
          <p className="timeline__item">Back-end</p>
          <p className="timeline__item">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
