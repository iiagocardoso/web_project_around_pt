import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  currentOpenPopup,
  openModal,
  closeModal,
  handleEscClose,
  handleOverlayClick,
} from "./utils.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const imagePopup = document.querySelector("#image-popup");
const bigImagePopup = imagePopup.querySelector(".popup__image");
const captionImagePopup = imagePopup.querySelector(".popup__caption");
const profileEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#edit-popup");
const closeButtonPopup = popupEdit.querySelector(".popup__close");
const closeImagePopupBtn = imagePopup.querySelector(".popup__close");
const newCardPopup = document.querySelector("#new-card-popup");
const profileForm = popupEdit.querySelector("#edit-profile-form");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const popupList = document.querySelectorAll(".popup");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const cardFormValidator = new FormValidator(validationConfig, newCardForm);

profileFormValidator.setEventListeners();
cardFormValidator.setEventListeners();

closeImagePopupBtn.addEventListener("click", function () {
  closeModal(imagePopup);
});

profileEdit.addEventListener("click", function () {
  handleOpenEditModal();
});

closeButtonPopup.addEventListener("click", function () {
  closeModal(popupEdit);
});

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = popupEdit.querySelector(".popup__input_type_name");
const inputDescription = popupEdit.querySelector(
  ".popup__input_type_description",
);
const fillProfileForm = function () {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

const handleOpenEditModal = function () {
  fillProfileForm();
  openModal(popupEdit);
  profileFormValidator.resetValidation();
};

const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(popupEdit);
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

const handleCardImageClick = function (evt) {
  bigImagePopup.src = evt.target.src;
  captionImagePopup.textContent =
    evt.target.parentElement.querySelector(".card__title").textContent;
  bigImagePopup.alt = evt.target.alt;
  openModal(imagePopup);
};

const cardContainer = document.querySelector(".cards__list");

const renderCard = function (name, link, container) {
  const newCard = new Card(name, link, "#card-template", handleCardImageClick);
  container.prepend(newCard.getCardElement());
};

initialCards.forEach(function (item) {
  renderCard(item.name, item.link, cardContainer);
});

const newCardBtn = document.querySelector(".profile__add-button");
const closeCardBtn = newCardPopup.querySelector(".popup__close");

const cleanClosePopup = function () {
  if (currentOpenPopup === newCardPopup) {
    closeModal(currentOpenPopup);
    newCardForm.reset();
    cardFormValidator.resetValidation();
  } else {
    closeModal(currentOpenPopup);
  }
};

newCardBtn.addEventListener("click", function () {
  openModal(newCardPopup);
});

closeCardBtn.addEventListener("click", function () {
  cleanClosePopup();
  newCardForm.reset();
  cardFormValidator.resetValidation();
});

const inputNameCard = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const inputImageCard = newCardPopup.querySelector(".popup__input_type_url");

const handleCardFormSubmit = function (evt) {
  evt.preventDefault();
  renderCard(inputNameCard.value, inputImageCard.value, cardContainer);
  closeModal(newCardPopup);
  newCardForm.reset();
};

newCardForm.addEventListener("submit", handleCardFormSubmit);

document.addEventListener("keydown", (evt) => {
  handleEscClose(evt, cleanClosePopup);
});

popupList.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    handleOverlayClick(evt, cleanClosePopup);
  });
});
