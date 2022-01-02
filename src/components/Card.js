// Crad class JS code

class Card {
    constructor({ name, link, owner: { _id: ownerId }, _id, likes }, template, handleCardClick, handleDeleteClick, shouldHideDeleteIcon) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._shouldHideDeleteIcon = shouldHideDeleteIcon;
        this._owner = ownerId;
        this._id = _id;
        this._likes = likes;

    }

    _createClone() {
        this._card = this._template.cloneNode(true);
        const cardImage = this._card.querySelector(".card__image");
        const cardText = this._card.querySelector(".card__text");
        const cardLikes = this._card.querySelector(".card__likes-num");

        cardText.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        
        if (this._likes.length > 0) {
            cardLikes.textContent = this._likes.length;
        } else {
            cardLikes.style.display = "none";
        }

        return this._card;
    }

    _removeCard = () => {
        this._card.remove();
    }

    _onDeleteButtonClick() {
        this._handleDeleteClick(this._id, this._removeCard);
    }

    _addDeleteButtonListener() {
        const deleteButton = this._card.querySelector(".card__delete-button");

        const hidden = this._shouldHideDeleteIcon(this._owner);

        if (hidden) {
            deleteButton.classList.add("card__delete-button_visibility");
        } else {
            deleteButton.addEventListener("click", () => {
                this._onDeleteButtonClick();
            });
        }
    }

    _addLikeButtonListener() {
        const likeButton = this._card.querySelector(".card__like-button");
        likeButton.addEventListener("click", () => { likeButton.classList.toggle("card__like-button-full") });
    }

    _onCardClick() {
        this._handleCardClick({ link: this._link, text: this._name });
    }

    _addCardImageListener() {
        const cardImage = this._card.querySelector(".card__image");

        cardImage.addEventListener("click", () => {
            this._onCardClick();
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