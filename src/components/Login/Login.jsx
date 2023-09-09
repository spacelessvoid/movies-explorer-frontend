import { registration } from "../../utils/paths";
import { EMAIL_REGEX } from "../../utils/constants";
import useForm from "../../hooks/useForm";
import WelcomeContent from "../WelcomeContent/WelcomeContent";
import WelcomeInput from "../WelcomeInput/WelcomeInput";

function Login({ handleAuthorization }) {
  const { inputValues, isValid, errorMessage, handleChange, handleValidation } =
    useForm();

  function handleAuthorization() {}

  function handleSubmit() {}

  return (
    <WelcomeContent
      title={"Рады видеть!"}
      buttonText={"Войти"}
      locationElse={"Ещё не зарегистрированы?"}
      locationLinkText={"Регистрация"}
      locationLink={registration}
      errorMessage={errorMessage}
      isButtonDisabled={!isValid}
      onSubmit={handleSubmit}
    >
      <WelcomeInput
        type={"email"}
        labelText={"E-mail"}
        placeholder={"Введите ваш e-mail"}
        pattern={EMAIL_REGEX}
        value={inputValues.email}
        onChange={handleChange}
        onBlur={handleValidation}
      />
      <WelcomeInput
        type={"password"}
        labelText={"Пароль"}
        minLength={"8"}
        placeholder={"Введите ваш пароль"}
        value={inputValues.password}
        onChange={handleChange}
        onBlur={handleValidation}
      />
    </WelcomeContent>
  );
}

export default Login;
