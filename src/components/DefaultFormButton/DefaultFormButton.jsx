import "./DefaultFormButton.css";

function DefaultFormButton({ buttonText, onClick }) {
  return (
    <button className="button form-button" type="submit" onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default DefaultFormButton;
