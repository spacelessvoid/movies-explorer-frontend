import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about" id="about">
      <h2 className="about__title section-title">Студент</h2>
      <div className="about__content">
        <h3 className="about__name">Алексей</h3>
        <p className="about__profession">Фронтенд-разработчик, 36 лет</p>
        <p className="about__bio">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat id
          consequatur atque deserunt doloribus perspiciatis voluptatibus
          assumenda natus sint accusantium delectus, expedita quasi facere
          velit?
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
