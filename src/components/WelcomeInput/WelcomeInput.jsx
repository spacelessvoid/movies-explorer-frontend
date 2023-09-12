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
}) {
  return (
    <>
      <label className="welcome__label" htmlFor={type}>
        {labelText}
      </label>
      <input
        className="welcome__input"
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
