function handleEscClose(event) {
    if (event.key === 'Escape') {
      const popups = document.querySelectorAll('.popup');
      popups.forEach(popup => {
        if (popup.style.display === 'flex') {
          closeModal(popup);
        }
      });
    }
  }
  
  export function openModal(modalElement) {
    modalElement.style.transition = 'visibility 0s, opacity 0.6s';
    setTimeout(() => {
      modalElement.style.visibility = 'visible';
      modalElement.style.opacity = '1';
      modalElement.style.display = 'flex';
    }, 0);
    document.addEventListener('keydown', handleEscClose);
  }
  
  export function closeModal(modalElement) {
    modalElement.style.opacity = '0';
    setTimeout(() => {
      modalElement.style.display = 'none';
      modalElement.style.visibility = 'hidden';
    }, 600);
  }
  
  export function handleOverlayClose(event) {
    if (event.target.classList.contains('popup')) {
      closeModal(event.target);
    }
  }
