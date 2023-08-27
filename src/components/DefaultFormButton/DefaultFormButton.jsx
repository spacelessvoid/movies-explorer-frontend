import "./DefaultFormButton.css";

function DefaultFormButton({ buttonText, onClick }) {
  return (
    <button className="form__button" type="submit" onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default DefaultFormButton;
