// index JS file

import "regenerator-runtime/runtime";
import { Card } from "../components/Card.js";
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
const editProfileInfoFormValidator = new FormValidator(settings, popupEditProfile.getForm());
const changePictureFormValidator = new FormValidator(settings, popupChangePicture.getForm());
const AddCardformValidator = new FormValidator(settings, popupAddCard.getForm());
const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "d32f6df6-a478-44c7-98e2-39f20efb7fb4"
});

// images
headerLogo.src = headerLogoSrc;

//Popup Card Image
popupCardImage.setEventListeners();

// Popup Buttons
editProfileInfoButton.addEventListener("click", (e) => {
    const { name, about } = profileUserInfo.getUserInfo();

    popupEditProfile.setInputValues([name, about]);
    editProfileInfoFormValidator.resetValidation();
    popupEditProfile.open();
});

addNewCardButton.addEventListener("click", (e) => {
    AddCardformValidator.resetValidation();
    popupAddCard.open();
});

editProfileImageButton.addEventListener("click", (e) => {
    const { avatar } = profileUserInfo.getUserInfo();

    popupChangePicture.setInputValues([avatar]);
    changePictureFormValidator.resetValidation();
    popupChangePicture.open();
});



// Popup-forms
function handleEditFormSubmit(inputValues) {
    const { name, about } = inputValues;
    
    return api.editUserInfo(name, about)
        .then((profileData) => {
            if (profileData){
                profileUserInfo.setUserInfo(profileData);
            }   
        });
};

async function handleAddFormSubmit(inputValues) {
    const { title, link } = inputValues;
    const cardData = await api.addCard(title, link);
    if (cardData) {
        const card = createCardElement(cardData);
        cardsSection.prependItem(card);
    }
};

async function handleChangeFormSubmit(inputValues) {
    const { avatar } = inputValues;
    const profileImage = await api.editProfileImage(avatar);

    if (profileImage) {
        profileUserInfo.setAvatarLink(profileImage);
    }
}

// Popup-Card Delete
async function handleDeleteFormSubmit(cardId) {
    const response = await api.deleteCard(cardId);
    return response;
}

editProfileInfoFormValidator.enableValidation();
AddCardformValidator.enableValidation();
changePictureFormValidator.enableValidation();

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
    const [cards, userInfo] = await Promise.all([
        api.getInitialCards(),
        api.getUserInfo()
    ]);

    if (userInfo && cards) {
        profileUserInfo.setUserInfo(userInfo);
        cardsSection.setItems(cards);
        cardsSection.renderer();
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