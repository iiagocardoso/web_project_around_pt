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

closeImagePopupBtn.addEventListener("click", function () {
  closeModal(imagePopup);
});

const openModal = function (popup) {
  popup.classList.add("popup_is-opened");
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

const formElement = popupEdit.querySelector("#edit-profile-form");

formElement.addEventListener("submit", handleProfileFormSubmit);

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

const getCardElement = function (
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
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
const newCardPopup = document.querySelector("#new-card-popup");
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

const newCardForm = newCardPopup.querySelector("#new-card-form");

newCardForm.addEventListener("submit", handleCardFormSubmit);
