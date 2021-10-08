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
const popupCardImage = document.querySelector(".popup_type_card-picture");

const forms = document.querySelectorAll(".form");
const allCloseButtons = document.querySelectorAll(".popup__close-button");

//Popup-editForm
const inputName = document.querySelector(".form__input_type_name");
const inputAbout = document.querySelector(".form__input_type_about");

//Popup-addForm
const inputTitle = document.querySelector(".form__input_type_title");
const inputLink = document.querySelector(".form__input_type_link");

// Propfile-Section fields
const profileNameElement = document.querySelector(".profile__info-name");
const profileAboutElement = document.querySelector(".profile__info-about");

// Cards
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cards = document.querySelector(".cards");

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

function handleFormSubmit(e, form) {
    e.preventDefault();

    if (form.contains(inputName)) {
        profileNameElement.textContent = inputName.value;
        profileAboutElement.textContent = inputAbout.value;
    } else if (form.contains(inputTitle)) {
        const cardData = {
            name: inputTitle.value,
            link: inputLink.value
        };

        cards.prepend(createCardElement(cardData));
        inputTitle.value = "";
        inputLink.value = "";
    }

    closePopups();
};

// Cards functions - add/delete/popup/like
function createCardElement(cardData) { // { title, link }
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector(".card__image");
    const cardText = card.querySelector(".card__text");
    const deleteButton = card.querySelector(".card__delete-button");
    const likeButton = card.querySelector(".card__like-button");

    cardText.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener("click", () => { card.remove() });
    likeButton.addEventListener("click", () => { likeButton.classList.toggle("card__like-button-full") });
    cardImage.addEventListener("click", () => {
        const cardImagePopup = popupCardImage.querySelector(".card__image-popup");
        cardImagePopup.src = cardImage.src;
        cardImagePopup.alt = cardText.textContent;
        popupCardImage.querySelector(".card__text-popup").textContent = cardText.textContent;
        togglePopup(popupCardImage);
    });

    return card;
}

// Event Listeners
editButton.addEventListener("click", () => { togglePopup(popupEditProfile); });
addButton.addEventListener("click", () => { togglePopup(popupAddCard); });
allCloseButtons.forEach(btn => btn.addEventListener("click", closePopups));
forms.forEach(form => form.addEventListener("submit", (e) => handleFormSubmit(e, form)));

initialCards.forEach(initialCardData => {
    cards.append(createCardElement(initialCardData));
})