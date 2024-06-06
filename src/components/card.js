import { likeCardOnServer, unlikeCardOnServer } from './api.js';

export function createCard(cardData, userId, deleteCallback, openPopupCallback) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.places__item');
  const cardImage = cardTemplate.querySelector('.card__image');
  const cardTitle = cardTemplate.querySelector('.card__title');
  const likeButton = cardTemplate.querySelector('.card__like-button');
  const likeCounter = cardTemplate.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes ? cardData.likes.length : 0;

  if (cardData.likes && cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_liked');
  }

  const deleteButton = cardTemplate.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCallback(cardElement);
  });

  cardImage.addEventListener('click', () => {
    openPopupCallback(cardData.link, cardData.name);
  });

  likeButton.addEventListener('click', () => {
    if (!cardData._id) {
      console.error('Card ID is undefined');
      return;
    }

    if (likeButton.classList.contains('card__like-button_liked')) {
      unlikeCardOnServer(cardData._id)
        .then(updatedCard => {
          likeCounter.textContent = updatedCard.likes.length;
          likeButton.classList.remove('card__like-button_liked');
        })
        .catch(err => console.log(err));
    } else {
      likeCardOnServer(cardData._id)
        .then(updatedCard => {
          likeCounter.textContent = updatedCard.likes.length;
          likeButton.classList.add('card__like-button_liked');
        })
        .catch(err => console.log(err));
    }
  });

  return cardElement;
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
