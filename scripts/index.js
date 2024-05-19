// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(cardData, deleteCallback) {
    const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
    const cardElement = cardTemplate.querySelector('.places__item');
    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name; 
    cardTitle.textContent = cardData.name; 
  
    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
      deleteCallback(cardElement);
    });
  
    return cardElement;
  }
  
  function addCardToPage(cardElement) {
    const placesList = document.querySelector('.places__list');
    placesList.appendChild(cardElement);
  }

  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, (element) => {
      element.remove();
    });
    addCardToPage(cardElement);
  });

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = popupEditProfile.querySelector('.popup__input_type_name');
const profileDescriptionInput = popupEditProfile.querySelector('.popup__input_type_description');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


popupEditProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupEditProfile);
});


popupNewCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newCard = {
    name: popupNewCardForm.querySelector('.popup__input_type_card-name').value,
    link: popupNewCardForm.querySelector('.popup__input_type_url').value
  };
  const cardElement = createCard(newCard, (element) => {
    element.remove();
  });
  addCardToPage(cardElement);
  popupNewCardForm.reset();
  closePopup(popupNewCard);
});