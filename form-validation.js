document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".register_form__submit");
  const usernameInput = document.querySelector(".Username");
  const emailInput = document.querySelector(".E-mail");
  const privacyCheckbox = document.querySelector(".Privacy_policy");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showError = (input, message) => {
    const existingError = input.parentElement.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    const error = document.createElement("p");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "14px";
    error.style.marginTop = "5px";
    error.style.marginBottom = "1rem";
    error.textContent = message;

    if (input === privacyCheckbox) {
      const checkboxContainer = input.closest(".register_form__checkbox");
      checkboxContainer.appendChild(error);
    } else {
      input.parentElement.insertBefore(error, input.nextSibling);
    }
    input.style.borderColor = "red";
  };

  const clearError = (input) => {
    const errorContainer =
      input === privacyCheckbox
        ? input.closest(".register_form__checkbox")
        : input.parentElement;
    const existingError = errorContainer.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
    input.style.borderColor = "#d6d6d6";
  };

  form.addEventListener("click", (e) => {
    e.preventDefault();

    let isValid = true;

    clearError(usernameInput);
    clearError(emailInput);
    clearError(privacyCheckbox);

    if (!usernameInput.value.trim()) {
      showError(usernameInput, "Username is required");
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, "E-mail is required");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    if (!privacyCheckbox.checked) {
      showError(privacyCheckbox, "You must accept the Privacy Policy");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
    }
  });

  usernameInput.addEventListener("input", () => clearError(usernameInput));
  emailInput.addEventListener("input", () => clearError(emailInput));
  privacyCheckbox.addEventListener("change", () => clearError(privacyCheckbox));
});
