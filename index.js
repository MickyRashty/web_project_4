// Profile-Section buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Popup-form
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

const forms = document.querySelectorAll(".form");
const allCloseButtons = document.querySelectorAll(".popup__close-button");
const formSubmitButton = document.querySelector(".form__button");

//Popup-editForm
const inputName = document.querySelector(".form__input_type_name");
const inputAbout = document.querySelector(".form__input_type_about");

//Popup-addForm
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_link");

// Propfile-Section fields
const profileNameElement = document.querySelector(".profile__info-name");
const profileAboutElement = document.querySelector(".profile__info-about");

// Card fields
const cardTitle = document.querySelector("card__text");

// Popup functions - toggle/Close/Submit
function togglePopup(popup) {

    if (popup.classList.contains("popup_type_edit-profile")) {
        inputName.value = profileNameElement.textContent;
        inputAbout.value = profileAboutElement.textContent;
    }

    popup.classList.toggle("popup_open");
};

function closePopups() {
    const allPopups = document.querySelectorAll(".popup");
    allPopups.forEach(popup => {
        if (popup.classList.contains("popup_open")) {
            popup.classList.remove("popup_open")
        }
    });
};

function handleFormSubmit(e) {
    e.preventDefault();

    profileNameElement.textContent = inputName.value;
    profileAboutElement.textContent = inputAbout.value;

    closePopups();
};

// Event Listeners
editButton.addEventListener("click", () => { togglePopup(popupEditProfile); });
addButton.addEventListener("click", () => { togglePopup(popupAddCard); });
allCloseButtons.forEach(btn => btn.addEventListener("click", closePopups));
forms.forEach(form => form.addEventListener("submit", handleFormSubmit));