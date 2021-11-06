const pageSettings = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled", //added midifier folder + css file
    inputErrorClass: "form__input_type_error", //added midifier folder + css file, no css files for type name & about
    errorClass: "form__error_visible" //added midifier folder + css file, no css file on error folder
}

function showInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, settings) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, settings)
    } else {
        showInputError(formElement, inputElement, settings)
    }
};

function toggleButtonState(inputElements, buttonElement, settings) {
    const hasInvalidInput = Array.from(inputElements).some(inputElement => !inputElement.validity.valid);

    if (hasInvalidInput) {
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};

function setEventListeners(formElement, settings) {
    const inputElements = formElement.querySelectorAll(settings.inputSelector);
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    inputElements.forEach(inputElement => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputElements, buttonElement, settings);
        })
    })

}

function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);

    forms.forEach(formElement => {
        formElement.addEventListener("submit", evt => {
            evt.preventDefault();
        });

        setEventListeners(formElement, settings);
    });

}

function checkInitialFormValidity(formElement, settings) {
    const inputElements = formElement.querySelectorAll(settings.inputSelector);
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputElements, buttonElement, settings);
}

enableValidation(pageSettings);