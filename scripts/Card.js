// Crad class JS code

import { openPopup } from "./utils.js";

class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template;
    }

    _createClone() {
        const card = this._template.cloneNode(true);
        const cardImage = card.querySelector(".card__image");
        const cardText = card.querySelector(".card__text");

        cardText.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;

        return card;
    }

    _addDeleteButtonListener(card) {
        const deleteButton = card.querySelector(".card__delete-button");
        deleteButton.addEventListener("click", () => { card.remove() });
    }

    _addLikeButtonListener(card) {
        const likeButton = card.querySelector(".card__like-button");
        likeButton.addEventListener("click", () => { likeButton.classList.toggle("card__like-button-full") });
    }

    _addCardImageListener (card) {
        const cardImage = card.querySelector(".card__image");
        const popupCardImage = document.querySelector(".popup_type_card-picture");
        const cardImagePopup = popupCardImage.querySelector(".popup__card-image");
        const cardTextPopup = popupCardImage.querySelector(".popup__card-text");

        cardImage.addEventListener("click", () => {
            cardImagePopup.src = this._link;
            cardImagePopup.alt = this._name;
            cardTextPopup.textContent = this._name;
            openPopup(popupCardImage);
        });
    }

    createCard() {
        const card = this._createClone();
        this._addDeleteButtonListener(card);
        this._addLikeButtonListener(card);
        this._addCardImageListener(card);

        return card;
    }
}

export { Card };