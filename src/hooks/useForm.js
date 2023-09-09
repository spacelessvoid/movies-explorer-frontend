import { useCallback, useState } from "react";

const useForm = (initialValues = {}) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setInputValues({ ...inputValues, [name]: value });
    setIsValid(evt.target.closest("form").checkValidity());
  }

  function handleValidation(evt) {
    setErrorMessage(evt.target.validationMessage);
  }

  const resetForm = useCallback(() => {
    setInputValues({});
    setErrorMessage("");
    setIsValid(false);
  }, []);

  return {
    inputValues,
    setInputValues,
    isValid,
    setIsValid,
    errorMessage,
    handleChange,
    handleValidation,
    resetForm,
  };
};

export default useForm;
