import "./WelcomeInput.css";

function WelcomeInput({
  type,
  name = type,
  labelText,
  value,
  placeholder,
  minLength = null,
  maxLength = null,
  pattern = null,
  onChange,
  onBlur,
  isValid,
}) {
  return (
    <>
      <label className="welcome__label" htmlFor={type}>
        {labelText}
      </label>
      <input
        className="welcome__input"
        data-valid={isValid}
        type={type}
        name={name}
        id={name}
        value={value ?? ""}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
}

export default WelcomeInput;
