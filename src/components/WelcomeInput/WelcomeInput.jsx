import "./WelcomeInput.css";

function WelcomeInput({
  type,
  labelText,
  value,
  placeholder,
  onChange,
  minLength,
  maxLength,
}) {
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
        placeholder={placeholder}
        onChange={onChange}
        required
        minLength={minLength}
        maxLength={maxLength}
      />
    </>
  );
}

export default WelcomeInput;
