import WelcomeContent from "../WelcomeContent/WelcomeContent";
import WelcomeInput from "../WelcomeInput/WelcomeInput";
import { login } from "../../utils/paths";

function Register() {
  return (
    <WelcomeContent
      title={"Добро пожаловать!"}
      buttonText={"Зарегистрироваться"}
      locationElse={"Уже зарегистрированы?"}
      locationLinkText={"Войти"}
      locationLink={login}
    >
      <WelcomeInput
        type={"text"}
        labelText={"Имя"}
        minLength={"2"}
        maxLength={"30"}
        placeholder={"Как вас зовут?"}
      />
      <WelcomeInput type={"email"} labelText={"E-mail"} placeholder={"Укажите ваш e-mail"} />
      <WelcomeInput type={"password"} labelText={"Пароль"} minLength={"8"} placeholder={"Придумайте надежный пароль"} />
    </WelcomeContent>
  );
}

export default Register;
