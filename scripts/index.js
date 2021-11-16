// index JS file

import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";
import { editFormInitialValidity, addFormInitialValidity, allcloseButtonsHandler, editFormSubmitHandler, addFormSubmitHandler, cardTemplate, cards } from './utils.js';

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

// Profile-Section buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Popup-form
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const editForm = popupEditProfile.querySelector(".form");
const addForm = popupAddCard.querySelector(".form");

const allCloseButtons = document.querySelectorAll(".popup__close-button");

initialCards.forEach(initialCardData => {
    const name = initialCardData.name;
    const link = initialCardData.link;

    const card = new Card(name, link, cardTemplate);

    cards.append(card.createCard());
});

const formSelector = ".form";
const settings = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
}

const forms = Array.from(document.querySelectorAll(formSelector));

forms.forEach(formElement => {
    const formValidator = new FormValidator(settings, formElement);

    formValidator.enableValidation();
});

editFormInitialValidity(editButton, editForm, popupEditProfile);
addFormInitialValidity(addButton, addForm, popupAddCard);
allcloseButtonsHandler(allCloseButtons);
editFormSubmitHandler(editForm);
addFormSubmitHandler(addForm);