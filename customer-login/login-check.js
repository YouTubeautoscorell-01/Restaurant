;
"use strict";

(function () {
  function hasValidCustomerPhone() {
    try {
      const phone = localStorage.getItem("customerPhone") || "";
      return /^[6-9]\d{9}$/.test(phone);
    } catch (error) {
      console.error("Customer login check error:", error);
      return false;
    }
  }

  if (!hasValidCustomerPhone()) {
    window.location.replace("customer-login/login.html");
  }

  window.logoutCustomer = function () {
    try {
      localStorage.removeItem("customerPhone");
      localStorage.removeItem("customerCart");
    } catch (error) {
      console.error("Logout error:", error);
    }

    window.location.replace("customer-login/login.html");
  };
})();
