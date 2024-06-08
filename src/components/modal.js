
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

export function handleOverlayClose(event) {
  if (event.target.classList.contains('popup')) {
    closeModal(event.target);
  }
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_is-opened') || event.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
