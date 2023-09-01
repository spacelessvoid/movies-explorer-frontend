import "./WelcomeContent.css";
import { Link } from "react-router-dom";
import WelcomeForm from "../WelcomeForm/WelcomeForm";
import Logo from "../Logo/Logo";

function WelcomeContent({
  children,
  title,
  buttonText,
  locationElse,
  locationLink,
  locationLinkText,
  onClick,
}) {
  return (
    <main className="welcome">
      <section className="welcome__content">
        <Logo isPositionHeader={false} />
        <h1 className="welcome__title">{title}</h1>
        <WelcomeForm buttonText={buttonText} onClick={onClick}>
          {children}
        </WelcomeForm>
        <p className="welcome__text">
          <span>{locationElse} </span>
          <Link className="welcome__link" to={locationLink}>
            {locationLinkText}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default WelcomeContent;
