// PopupWithForm class JS code

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector(".form");
        this._inputs = this._form.querySelectorAll("input");
        this._formValues = {};
    }

    _onSubmit() {
        const formButton = this._form.querySelector(".form__button");

        this._getInputValues();
        formButton.textContent = "Saving...";

        return this._formSubmitHandler(this._formValues);
    }

    _getInputValues() {
        this._inputs.forEach(input => this._formValues[input.name] = input.value);
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
        super.setEventListeners();

        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._onSubmit()
                .then(() => {
                    this.close();
                })
        });
    }

    open = () => {
        const formButton = this._form.querySelector(".form__button");
        formButton.textContent = "Save";
        
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }
}