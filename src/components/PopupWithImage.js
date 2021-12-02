// PopupWithImage class JS code

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._cardImagePopup = this._popup.querySelector(".popup__card-image");
        this._cardTextPopup = this._popup.querySelector(".popup__card-text");
    }

    open = ({ link, text }) => {
        super.open();

        this._cardImagePopup.src = link;
        this._cardImagePopup.alt = text;
        this._cardTextPopup.textContent = text;
    }
}
