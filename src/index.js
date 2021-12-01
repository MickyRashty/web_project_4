// index JS file

import { Card } from "./Card.js";
import "../pages/index.css";
import headerLogoSrc from "../images/logo-vector.svg";
import profileImageSrc from "../images/profile-image.jpg";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";


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

// images
const headerLogo = document.getElementById("image-header-logo");
headerLogo.src = headerLogoSrc;
const profileImage = document.getElementById("image-profile");
profileImage.src = profileImageSrc;

const popupCardImage = new PopupWithImage(".popup_type_card-picture");
popupCardImage.setEventListeners();

// Profile-Section buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileNameElement = document.querySelector(".profile__info-name");
const profileAboutElement = document.querySelector(".profile__info-about");

// Popup-form
function handleEditFormSubmit(inputValues) {
    const [nameValue, aboutValue] = inputValues;

    profileNameElement.textContent = nameValue;
    profileAboutElement.textContent = aboutValue;
};

function handleAddFormSubmit(inputValues) {
    const [inputTitleValue, inputLinkValue] = inputValues;
    const name = inputTitleValue;
    const link = inputLinkValue;
    
    const card = createCardElement({ name, link });

    cards.prepend(card);
};

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", handleEditFormSubmit);
const popupAddCard = new PopupWithForm(".popup_type_add-card", handleAddFormSubmit);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

editButton.addEventListener("click", (e) => {
    popupEditProfile.open();
    popupEditProfile.setInputValues([profileNameElement.textContent, profileAboutElement.textContent]);
    popupEditProfile.setValidation(settings);
});

addButton.addEventListener("click", (e) => {
    popupAddCard.open();
    popupAddCard.setValidation(settings);
});

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cards = document.querySelector(".cards");

const settings = {
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
}

const cardsSection = new Section({ items: initialCards, renderer: createCardElement }, ".cards");
cardsSection.renderer();

function createCardElement({ name, link }) {
    const card = new Card(name, link, cardTemplate, popupCardImage.open);

    return card.createCard();
}