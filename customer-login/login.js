
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const phoneInput = document.getElementById("mobileNumber");
  const errorMessage = document.getElementById("loginError");
  const continueButton = document.getElementById("continueBtn");

  if (!form || !phoneInput) {
    console.error("Login form ya mobile number field nahi mila.");
    return;
  }

  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.hidden = false;
    }
  }

  function clearError() {
    if (errorMessage) {
      errorMessage.textContent = "";
      errorMessage.hidden = true;
    }
  }

  phoneInput.addEventListener("input", function () {
    phoneInput.value = phoneInput.value
      .replace(/\D/g, "")
      .slice(0, 10);

    clearError();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearError();

    const phone = phoneInput.value.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showError("Valid 10-digit Indian mobile number enter karein.");
      phoneInput.focus();
      return;
    }

    try {
      localStorage.setItem("customerPhone", phone);
    } catch (error) {
      showError("Browser storage available nahi hai. Browser settings check karein.");
      console.error("Login storage error:", error);
      return;
    }

    if (continueButton) {
      continueButton.disabled = true;
      continueButton.textContent = "Opening menu...";
    }

    window.location.href = "../index.html";
  });
});
