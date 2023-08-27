import DefaultFormButton from "../DefaultFormButton/DefaultFormButton";
import "./Profile.css";
import { useRef, useState } from "react";

function Profile({ username = "@username", userEmail = "test@test.test" }) {
  const [isDisabled, setIsDisabled] = useState(true);

  const input = useRef(null);

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

  return (
    <main className="profile__content">
      <h1 className="profile__title">Привет, {username}!</h1>
      <form className="profile__form">
        <fieldset className="profile__fieldset">
          <label htmlFor="name" className="profile__name-label">
            Имя
          </label>
          <input
            ref={input}
            value={username}
            type="text"
            className="profile__name-input"
            disabled={isDisabled}
          />
        </fieldset>

        <fieldset className="profile__fieldset">
          <label htmlFor="email" className="profile__email-label">
            E-mail
          </label>
          <input
            value={userEmail}
            type="email"
            className="profile__email-input"
            disabled={isDisabled}
          />
        </fieldset>

        {isDisabled ? (
          <>
            <button
              className="profile__button profile__button_type_edit"
              type="submit"
              onClick={handleEnableEditing}
            >
              Редактировать
            </button>
            <button
              className="profile__button profile__button_type_logout"
              type="submit"
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
    </main>
  );
}

export default Profile;
