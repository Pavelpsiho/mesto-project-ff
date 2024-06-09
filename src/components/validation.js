
function isValid(form, input, validationConfig) {
    if (input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    } else {
        input.setCustomValidity("");
    }

    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, validationConfig);
    } else {
        hideInputError(form, input, validationConfig);
    }
}

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
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });

        inputElement.addEventListener('focus', () => {
            hideInputError(formElement, inputElement, settings);
        });

        inputElement.addEventListener('blur', () => {
            if (inputElement.value.length > 0) {
                inputElement.classList.add('input-touched');
                isValid(formElement, inputElement, settings);
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
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_active'
};

enableValidation(validationConfig);

export { toggleButtonState, setEventListeners, enableValidation, clearValidation, showInputError, isValidUrl };
