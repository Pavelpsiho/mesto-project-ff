

function showInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (errorElement) {
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage || inputElement.getAttribute('data-error-message') || '';
        errorElement.classList.add(settings.errorClass);
    }
}

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (errorElement) {
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(settings.errorClass);
    }
}

function checkInputValidity(formElement, inputElement, settings) {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/;
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, settings);
    } else if (inputElement.name === 'name') {
        if (inputElement.value.trim() === '') {
            const errorMessage = "Поле не должно быть пустым";
            inputElement.setCustomValidity(errorMessage);
            showInputError(formElement, inputElement, settings);
        } else if (!nameRegex.test(inputElement.value)) {
            const errorMessage = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
            inputElement.setCustomValidity(errorMessage);
            showInputError(formElement, inputElement, settings);
        } else {
            inputElement.setCustomValidity('');
            hideInputError(formElement, inputElement, settings);
        }
    } else if (inputElement.name === 'link') {
        if (!urlRegex.test(inputElement.value)) {
            const errorMessage = "Пожалуйста, введите корректный URL изображения";
            inputElement.setCustomValidity(errorMessage);
            showInputError(formElement, inputElement, settings);
        } else {
            inputElement.setCustomValidity('');
            hideInputError(formElement, inputElement, settings);
        }
    } else {
        hideInputError(formElement, inputElement, settings);
    }
}


function toggleButtonState(inputList, buttonElement, settings) {
    const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
    if (buttonElement) {
        if (hasInvalidInput) {
            buttonElement.classList.add(settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }
}

function setEventListeners(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    });
}

function clearValidation(formElement, settings) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
    });
    toggleButtonState(inputList, buttonElement, settings);
}
export { enableValidation, clearValidation };

export function isValidUrl(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "']+$/;
    return urlPattern.test(url);
}


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_active'
});

