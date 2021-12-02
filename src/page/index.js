// index JS file

import { Card } from "../components/Card.js";
import "./index.css";
import headerLogoSrc from "../../images/logo-vector.svg";
import profileImageSrc from "../../images/profile-image.jpg";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, headerLogo, profileImage, editButton, addButton, cardTemplate, cards, settings } from "../utils/constants.js";

// Class instances
const popupCardImage = new PopupWithImage(".popup_type_card-picture");
const profileUserInfo = new UserInfo({ userNameSelector: ".profile__info-name", userJobSelector: ".profile__info-about" });
const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", handleEditFormSubmit);
const popupAddCard = new PopupWithForm(".popup_type_add-card", handleAddFormSubmit);
const cardsSection = new Section({ items: initialCards, renderer: createCardElement }, ".cards");
const editFormValidator = new FormValidator(settings, popupEditProfile.getForm());
const AddformValidator = new FormValidator(settings, popupAddCard.getForm());

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
function handleEditFormSubmit(inputValues) {
    const { name, about } = inputValues;
    profileUserInfo.setUserInfo({ name, about });
};

function handleAddFormSubmit(inputValues) {
    const { title, link } = inputValues;
    const card = createCardElement({ name: title, link });
    cardsSection.prependItem(card);
};

editFormValidator.enableValidation();
AddformValidator.enableValidation();

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

// Create Card - Add Card Popup
cardsSection.renderer();

function createCardElement({ name, link }) {
    const card = new Card(name, link, cardTemplate, popupCardImage.open);

    return card.createCard();
}