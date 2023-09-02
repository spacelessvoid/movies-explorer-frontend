import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import DefaultFormButton from "../DefaultFormButton/DefaultFormButton";

function Profile({
  username = "@username",
  userEmail = "test@test.test",
  setIsLoggedIn,
}) {
  const [isDisabled, setIsDisabled] = useState(true);

  const input = useRef(null);

  const navigate = useNavigate();

  function handleEnableEditing(e) {
    e.preventDefault();

    setIsDisabled(false);

    setTimeout(() => {
      input.current.focus();
    }, 1);
  }

  function handleDisableEditing(e) {
    e.preventDefault();

    setIsDisabled(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);

    navigate("/");
  }

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {username}!</h1>
      <section>
        <form className="profile__form">
          <fieldset className="profile__fieldset">
            <label htmlFor="name" className="profile__label">
              Имя
            </label>
            <input
              id="name"
              ref={input}
              value={username}
              type="text"
              className="profile__input"
              disabled={isDisabled}
              placeholder="введите ваше имя"
              required
              minLength="2"
              maxLength="30"
            />
          </fieldset>
          <fieldset className="profile__fieldset">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              id="email"
              value={userEmail}
              type="email"
              className="profile__input"
              disabled={isDisabled}
              placeholder="введите ваш e-mail"
              required
            />
          </fieldset>
          {isDisabled ? (
            <>
              <button
                className="button profile__button profile__button_type_edit"
                type="button"
                onClick={handleEnableEditing}
              >
                Редактировать
              </button>
              <button
                className="button profile__button profile__button_type_logout"
                type="button"
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </button>
            </>
          ) : (
            <DefaultFormButton
              buttonText={"Сохранить"}
              onClick={handleDisableEditing}
            />
          )}
        </form>
      </section>
    </main>
  );
}

export default Profile;
