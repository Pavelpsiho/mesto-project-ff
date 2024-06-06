export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

const avatarPopup = document.querySelector('.popup_type_avatar');
const closeAvatarPopupButton = avatarPopup.querySelector('.popup__close');

closeAvatarPopupButton.addEventListener('click', () => {
  closeModal(avatarPopup);
});

function handleEscClose(event) {
  if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
          closeModal(openedPopup);
      }
  }
}

export function handleOverlayClose(event) {
  if (event.target.classList.contains('popup')) {
      closeModal(event.target);
  }
}