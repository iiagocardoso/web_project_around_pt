class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input) {
    const errorElementSpan = this._formElement.querySelector(
      `#${input.id}-error`,
    );
    input.classList.add("popup__input_type_error");
    errorElementSpan.textContent = input.validationMessage;
    errorElementSpan.classList.add("popup__error_visible");
  }

  _hideInputError(input) {
    const errorElementSpan = this._formElement.querySelector(
      `#${input.id}-error`,
    );
    input.classList.remove("popup__input_type_error");
    errorElementSpan.textContent = "";
    errorElementSpan.classList.remove("popup__error_visible");
  }

  _toggleButtonState(inputList) {
    const hasInvalidInput = inputList.some((input) => !input.validity.valid);
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
    if (hasInvalidInput) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  setEventListeners() {
    const allInputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector),
    );
    this._toggleButtonState(allInputs);
    allInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(allInputs);
      });
    });
  }

  resetValidation() {
    const allInputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector),
    );
    allInputs.forEach((input) => {
      this._hideInputError(input);
    });
  }
}

export default FormValidator;
