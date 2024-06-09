const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const descriptionRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const titleRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (errorElement) {
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
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
    let errorMessage = "";

    if (inputElement.validity.valueMissing) {
        errorMessage = "Поле не должно быть пустым";
    } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
        errorMessage = inputElement.validationMessage;
    } else if (inputElement.name === 'name' || inputElement.name === 'place-name') {
        const regex = inputElement.name === 'name' ? nameRegex : titleRegex;
        if (!regex.test(inputElement.value)) {
            errorMessage = inputElement.getAttribute('data-error-message');
        }
    } else if (inputElement.name === 'description') {
        if (!descriptionRegex.test(inputElement.value)) {
            errorMessage = inputElement.getAttribute('data-error-message');
        }
    } else if (inputElement.name === 'link' || inputElement.name === 'avatar-url') {
        if (!urlRegex.test(inputElement.value)) {
            errorMessage = inputElement.getAttribute('data-error-message');
        }
    }

    if (errorMessage) {
        inputElement.setCustomValidity(errorMessage);
        showInputError(formElement, inputElement, errorMessage, settings);
    } else {
        inputElement.setCustomValidity('');
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
            inputElement.classList.add('input-touched');
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });

        inputElement.addEventListener('focus', () => {
            hideInputError(formElement, inputElement, settings);
        });

        inputElement.addEventListener('blur', () => {
            if (inputElement.value.length > 0) {
                inputElement.classList.add('input-touched');
                checkInputValidity(formElement, inputElement, settings);
            }
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
        inputElement.setCustomValidity('');
        hideInputError(formElement, inputElement, settings);
        inputElement.classList.remove('input-touched');
    });
    toggleButtonState(inputList, buttonElement, settings);
}

function isValidUrl(url) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "']+$/;
    return urlPattern.test(url);
}

export { enableValidation, clearValidation, showInputError, isValidUrl };
