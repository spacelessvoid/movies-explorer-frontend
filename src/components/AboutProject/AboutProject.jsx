import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project" id="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__content">
        <p className="project__text-focus">Дипломный проект включал 5 этапов</p>
        <p className="project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="project__text-focus">
          На выполнение диплома ушло 5 недель
        </p>
        <p className="project__text">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
        <div className="project__timeline timeline">
          <div className="timeline__item">1 неделя</div>
          <div className="timeline__item">4 недели</div>
          <div className="timeline__item">Back-end</div>
          <div className="timeline__item">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
