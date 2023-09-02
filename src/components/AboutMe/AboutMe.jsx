import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about" id="about">
      <h2 className="about__title section-title">Студент</h2>
      <div className="about__content">
        <h3 className="about__name">Алексей</h3>
        <p className="about__profession">Фронтенд-разработчик, 36 лет</p>
        <p className="about__bio">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <a
          href="https://github.com/spacelessvoid"
          className="link about__link"
          target="blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <div className="about__photo"></div>
      </div>
    </section>
  );
}

export default AboutMe;
