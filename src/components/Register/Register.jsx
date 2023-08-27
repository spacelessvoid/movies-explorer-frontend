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
      <WelcomeInput type={"text"} labelText={"Имя"} />
      <WelcomeInput type={"email"} labelText={"E-mail"} />
      <WelcomeInput type={"password"} labelText={"Пароль"} />
    </WelcomeContent>
  );
}

export default Register;
