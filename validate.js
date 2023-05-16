const formElement = document.querySelector(".popup__container");

const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add("popup__input_type_error");
	errorElement.classList.add("popup__error_visible");
	errorElement.textContent = errorMessage;
};


const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove("popup__input_type_error");
	errorElement.classList.remove("popup__error_visible");
	errorElement.textContent = "";
};


const isValid = (formElement, inputElement) => {
	if(!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
};

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
	const buttonElement = formElement.querySelector(".popup__button");
	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			isValid(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		});
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__container"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation(); 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 


const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
  }
};