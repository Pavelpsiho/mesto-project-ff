import './pages/index.css';
import { openModal, closeModal, handleOverlayClose } from './components/modal.js';
import { createCard } from './components/card.js';


function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}


document.addEventListener('DOMContentLoaded', () => {
  const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
  ];
  function addCardToPage(cardElement) {
    const placesList = document.querySelector('.places__list');
    placesList.appendChild(cardElement);
  }

  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, (element) => {
      element.remove();
    }, likeCard);
    addCardToPage(cardElement);
  });

  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');
  const popupEditProfile = document.querySelector('.popup_type_edit');
  const popupNewCard = document.querySelector('.popup_type_new-card');

  profileEditButton.addEventListener('click', () => openModal(popupEditProfile));
  profileAddButton.addEventListener('click', () => openModal(popupNewCard));

  popupEditProfile.querySelector('.popup__close').addEventListener('click', () => closeModal(popupEditProfile));
  popupNewCard.querySelector('.popup__close').addEventListener('click', () => closeModal(popupNewCard));

  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => popup.addEventListener('click', handleOverlayClose));

  const formElement = document.querySelector('.popup__form[name="edit-profile"]');
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const jobInput = formElement.querySelector('.popup__input_type_description');
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;

    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;

    closeModal(popupEditProfile);
  };

  formElement.addEventListener('submit', handleFormSubmit);

  const formNewCard = document.querySelector('.popup__form[name="new-place"]');
  const titleNewCardInput = formNewCard.querySelector('.popup__input_type_card-name');
  const linkNewCardInput = formNewCard.querySelector('.popup__input_type_url');
  
  const handleNewCardSubmit = (evt) => {
    evt.preventDefault();
    const newCardTitle = titleNewCardInput.value;
    const newCardLink = linkNewCardInput.value;
  
    const newCardData = {
      name: newCardTitle,
      link: newCardLink
    };
  
    const newCardElement = createCard(newCardData, (element) => {
      element.remove();
    }, likeCard);
  
    const placesList = document.querySelector('.places__list');
    placesList.insertBefore(newCardElement, placesList.firstChild);
  
    closeModal(popupNewCard);
    formNewCard.reset(); 
  };
  
  formNewCard.addEventListener('submit', handleNewCardSubmit);
  
});
