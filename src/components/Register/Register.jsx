import { login } from "../../utils/paths";
import { NAME_REGEX, EMAIL_REGEX } from "../../utils/constants";
import useForm from "../../hooks/useForm";
import WelcomeContent from "../WelcomeContent/WelcomeContent";
import WelcomeInput from "../WelcomeInput/WelcomeInput";

function Register({ handleRegistration }) {
  const { inputValues, isValid, errorMessage, handleChange, handleValidation } =
    useForm();

  function handleSubmit(e) {
    e.preventDefault();

    handleRegistration(inputValues);
  }

  return (
    <WelcomeContent
      title={"Добро пожаловать!"}
      buttonText={"Зарегистрироваться"}
      locationElse={"Уже зарегистрированы?"}
      locationLinkText={"Войти"}
      locationLink={login}
      errorMessage={errorMessage}
      isButtonDisabled={!isValid}
      onSubmit={handleSubmit}
    >
      <WelcomeInput
        type={"text"}
        name={"name"}
        labelText={"Имя"}
        minLength={"2"}
        maxLength={"30"}
        placeholder={"Как вас зовут?"}
        pattern={NAME_REGEX}
        value={inputValues.name}
        onChange={handleChange}
        onBlur={handleValidation}
        isValid={isValid}
      />
      <WelcomeInput
        type={"email"}
        labelText={"E-mail"}
        placeholder={"Укажите ваш e-mail"}
        pattern={EMAIL_REGEX}
        value={inputValues.email}
        onChange={handleChange}
        onBlur={handleValidation}
        isValid={isValid}
      />
      <WelcomeInput
        type={"password"}
        labelText={"Пароль"}
        minLength={"8"}
        placeholder={"Придумайте надежный пароль"}
        value={inputValues.password}
        onChange={handleChange}
        onBlur={handleValidation}
        isValid={isValid}
      />
    </WelcomeContent>
  );
}

export default Register;
