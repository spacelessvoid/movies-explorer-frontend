import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  MSG_PROFILE_UPDATE_SUCCESS,
} from "../../utils/constants";
import DefaultFormButton from "../DefaultFormButton/DefaultFormButton";
import useForm from "../../hooks/useForm";
import { AppContext } from "../../contexts/AppContext";

function Profile({ handleUpdateUserInfo, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const { isLoading, resultSuccess, setResultSuccess } = useContext(AppContext);

  const [isDisabled, setIsDisabled] = useState(true);

  const {
    inputValues,
    setInputValues,
    isValid,
    handleChange,
    handleValidation,
  } = useForm(currentUser);

  const isSubmitButtonDisabled =
    JSON.stringify(inputValues) === JSON.stringify(currentUser) || !isValid;

  function handleEnableEditing(e) {
    e.preventDefault();

    setIsDisabled(false);

    setInputValues(currentUser);

    setTimeout(() => {
      document.getElementById("name").focus();
    }, 5);
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateUserInfo(inputValues);

    setIsDisabled(true);
  }

  useEffect(() => {
    setResultSuccess(false);
  }, []);

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {currentUser?.name}!</h1>
      <section>
        <form
          className="profile__form"
          disabled={!isLoading}
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="profile__fieldset">
            <label htmlFor="name" className="profile__label">
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="profile__input"
              disabled={isDisabled}
              placeholder="введите ваше имя"
              required
              minLength="2"
              maxLength="30"
              pattern={NAME_REGEX}
              defaultValue={inputValues.name ?? currentUser.name}
              onChange={handleChange}
              onBlur={handleValidation}
            />
          </fieldset>
          <fieldset className="profile__fieldset">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="profile__input"
              disabled={isDisabled}
              placeholder="введите ваш e-mail"
              required
              pattern={EMAIL_REGEX}
              defaultValue={inputValues.email ?? currentUser.email}
              onChange={handleChange}
              onBlur={handleValidation}
            />
          </fieldset>
          <p className="profile__update" data-visible={resultSuccess}>
            {MSG_PROFILE_UPDATE_SUCCESS}
          </p>
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
                onClick={handleLogOut}
              >
                Выйти из аккаунта
              </button>
            </>
          ) : (
            <DefaultFormButton
              buttonText={"Сохранить"}
              isDisabled={isSubmitButtonDisabled}
            />
          )}
        </form>
      </section>
    </main>
  );
}

export default Profile;
