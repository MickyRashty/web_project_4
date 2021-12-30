// index JS file

import "regenerator-runtime/runtime";
import { Card } from "../components/Card.js";
import "./index.css";
import Api from "../utils/Api.js";
import headerLogoSrc from "../images/logo-vector.svg";
import profileImageSrc from "../images/profile-image.jpg";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { headerLogo, profileImage, editButton, addButton, cardTemplate, settings } from "../utils/constants.js";

// Class instances
const popupCardImage = new PopupWithImage(".popup_type_card-picture");
const profileUserInfo = new UserInfo({ userNameSelector: ".profile__info-name", userJobSelector: ".profile__info-about" });
const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", handleEditFormSubmit);
const popupAddCard = new PopupWithForm(".popup_type_add-card", handleAddFormSubmit);
const popupDeleteButton = new PopupWithDelete(".popup_type_card-delete", handleDeleteFormSubmit);
const cardsSection = new Section({ items: [], renderer: createCardElement }, ".cards");
const editFormValidator = new FormValidator(settings, popupEditProfile.getForm());
const AddformValidator = new FormValidator(settings, popupAddCard.getForm());
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "d32f6df6-a478-44c7-98e2-39f20efb7fb4"
});

// images
headerLogo.src = headerLogoSrc;
profileImage.src = profileImageSrc;

//Popup Card Image
popupCardImage.setEventListeners();

// Popup Buttons
editButton.addEventListener("click", (e) => {
    const { name, about } = profileUserInfo.getUserInfo();

    popupEditProfile.setInputValues([name, about]);
    editFormValidator.resetValidation();
    popupEditProfile.open();
});

addButton.addEventListener("click", (e) => {
    AddformValidator.resetValidation();
    popupAddCard.open();
});

// Popup-forms
async function handleEditFormSubmit(inputValues) {
    const { name, about } = inputValues;
    const profileData = await api.editUserInfo(name, about);
    profileUserInfo.setUserInfo(profileData);
};

async function handleAddFormSubmit(inputValues) {
    const { title, link } = inputValues;
    const cardData = await api.addCard(title, link);
    if (cardData) {
        const card = createCardElement(cardData);
        cardsSection.prependItem(card);
    }
};

// Popup-Card Delete
async function handleDeleteFormSubmit(cardId) {
    const response = await api.deleteCard(cardId);
    return response;
}

editFormValidator.enableValidation();
AddformValidator.enableValidation();

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteButton.setEventListeners();

// Create Card - Add Card Popup
function createCardElement(item) {
    const card = new Card(item, cardTemplate, popupCardImage.open, popupDeleteButton.open, shouldHideDeleteIcon);

    return card.createCard();
}

// Api
async function init() {
    const [cards, userInfo] = await Promise.all([
        api.getInitialCards(),
        api.getUserInfo()
    ]);

    profileUserInfo.setUserInfo(userInfo);
    cardsSection.setItems(cards);
    cardsSection.renderer();
}

init();

function shouldHideDeleteIcon(ownerId) {
    const { id } = profileUserInfo.getUserInfo();
    if (id === ownerId) {
        return false;
    } else {
        return true;
    }
}