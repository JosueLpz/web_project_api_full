export default class FormValidator {
  constructor(
    form,
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    }
  ) {
    this._form = form;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    // Asegúrate de llamar a _getFormElements en el constructor
    this._getFormElements();
  }

  _getFormElements() {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  _enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("keyup", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _evtKey(evt) {
    if (evt.key === "Enter") {
      evt.preventDefault();
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._form.addEventListener("keydown", this._evtKey);
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._form.removeEventListener("keydown", this._evtKey);
    }
  }

  // Cambiado para asignar a _enableValidation en lugar de solo llamarlo
  enableValidation() {
    this._enableValidation();
  }
}
