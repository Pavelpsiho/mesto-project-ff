export function createCard(cardData, deleteCallback, likeCallback, openPopupCallback) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.places__item');
  const cardImage = cardTemplate.querySelector('.card__image');
  const cardTitle = cardTemplate.querySelector('.card__title');
  const likeButton = cardTemplate.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const deleteButton = cardTemplate.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
      deleteCallback(cardElement);
  });

  cardImage.addEventListener('click', () => {
      openPopupCallback(cardData.link, cardData.name);
  });

  likeButton.addEventListener('click', () => {
      likeCallback(likeButton);
  });

  return cardElement;
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function deleteCard(cardElement) {
  cardElement.remove();
}