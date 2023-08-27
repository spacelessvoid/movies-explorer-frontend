import WelcomeContent from "../WelcomeContent/WelcomeContent";
import WelcomeInput from "../WelcomeInput/WelcomeInput";
import { registration } from "../../utils/paths";

function Login() {
  return (
    <WelcomeContent
      title={"Рады видеть!"}
      buttonText={"Войти"}
      locationElse={"Ещё не зарегистрированы?"}
      locationLinkText={"Регистрация"}
      locationLink={registration}
    >
      <WelcomeInput type={"email"} labelText={"E-mail"} />
      <WelcomeInput type={"password"} labelText={"Пароль"} />
    </WelcomeContent>
  );
}

export default Login;
