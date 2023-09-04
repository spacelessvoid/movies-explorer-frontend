import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about" id="about">
      <h2 className="about__title section-title">Студент</h2>
      <div className="about__content">
        <h3 className="about__name">Алексей</h3>
        <p className="about__profession">Фронтенд-разработчик, 36 лет</p>
        <p className="about__bio">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem id temporibus iusto, quo reiciendis non quaerat sint,
          aperiam aut quibusdam placeat quos? Illo officiis, sed odit quibusdam
          voluptates aut qui!
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
