// PopupWithImage class JS code

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open = ({ link, text }) => {
        const cardImagePopup = this._popup.querySelector(".popup__card-image");
        const cardTextPopup = this._popup.querySelector(".popup__card-text");

        cardImagePopup.src = link;
        cardImagePopup.alt = text;
        cardTextPopup.textContent = text;

        this._popup.classList.add("popup_open");
        document.addEventListener("keydown", this._handleEscClose);
    }
}
