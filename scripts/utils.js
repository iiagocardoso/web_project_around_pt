let currentOpenPopup;

const openModal = function (popup) {
  popup.classList.add("popup_is-opened");
  currentOpenPopup = popup;
};

const closeModal = function (popup) {
  popup.classList.remove("popup_is-opened");
};

const handleEscClose = function (evt, cleanClosePopup) {
  if (evt.key === "Escape") {
    cleanClosePopup();
  }
};

const handleOverlayClick = function (evt, cleanClosePopup) {
  if (evt.target === evt.currentTarget) {
    cleanClosePopup();
  }
};

export {
  currentOpenPopup,
  openModal,
  closeModal,
  handleEscClose,
  handleOverlayClick,
};
