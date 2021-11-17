// index JS file

import { Card } from "./Card.js";
import { inputName, inputAbout, profileNameElement, profileAboutElement, closePopup, setOpenEditFormListener, setOpenAddFormListener } from './utils.js';

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

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cards = document.querySelector(".cards");

const formSelector = ".form";
const forms = Array.from(document.querySelectorAll(formSelector));
const settings = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
}

const setCloseBtnsHandler = (allCloseButtons) => {
    allCloseButtons.forEach(btn => btn.addEventListener("click", closePopup));
};

const editFormSubmitHandler = (editForm) =>  {
    editForm.addEventListener("submit", handleEditFormSubmit);
};

const addFormSubmitHandler = (addForm) => { 
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleAddFormSubmit(addForm);
    });
};

function handleEditFormSubmit(e) {
    e.preventDefault();

    profileNameElement.textContent = inputName.value;
    profileAboutElement.textContent = inputAbout.value;

    closePopup();
};

function createCardElement(name, link) {
    const card = new Card(name, link, cardTemplate);

    return card.createCard();
}

function handleAddFormSubmit(addForm) {
    const inputTitle = document.querySelector(".form__input_type_title");
    const inputLink = document.querySelector(".form__input_type_link");
    const name = inputTitle.value;
    const link = inputLink.value;
    
    const card = createCardElement(name, link);

    cards.prepend(card);
    addForm.reset();
    closePopup();
};

initialCards.forEach(initialCardData => {
    const name = initialCardData.name;
    const link = initialCardData.link;

    const card = createCardElement(name, link);

    cards.append(card);
});

setOpenEditFormListener(editButton, popupEditProfile, settings);
setOpenAddFormListener(addButton, popupAddCard, settings);
setCloseBtnsHandler(allCloseButtons);
editFormSubmitHandler(editForm);
addFormSubmitHandler(addForm);