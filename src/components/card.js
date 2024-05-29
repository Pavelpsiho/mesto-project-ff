import { openModal, closeModal } from './modal.js';

export function createCard(cardData, deleteCallback, likeCallback) {
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
    openPopupWithImage(cardData.link, cardData.name);
  });

  likeButton.addEventListener('click', () => {
    likeCallback(likeButton);
  });

  return cardElement;
}

export function openPopupWithImage(link, name) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage); 
}

document.querySelector('.popup_type_image .popup__close').addEventListener('click', () => {
  const popupImage = document.querySelector('.popup_type_image');
  closeModal(popupImage); 
});