let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".form__save-button");
let form = document.querySelector(".form");

let inputName = document.querySelector(".form__input_type_name");
let inputAbout = document.querySelector(".form__input_type_about");

let profileNameElement = document.querySelector(".profile__info-name");
let profileAboutElement = document.querySelector(".profile__info-about");


function openPopup() {
    popup.classList.add("popup_open");

    inputName.value = profileNameElement.textContent;
    inputAbout.value = profileAboutElement.textContent;
}

function closePopup() {
    popup.classList.remove("popup_open");
}

function handleFormSubmit(e) {
    e.preventDefault();

    profileNameElement.textContent = inputName.value;
    profileAboutElement.textContent = inputAbout.value;

    closePopup();
}

editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

form.addEventListener("submit", handleFormSubmit);