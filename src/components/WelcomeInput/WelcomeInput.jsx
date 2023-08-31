import "./WelcomeInput.css";

function WelcomeInput({ type, labelText, value, onChange }) {
  return (
    <>
      <label className="welcome__label" htmlFor={type}>
        {labelText}
      </label>
      <input
        className="welcome__input"
        type={type}
        name={type}
        id={type}
        value={value}
        onChange={onChange}
        required
      />
    </>
  );
}

export default WelcomeInput;
