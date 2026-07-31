/* ==========================================
   SCRIPT.JS
   PART 1
========================================== */

/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.toggle("active");

});

}


/* =========================
   STORY POPUP
========================= */

const storyBtn = document.getElementById("storyBtn");
const storyPopup = document.getElementById("storyPopup");
const closeStory = document.getElementById("closeStory");

if(storyBtn){

storyBtn.addEventListener("click",()=>{

storyPopup.classList.add("active");

});

}

if(closeStory){

closeStory.addEventListener("click",()=>{

storyPopup.classList.remove("active");

});

}

window.addEventListener("click",(e)=>{

if(e.target===storyPopup){

storyPopup.classList.remove("active");

}

});


/* =========================
   CART
========================= */

let cart=[];


/* =========================
   ADD TO CART
========================= */

const addButtons=document.querySelectorAll(".add-cart");

addButtons.forEach(button=>{

button.addEventListener("click",()=>{

const card=button.closest(".order-card");

const name=card.querySelector("h3").innerText;

const price=parseInt(

card.querySelector(".food-price")
.innerText.replace("₹","")

);

cart.push({

name:name,

price:price,

qty:1

});

updateCart();

button.innerHTML="Added ✓";

setTimeout(()=>{

button.innerHTML="Add To Cart";

},1000);

});

});


/* =========================
   UPDATE CART
========================= */

function updateCart(){

const cartItems=document.getElementById("cartItems");

const cartTotal=document.getElementById("cartTotal");

cartItems.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total += item.price * item.qty;

cartItems.innerHTML += `

<div class="cart-item">

<div>

<h4>${item.name}</h4>

<p>

₹${item.price}

× ${item.qty}

</p>

</div>

<button
class="remove-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

`;

});

cartTotal.innerHTML="Total : ₹"+total;

}

/* ========= PART 1 END ========= */
/* ==========================================
   SCRIPT.JS
   PART 2
========================================== */

/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

cart.splice(index,1);

updateCart();

}


/* =========================
   CHECKOUT
========================= */

const checkoutBtn =
document.getElementById("checkoutBtn");

if(checkoutBtn){

checkoutBtn.addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty.");

return;

}

/* Firebase Save
   Part 3 me add hoga */

alert("Order Placed Successfully.");

cart=[];

updateCart();

});

}


/* =========================
   BOOKING FORM
========================= */

const bookingForm =
document.getElementById("bookingForm");

if(bookingForm){

bookingForm.addEventListener("submit",(e)=>{

e.preventDefault();

const name=
document.getElementById("name").value;

const mobile=
document.getElementById("mobile").value;

if(mobile.length!==10){

alert("Please Enter Valid Mobile Number");

return;

}

alert(

`Thank You ${name}

Your Table Booking Request
Has Been Submitted Successfully.`

);

bookingForm.reset();

});

}


/* =========================
   EXPLORE LOCATION
========================= */

const exploreBtn=
document.getElementById("exploreLocation");

if(exploreBtn){

exploreBtn.addEventListener("click",()=>{

window.open(

"https://maps.google.com/?q=Navsari+Gujarat",

"_blank"

);

});

}


/* =========================
   SCROLL TO TOP
========================= */

const topBtn=
document.createElement("button");

topBtn.id="topBtn";

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});


/* =========================
   LOADER
========================= */

window.addEventListener("load",()=>{

const loader=
document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},500);

}

});

/* ========= PART 2 END ========= */
/* ==========================
   FIREBASE ORDER SAVE
========================== */
async function saveOrderToFirebase(){

try{

const phone =
localStorage.getItem("customerPhone");

const order={

customerPhone:phone,

items:cart,

total:cart.reduce(

(t,i)=>t+(i.price*i.qty),

0

),

createdAt:fb.serverTimestamp()

};

await fb.addDoc(

fb.collection(db,"orders"),

order

);

alert("Order Placed Successfully");

}catch(e){

console.log(e);

alert("Firebase Error");

}

}

/* ==========================
   CHECKOUT FIREBASE
========================== */

const checkoutButton =
document.getElementById("checkoutBtn");

if(checkoutButton){

checkoutButton.addEventListener(

"click",

async()=>{

if(cart.length===0){

alert("Cart Empty");

return;

}

await saveOrderToFirebase();

cart=[];

updateCart();

}

);

}
