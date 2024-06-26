import './pages/index.css';
import { openModal, closeModal, handleOverlayClose } from './components/modal.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { enableValidation, clearValidation, isValidUrl, showInputError, toggleButtonState } from './components/validation.js';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  deleteCardFromServer,
  likeCardOnServer,
  unlikeCardOnServer,
  updateAvatar
} from './components/api.js';


let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarElement.src = userData.avatar;
    const storedAvatar = localStorage.getItem('userAvatar');
    avatarElement.style.backgroundImage = storedAvatar ? `url(${storedAvatar})` : `url(${userData.avatar})`;
    cards.forEach(cardData => {
      const cardElement = createCard(cardData, userId, deleteCard, openPopupWithImage);
      addCardToPage(cardElement);
    });
  })
  .catch(err => console.log(err));

export function openPopupWithImage(link, name) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage?.querySelector('.popup__image');
  const imagePopupCaption = popupImage?.querySelector('.popup__caption');

  if (popupImageElement && imagePopupCaption && popupImage) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    imagePopupCaption.textContent = name;
    openModal(popupImage);
  }
}

const popupImage = document.querySelector('.popup_type_image');
popupImage?.querySelector('.popup__close')?.addEventListener('click', () => closeModal(popupImage));

function addCardToPage(cardElement) {
  const placesList = document.querySelector('.places__list');
  placesList?.appendChild(cardElement);
}

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = editProfileForm?.querySelector('.popup__input_type_name');
const jobInput = editProfileForm?.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton?.addEventListener('click', () => {
  if (nameInput) nameInput.value = profileTitle?.textContent;
  if (jobInput) jobInput.value = profileDescription?.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(popupEditProfile);
});

profileAddButton?.addEventListener('click', () => {
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});

popupEditProfile?.querySelector('.popup__close')?.addEventListener('click', () => {
  closeModal(popupEditProfile);
  clearValidation(editProfileForm, validationConfig);
});
popupNewCard?.querySelector('.popup__close')?.addEventListener('click', () => {
  closeModal(popupNewCard);
  clearValidation(popupNewCard, validationConfig);
});

const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();
  const saveButton = editProfileForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  const name = nameInput.value;
  const job = jobInput.value;

  updateUserInfo(name, job)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
};

editProfileForm.addEventListener('submit', handleFormSubmitEditProfile);

const formNewCard = document.querySelector('.popup__form[name="new-place"]');
const titleNewCardInput = formNewCard?.querySelector('.popup__input_type_card-name');
const linkNewCardInput = formNewCard?.querySelector('.popup__input_type_url');

const handleFormSubmitNewCard = (evt) => {
  evt.preventDefault();
  const saveButton = formNewCard.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  const newCardTitle = titleNewCardInput?.value;
  const newCardLink = linkNewCardInput?.value;

  addNewCard(newCardTitle, newCardLink)
    .then((cardData) => {
      const newCardElement = createCard(cardData, userId, deleteCard, openPopupWithImage);
      const placesList = document.querySelector('.places__list');
      placesList.insertBefore(newCardElement, placesList.firstChild);
      closeModal(popupNewCard);
      formNewCard.reset();
      clearValidation(formNewCard, validationConfig);
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveButton.textContent = 'Создать';
    });
};

formNewCard.addEventListener('submit', handleFormSubmitNewCard);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error_active'
};

enableValidation(validationConfig);

const editButton = document.querySelector('.profile__icon_button');
const avatarForm = document.querySelector('.popup__form[name="avatar"]');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar-url');
const avatarElement = document.querySelector('.profile__image');
const addButton = document.querySelector('.profile__icon_button');
const avatarPopup = document.querySelector('.popup_type_avatar');

editButton.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

addButton.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

const handleAvatarSubmit = (evt) => {
  evt.preventDefault();
  const saveButton = avatarForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  const avatarUrl = avatarInput.value;

  if (!isValidUrl(avatarUrl)) {
    const errorMessage = avatarInput.getAttribute('data-error-message') || 'Пожалуйста, введите корректный URL изображения';
    showInputError(avatarForm, avatarInput, errorMessage, validationConfig);
    saveButton.textContent = 'Сохранить';
    return;
  }

  updateAvatar(avatarUrl)
    .then((userData) => {
      if (avatarElement) {
        avatarElement.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(avatarPopup);
        avatarForm.reset();
        clearValidation(avatarForm, validationConfig);
      } else {
        console.error('Avatar element not found');
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
};

avatarForm.addEventListener('submit', handleAvatarSubmit);

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.addEventListener('click', handleOverlayClose));