// Crad class JS code

import { openPopup } from "./utils.js";

const popupCardImage = document.querySelector(".popup_type_card-picture");
const cardImagePopup = popupCardImage.querySelector(".popup__card-image");
const cardTextPopup = popupCardImage.querySelector(".popup__card-text");

class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;
    }

    _createClone() {
        this._card = this._template.cloneNode(true);
        const cardImage = this._card.querySelector(".card__image");
        const cardText = this._card.querySelector(".card__text");

        cardText.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;

        return this._card;
    }

    _addDeleteButtonListener() {
        const deleteButton = this._card.querySelector(".card__delete-button");
        deleteButton.addEventListener("click", () => { this._card.remove() });
    }

    _addLikeButtonListener() {
        const likeButton = this._card.querySelector(".card__like-button");
        likeButton.addEventListener("click", () => { likeButton.classList.toggle("card__like-button-full") });
    }

    _addCardImageListener() {
        const cardImage = this._card.querySelector(".card__image");

        cardImage.addEventListener("click", () => {
            cardImagePopup.src = this._link;
            cardImagePopup.alt = this._name;
            cardTextPopup.textContent = this._name;
            openPopup(popupCardImage);
        });
    }

    _setEventListeners() {
        this._addDeleteButtonListener();
        this._addLikeButtonListener();
        this._addCardImageListener();
    }

    createCard() {
        this._card = this._createClone();
        this._setEventListeners();
        return this._card;
    }
}

export { Card };