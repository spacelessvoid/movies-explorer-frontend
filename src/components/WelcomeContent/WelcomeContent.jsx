import "./WelcomeContent.css";
import logo from "../../images/header-logo.svg";
import WelcomeForm from "../WelcomeForm/WelcomeForm";
import { Link } from "react-router-dom";

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
      <div className="welcome__content">
        <img src={logo} alt="Logo" className="welcome__logo" />
        <h1 className="welcome__title">{title}</h1>
        <WelcomeForm buttonText={buttonText} onClick={onClick}>
          {children}
        </WelcomeForm>
        <p className="welcome__text">
          <span>{locationElse} </span>
					<Link className="welcome__link" to={locationLink}>{locationLinkText}</Link>
        </p>
      </div>
    </main>
  );
}

export default WelcomeContent;
