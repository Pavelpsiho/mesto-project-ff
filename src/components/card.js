import { openModal } from './modal.js';
import { openPopupWithImage } from '../index.js';
import { deleteCardFromServer, likeCardOnServer, unlikeCardOnServer } from './api.js';

export function unlikeCard(cardId) {
  return unlikeCardOnServer(cardId);
}

export function createCard(cardData, userId, deleteCallback, openPopupCallback) {
  const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
  const cardElement = cardTemplate.querySelector('.places__item');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes ? cardData.likes.length : 0;

  if (cardData.likes && cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  const deleteButton = cardElement.querySelector('.card__delete-button');

  if (cardData.owner._id === userId) {
    deleteButton.style.display = 'block';
  } else {
    deleteButton.style.display = 'none';
  }

  deleteButton.addEventListener('click', () => {
    deleteCardFromServer(cardData._id)
      .then(() => {
        deleteCallback(cardElement);
      })
      .catch(error => {
        console.error('Ошибка удаления карточки:', error);
      });
  });

  cardImage.addEventListener('click', () => {
    openPopupCallback(cardData.link, cardData.name);
  });

  likeButton.addEventListener('click', () => {
    if (!likeButton.classList.contains('card__like-button_is-active')) {
      likeCardOnServer(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.add('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch(error => {
          console.error('Ошибка лайка карточки:', error);
        });
    } else {
      unlikeCardOnServer(cardData._id)
        .then((updatedCard) => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCounter.textContent = updatedCard.likes.length;
        })
        .catch(error => {
          console.error('Ошибка снятия лайка с карточки:', error);
        });
    }
  });

  return cardElement;
}

export function likeCard(likeButton) {
  if (likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  } else {
    console.error('likeButton is undefined');
  }
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
