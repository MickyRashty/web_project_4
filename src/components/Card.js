// Crad class JS code

class Card {
    constructor({ name, link, owner: { _id: ownerId }, _id, likes }, template, handleCardClick, handleDeleteClick, shouldHideDeleteIcon, likesHandlers) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._shouldHideDeleteIcon = shouldHideDeleteIcon;
        this._owner = ownerId;
        this._id = _id;
        this._likes = likes;
        this._likesHandlers = likesHandlers;
    }

    _shouldShowLikes() {
        const cardLikes = this._card.querySelector(".card__likes-num");
        const likeButton = this._card.querySelector(".card__like-button");

        if (this._likes.length > 0) {
            cardLikes.textContent = this._likes.length;
            cardLikes.style.display = "block";
        } else {
            cardLikes.style.display = "none";
        }

        if (this._likesHandlers.isUserInfoLike(this._likes)) {
            likeButton.classList.add("card__like-button-full");
        } else {
            likeButton.classList.remove("card__like-button-full");
        }
    }

    _createClone() {
        this._card = this._template.cloneNode(true);
        const cardImage = this._card.querySelector(".card__image");
        const cardText = this._card.querySelector(".card__text");

        cardText.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        
        this._shouldShowLikes();

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

    async _onLikeClick() {
        const likeButton = this._card.querySelector(".card__like-button");
        let updatedCard = {};

        if (likeButton.classList.contains("card__like-button-full")) {
            updatedCard = await this._likesHandlers.delete(this._id);
        } else {
            updatedCard = await this._likesHandlers.add(this._id);
        }

        if (updatedCard) {
            const { likes } = updatedCard;
            this._likes = likes;

            this._shouldShowLikes();
        }
    }

    _addLikeButtonListener() {
        const likeButton = this._card.querySelector(".card__like-button");
        likeButton.addEventListener("click", () => {
            this._onLikeClick();
        });
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