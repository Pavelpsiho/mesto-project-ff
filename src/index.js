import './pages/index.css';
import { openModal, closeModal, handleOverlayClose } from './components/modal.js';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { initialCards } from './components/cards.js';

function openPopupWithImage(link, name) {
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


function addCardToPage(cardElement) {
    const placesList = document.querySelector('.places__list');
    placesList.appendChild(cardElement);
}


initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard, likeCard, openPopupWithImage);
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

    const newCardElement = createCard(newCardData, deleteCard, likeCard, openPopupWithImage);

    const placesList = document.querySelector('.places__list');
    placesList.insertBefore(newCardElement, placesList.firstChild);

    closeModal(popupNewCard);
    formNewCard.reset();
};

formNewCard.addEventListener('submit', handleNewCardSubmit);