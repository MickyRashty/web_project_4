// utils - functions and event handlers
import FormValidator from './FormValidator.js';

//Popup-editForm
const inputName = document.querySelector(".form__input_type_name");
const inputAbout = document.querySelector(".form__input_type_about");

// Propfile-Section fields
const profileNameElement = document.querySelector(".profile__info-name");
const profileAboutElement = document.querySelector(".profile__info-about");

// Open/Close functions
function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener("keydown", handleEscPress);
    popup.addEventListener("mousedown", handleOverlayMouseDown);
};

function closePopup() {
    const openedPopup = document.querySelector('.popup_open');

    if (openedPopup) {
        openedPopup.classList.remove("popup_open");
        document.removeEventListener("keydown", handleEscPress);
        openedPopup.removeEventListener("mousedown", handleOverlayMouseDown);
    }
};

// Event Listeners
const setOpenEditFormListener = (editButton, popupEditProfile, settings) => {
    const editForm = popupEditProfile.querySelector(".form");
    const formReset = new FormValidator(settings, editForm);

    editButton.addEventListener("click", () => {
        inputName.value = profileNameElement.textContent;
        inputAbout.value = profileAboutElement.textContent;
        
        formReset.resetValidation();
        openPopup(popupEditProfile);
    });
};

const setOpenAddFormListener = (addButton, popupAddCard, settings) => {    
    const addForm = popupAddCard.querySelector(".form");
    const formReset = new FormValidator(settings, addForm);
    
    addButton.addEventListener("click", () => {
        formReset.resetValidation();
        openPopup(popupAddCard);
    });
};

function handleOverlayMouseDown(evt) {
    if (evt.target.classList.contains("popup")) {
        closePopup();
    }
};

function handleEscPress(evt) {
    if (evt.key === "Escape") {
        closePopup();
    }
};

export { inputName, inputAbout, profileNameElement, profileAboutElement, closePopup, openPopup, setOpenEditFormListener, setOpenAddFormListener };