function showInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(settings.errorClass);
    }
}

function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
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
    } else if (inputElement.name === 'name' || inputElement.name === 'title') {
        if (!nameRegex.test(inputElement.value)) {
            inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
            showInputError(formElement, inputElement, settings);
        } else {
            inputElement.setCustomValidity('');
            hideInputError(formElement, inputElement, settings);
        }
    } else if (inputElement.name === 'link') {
        if (!urlRegex.test(inputElement.value)) {
            inputElement.setCustomValidity("Пожалуйста, введите корректный URL изображения");
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
