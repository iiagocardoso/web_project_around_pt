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
const allInputsProfile = profileForm.querySelectorAll(".popup__input");
const allInputsCard = newCardForm.querySelectorAll(".popup__input");
const buttonElementProfile = popupEdit.querySelector(".popup__button");
const buttonElementCard = newCardForm.querySelector(".popup__button");
const popupList = document.querySelectorAll(".popup");

const showInputError = function (input, errorElementSpan) {
  input.classList.add("popup__input_type_error");
  errorElementSpan.textContent = input.validationMessage;
  errorElementSpan.classList.add("popup__error_visible");
};

const hideInputError = function (input, errorElementSpan) {
  input.classList.remove("popup__input_type_error");
  errorElementSpan.textContent = "";
  errorElementSpan.classList.remove("popup__error_visible");
};

const checkInputValidity = function (input, form) {
  const errorElementSpan = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    showInputError(input, errorElementSpan);
  } else {
    hideInputError(input, errorElementSpan);
  }
};

const toggleButtonState = (inputs, button) => {
  const arrayInputs = Array.from(inputs);
  const hasInvalidInput = arrayInputs.some((input) => !input.validity.valid);
  button.disabled = hasInvalidInput;
  if (hasInvalidInput) {
    button.classList.add("popup__button_disabled");
  } else {
    button.classList.remove("popup__button_disabled");
  }
};

allInputsProfile.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(input, profileForm);
    toggleButtonState(allInputsProfile, buttonElementProfile);
  });
});

allInputsCard.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(input, newCardForm);
    toggleButtonState(allInputsCard, buttonElementCard);
  });
});

closeImagePopupBtn.addEventListener("click", function () {
  closeModal(imagePopup);
});

let currentOpenPopup;

const openModal = function (popup) {
  popup.classList.add("popup_is-opened");
  currentOpenPopup = popup;
};

const closeModal = function (popup) {
  popup.classList.remove("popup_is-opened");
};

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
};
const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(popupEdit);
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

const handleLikeBtn = function (evt) {
  evt.target.classList.toggle("card__like-button_is-active");
};

const handleDeleteCardBtn = function (evt) {
  evt.target.parentElement.remove();
};

const handleCardImageClick = function (evt) {
  bigImagePopup.src = evt.target.src;
  captionImagePopup.textContent =
    evt.target.parentElement.querySelector(".card__title").textContent;
  bigImagePopup.alt = evt.target.alt;
  openModal(imagePopup);
};

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const getCardElement = function (name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardLikeBtn.addEventListener("click", handleLikeBtn);

  cardDeleteBtn.addEventListener("click", handleDeleteCardBtn);

  cardImage.addEventListener("click", handleCardImageClick);

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
};

const cardContainer = document.querySelector(".cards__list");
const renderCard = function (name, link, container) {
  const newCard = getCardElement(name, link);
  container.prepend(newCard);
};

initialCards.forEach(function (item) {
  renderCard(item.name, item.link, cardContainer);
});

const newCardBtn = document.querySelector(".profile__add-button");
const closeCardBtn = newCardPopup.querySelector(".popup__close");

newCardBtn.addEventListener("click", function () {
  openModal(newCardPopup);
});

closeCardBtn.addEventListener("click", function () {
  closeModal(newCardPopup);
});

const inputNameCard = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const inputImageCard = newCardPopup.querySelector(".popup__input_type_url");

const handleCardFormSubmit = function (evt) {
  evt.preventDefault();
  renderCard(inputNameCard.value, inputImageCard.value, cardContainer);
  closeModal(newCardPopup);
};

newCardForm.addEventListener("submit", handleCardFormSubmit);

const handleEscClose = function (evt) {
  if (evt.key === "Escape") {
    closeModal(currentOpenPopup);
  }
};

document.addEventListener("keydown", handleEscClose);

const handleOverlayClick = function (evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(currentOpenPopup);
  }
};

popupList.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});
