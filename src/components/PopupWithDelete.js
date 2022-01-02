// PopupWithForm class JS code

import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
    }

    _onSubmit() {
        return this._formSubmitHandler(this._cardId)
            .then((response) => {
                if (response) {
                    this._removeHandler();
                }
            });
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

    open = (cardId, removeHandler) => {
        super.open();

        this._cardId = cardId;
        this._removeHandler = removeHandler;
    }
}