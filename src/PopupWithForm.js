// PopupWithForm class JS code

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector(".form");
        this._inputs = this._form.querySelectorAll("input");
    }

    _onSubmit() {
        const inputValues = this._getInputValues();
        this._formSubmitHandler(inputValues);
    }

    _getInputValues() {
        return Array.from(this._inputs).map((input) => input.value);
    }

    setInputValues(inputValues) {
        inputValues.forEach((inputValue, index) => {
            this._inputs[index].value = inputValue;
        });
    }

    getForm() {
        return this._form;
    }

    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup__close-button") || evt.target.classList.contains("popup")) {
                this.close();
            }
        });

        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._onSubmit();
            this.close();
        });
    }

    close() {
        this._popup.classList.remove("popup_open");
        document.removeEventListener("keydown", this._handleEscClose);
        this._form.reset();
    }
}