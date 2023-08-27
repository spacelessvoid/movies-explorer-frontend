import "./WelcomeForm.css";
import DefaultFormButton from "../DefaultFormButton/DefaultFormButton";

function WelcomeForm({ children, buttonText, onClick }) {
  return (
    <form action="" className="welcome__form" noValidate>
      {children}
      <p className="welcome__error-text">Что-то пошло не так...</p>
      <DefaultFormButton buttonText={buttonText} onClick={onClick} />
    </form>
  );
}

export default WelcomeForm;
