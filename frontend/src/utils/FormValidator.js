// FormValidator.js
import React, { useEffect, useState } from "react";

const FormValidator = React.forwardRef(
  (
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    ref
  ) => {
    const [inputs, setInputs] = useState([]);
    const [button, setButton] = useState(null);

    useEffect(() => {
      const form = ref.current;

      const getFormElements = () => {
        setInputs(Array.from(form.querySelectorAll(inputSelector)));
        setButton(form.querySelector(submitButtonSelector));
      };

      const enableValidation = () => {
        getFormElements();
        setEventListeners();
        toggleButtonState();
      };

      const setEventListeners = () => {
        inputs.forEach((input) => {
          input.addEventListener("keyup", () => {
            isValid(form, input);
            toggleButtonState();
          });
        });
      };

      const isValid = (form, input) => {
        if (!input.validity.valid) {
          showInputError(form, input, input.validationMessage);
        } else {
          hideInputError(form, input);
        }
      };

      const showInputError = (form, input, errorMessage) => {
        const errorElement = form.querySelector(`.${input.id}-error`);

        input.classList.add(inputErrorClass);
        errorElement.classList.add(errorClass);
        errorElement.textContent = errorMessage;
      };

      const hideInputError = (form, input) => {
        const errorElement = form.querySelector(`.${input.id}-error`);

        input.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = "";
      };

      const hasInvalidInput = () => {
        return inputs.some((input) => !input.validity.valid);
      };

      const evtKey = (evt) => {
        if (evt.key === "Enter") {
          evt.preventDefault();
        }
      };

      const toggleButtonState = () => {
        const formName = form.getAttribute("data-form-name"); // Asume que agregas un atributo de datos para el nombre del formulario
        const buttonId = `${formName}__submit`; // Ajusta según tu patrón de ID
        const currentButton = document.getElementById(buttonId);

        if (hasInvalidInput()) {
          button.classList.add(inactiveButtonClass);
          form.addEventListener("keydown", evtKey);
        } else {
          button.classList.remove(inactiveButtonClass);
          form.removeEventListener("keydown", evtKey);
        }
      };

      enableValidation();

      return () => {
        inputs.forEach((input) => {
          input.removeEventListener("keyup", () => {});
        });
        form.removeEventListener("keydown", evtKey);
      };
    }, [
      ref,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    ]);

    return null;
  }
);

export default FormValidator;
