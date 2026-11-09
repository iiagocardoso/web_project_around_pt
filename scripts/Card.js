class Card {
  constructor(name, link, templateSelector, handleCardImageClick) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this.handleCardImageClick = handleCardImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getCardElement() {
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLikeBtn = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteBtn = this._cardElement.querySelector(
      ".card__delete-button",
    );

    this._cardTitle.textContent = this.name;
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;

    this._setEventListener();

    return this._cardElement;
  }

  _handleLikeBtn(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCardBtn(evt) {
    evt.target.parentElement.remove();
  }

  _handleCardImageClick(evt) {
    this.handleCardImageClick(evt);
  }

  _setEventListener() {
    this._cardImage.addEventListener("click", (evt) => {
      this._handleCardImageClick(evt);
    });

    this._cardLikeBtn.addEventListener("click", (evt) => {
      this._handleLikeBtn(evt);
    });

    this._cardDeleteBtn.addEventListener("click", (evt) => {
      this._handleDeleteCardBtn(evt);
    });
  }
}

export default Card;
