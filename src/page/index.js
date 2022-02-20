// index JS file

import "regenerator-runtime/runtime";
import Card from "../components/Card.js";
import "./index.css";
import Api from "../utils/Api.js";
import headerLogoSrc from "../images/logo-vector.svg";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { headerLogo, editProfileInfoButton, addNewCardButton, cardTemplate, settings, editProfileImageButton } from "../utils/constants.js";

// Class instances
const popupCardImage = new PopupWithImage(".popup_type_card-picture");
const profileUserInfo = new UserInfo({ userNameSelector: ".profile__info-name", userJobSelector: ".profile__info-about", userAvatarSelector: ".profile__image" });
const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", handleEditFormSubmit);
const popupAddCard = new PopupWithForm(".popup_type_add-card", handleAddFormSubmit);
const popupDeleteButton = new PopupWithDelete(".popup_type_card-delete", handleDeleteFormSubmit);
const popupChangePicture = new PopupWithForm(".popup_type_profile-image", handleChangeFormSubmit);
const cardsSection = new Section({ items: [], renderer: createCardElement }, ".cards");
const formValidators = {};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        const validator = new FormValidator(settings, formElement);
        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

const headers = { //API personal key
    authorization: "d32f6df6-a478-44c7-98e2-39f20efb7fb4",
    "Content-Type": "application/json"
};

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers,
});

// images
headerLogo.src = headerLogoSrc;

//Popup Card Image
popupCardImage.setEventListeners();

// Popup Buttons
editProfileInfoButton.addEventListener("click", (e) => {
    const { name, about } = profileUserInfo.getUserInfo();

    popupEditProfile.setInputValues([name, about]);
    formValidators[ popupEditProfile.getForm().getAttribute('name') ].resetValidation();
    popupEditProfile.open();
});

addNewCardButton.addEventListener("click", (e) => {
    formValidators[ popupAddCard.getForm().getAttribute('name') ].resetValidation();
    popupAddCard.open();
});

editProfileImageButton.addEventListener("click", (e) => {
    // const { avatar } = profileUserInfo.getUserInfo();

    formValidators[ popupChangePicture.getForm().getAttribute('name') ].resetValidation();
    popupChangePicture.open();
});



// Popup-forms
async function handleEditFormSubmit(inputValues) {
    const { name, about } = inputValues;
    
    try {
        const profileData = await api.editUserInfo(name, about);
        if (profileData) {
            profileUserInfo.setUserInfo(profileData);

            return profileData;
        }
    } catch (error) {
        console.log(error);
    }
};

async function handleAddFormSubmit(inputValues) {
    const { title, link } = inputValues;

    try {
        const cardData = await api.addCard(title, link);
        if (cardData) {
            cardsSection.addItem(cardData);
        }
    } catch (error) {
        console.log(error)
    }
    
};

async function handleChangeFormSubmit(inputValues) {
    const { avatar } = inputValues;

    try {
        const profileData = await api.editProfileImage(avatar);
    
        if (profileData) {
            profileUserInfo.setUserInfo(profileData);
        }
    } catch (error) {
        console.log(error);
    }
}

// Popup-Card Delete
async function handleDeleteFormSubmit(cardId) {
    try {
        return api.deleteCard(cardId);
    } catch (error) {
        console.log(error);
    }
}

enableValidation(settings);

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteButton.setEventListeners();
popupChangePicture.setEventListeners();

const likesHandlers = {
    add: api.addLike.bind(api),
    delete: api.deleteLike.bind(api),
    isUserInfoLike,
};

function isUserInfoLike(likesList) {
    const { id } = profileUserInfo.getUserInfo();

    return likesList.some(({ _id }) => _id === id);
}

// Create Card - Add Card Popup
function createCardElement(item) {
    const card = new Card(item, cardTemplate, popupCardImage.open, popupDeleteButton.open, shouldHideDeleteIcon, likesHandlers);

    return card.createCard();
}

// Api
async function init() {
    try {
        const [cards, userInfo] = await Promise.all([
            api.getInitialCards(),
            api.getUserInfo()
        ]);
    
        if (userInfo && cards) {
            profileUserInfo.setUserInfo(userInfo);
            cardsSection.setItems(cards);
            cardsSection.renderer();
        }
    } catch (error) {
        console.log(error);
    }
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
