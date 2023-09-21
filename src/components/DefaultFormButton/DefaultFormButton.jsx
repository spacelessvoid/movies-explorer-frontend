import "./DefaultFormButton.css";

function DefaultFormButton({ buttonText, isDisabled = true }) {
  return (
    <button className="button form-button" type="submit" disabled={isDisabled}>
      {buttonText}
    </button>
  );
}

export default DefaultFormButton;
