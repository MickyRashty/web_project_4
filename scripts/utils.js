// utils - functions and event handlers

import { Card } from "./Card.js";

//Popup-editForm
const inputName = document.querySelector(".form__input_type_name");
const inputAbout = document.querySelector(".form__input_type_about");

// Propfile-Section fields
const profileNameElement = document.querySelector(".profile__info-name");
const profileAboutElement = document.querySelector(".profile__info-about");

// Cards
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cards = document.querySelector(".cards");

//openPopup + closePopup functions
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
const editFormInitialValidity = (editButton, editForm, popupEditProfile) => {
    editButton.addEventListener("click", () => {
        inputName.value = profileNameElement.textContent;
        inputAbout.value = profileAboutElement.textContent;
        
        //checkInitialFormValidity(editForm, pageSettings);
        openPopup(popupEditProfile);
    });
};

const addFormInitialValidity = (addButton, addForm, popupAddCard) => {    
    addButton.addEventListener("click", () => {
        // checkInitialFormValidity(addForm, pageSettings);
        openPopup(popupAddCard);
    });
};

const allcloseButtonsHandler = (allCloseButtons) => {
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

function handleOverlayMouseDown(evt) {
    if (evt.target.classList.contains("popup")) {
        const popupOverlays = document.querySelectorAll(".popup");
        closePopup(popupOverlays);
    }
};

function handleEscPress(evt) {
    if (evt.key === "Escape") {
        closePopup();
    }
};

function handleEditFormSubmit(e) {
    e.preventDefault();

    profileNameElement.textContent = inputName.value;
    profileAboutElement.textContent = inputAbout.value;

    closePopup();
};

function handleAddFormSubmit(addForm) {

    const inputTitle = document.querySelector(".form__input_type_title");
    const inputLink = document.querySelector(".form__input_type_link");

    const card = new Card(inputTitle.value, inputLink.value, cardTemplate);

    cards.prepend(card.createCard());
    addForm.reset();
    closePopup();
};

export { openPopup, closePopup, editFormInitialValidity, addFormInitialValidity, allcloseButtonsHandler, editFormSubmitHandler, addFormSubmitHandler, cardTemplate, cards };