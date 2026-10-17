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

initialCards.forEach(function (item) {
  console.log(item.name);
});

const profileEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector("#edit-popup");
const closeButtonPopup = popupEdit.querySelector(".popup__close");
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
