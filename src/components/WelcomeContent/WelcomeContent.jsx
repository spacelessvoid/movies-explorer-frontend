import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Link } from "react-router-dom";
import "./WelcomeContent.css";
import Logo from "../Logo/Logo";
import DefaultFormButton from "../DefaultFormButton/DefaultFormButton";

function WelcomeContent({
  children,
  title,
  buttonText,
  locationElse,
  locationLink,
  locationLinkText,
  errorMessage,
  isButtonDisabled,
  onSubmit,
}) {
  const { isLoading } = useContext(AppContext);

  const isDisabled = isButtonDisabled === !isLoading;

  return (
    <main className="welcome">
      <section className="welcome__content">
        <Logo isPositionHeader={false} />
        <h1 className="welcome__title">{title}</h1>

        <form
          id="welcome-form"
          className="welcome__form"
          noValidate
          onSubmit={onSubmit}
          disabled={!isLoading}
        >
          {children}
          <p
            className={`welcome__error-text ${
              errorMessage && "welcome__error-text_visible"
            }`}
          >
            {errorMessage}
          </p>
          <DefaultFormButton buttonText={buttonText} isDisabled={isDisabled} />
        </form>

        <p className="welcome__text">
          <span>{locationElse} </span>
          <Link className="link welcome__link" to={locationLink}>
            {locationLinkText}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default WelcomeContent;
