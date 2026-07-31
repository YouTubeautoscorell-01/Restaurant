/* ===========================================
   LOGIN.JS
=========================================== */

/* =========================
   CHECK ALREADY LOGIN
========================= */

const savedPhone =
localStorage.getItem("customerPhone");

if(savedPhone){

window.location.href="../index.html";

}

/* =========================
   LOGIN BUTTON
========================= */

const loginBtn =
document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click",loginCustomer);

}

/* =========================
   ENTER KEY LOGIN
========================= */

const phoneInput =
document.getElementById("phone");

if(phoneInput){

phoneInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

loginCustomer();

}

});

}

/* =========================
   LOGIN FUNCTION
========================= */

function loginCustomer(){

const phone =
phoneInput.value.trim();

/* Empty */

if(phone===""){

alert("Please Enter Mobile Number");

phoneInput.focus();

return;

}

/* Only Number */

if(isNaN(phone)){

alert("Only Numbers Allowed");

phoneInput.focus();

return;

}

/* 10 Digit */

if(phone.length!==10){

alert("Please Enter Valid 10 Digit Mobile Number");

phoneInput.focus();

return;

}

/* Save */

localStorage.setItem(

"customerPhone",

phone

);

/* Login Success */

alert("Login Successful");

/* Redirect */

window.location.href="../index.html";

}
