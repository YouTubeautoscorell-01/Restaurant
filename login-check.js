/* ===========================================
   LOGIN-CHECK.JS
=========================================== */

/* =========================
   CHECK LOGIN
========================= */

const customerPhone =
localStorage.getItem("customerPhone");

if(!customerPhone){

window.location.replace("customer-login/login.html");

}

/* =========================
   PREVENT BACK BUTTON
========================= */

history.pushState(null,null,location.href);

window.onpopstate=function(){

history.go(1);

};

/* =========================
   LOGOUT FUNCTION
========================= */

function logoutCustomer(){

localStorage.removeItem("customerPhone");

window.location.replace("customer-login/login.html");

}

/* Global */

window.logoutCustomer=logoutCustomer;