let currentOpenPopup;

const openModal = function (popup) {
  popup.classList.add("popup_is-opened");
  currentOpenPopup = popup;
};

const closeModal = function (popup) {
  popup.classList.remove("popup_is-opened");
};

const handleEscClose = function (evt) {
  if (evt.key === "Escape") {
    closeModal(currentOpenPopup);
  }
};

const handleOverlayClick = function (evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(currentOpenPopup);
  }
};

export {
  currentOpenPopup,
  openModal,
  closeModal,
  handleEscClose,
  handleOverlayClick,
};
