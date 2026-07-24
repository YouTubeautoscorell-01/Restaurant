alert("script.js loaded");
import { saveOrder } from "./firebase.js";
/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
mobileMenu.classList.toggle("active");
});

/* =========================
   STORY POPUP
========================= */

const storyBtn = document.getElementById("storyBtn");
const storyPopup = document.getElementById("storyPopup");
const closeStory = document.getElementById("closeStory");

storyBtn.addEventListener("click", () => {
storyPopup.classList.add("active");
});

closeStory.addEventListener("click", () => {
storyPopup.classList.remove("active");
});

window.addEventListener("click", (e) => {
if(e.target === storyPopup){
storyPopup.classList.remove("active");
}
});

/* =========================
   ADD TO CART
========================= */

let cart=[];

document.querySelectorAll(".add-cart").forEach(button=>{

button.addEventListener("click",()=>{

const card=button.closest(".order-card");

const name=card.querySelector("h3").innerText;

const price=parseInt(
card.querySelector(".food-price")
.innerText.replace("₹","")
);

cart.push({
name,
price
});

updateCart();

button.innerHTML="Added ✓";

setTimeout(()=>{
button.innerHTML="Add To Cart";
},1000);

});

});

function updateCart(){

const cartItems=document.getElementById("cartItems");

const cartTotal=document.getElementById("cartTotal");

cartItems.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total+=item.price;

cartItems.innerHTML+=`

<div class="cart-item">

<div>

<h4>${item.name}</h4>

<p>₹${item.price}</p>

</div>

<button class="remove-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

`;

});

cartTotal.innerHTML="Total : ₹"+total;

}

function removeItem(index){

cart.splice(index,1);

updateCart();

}

document.getElementById("checkoutBtn").addEventListener("click", async ()=>{

if(cart.length===0){

alert("Cart Empty");

return;

}

let total=0;

cart.forEach(item=>{

total+=item.price;

});

try{

const order=await addDoc(

collection(window.db,"orders"),

{

status:"Pending",

createdAt:new Date(),

items:cart,

total:total

}

);

alert("Order Placed");

console.log(order.id);

cart=[];

updateCart();

}catch(e){

alert("Order Failed");

console.log(e);

}

});



/* =========================
   BOOKING FORM
========================= */

const bookingForm =
document.getElementById("bookingForm");

if(bookingForm){

bookingForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const name =
document.getElementById("name").value;

const mobile =
document.getElementById("mobile").value;

if(mobile.length !== 10){

alert(
"Please Enter Valid Mobile Number"
);

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
   FADE ANIMATION
========================= */

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{
threshold:0.2
}

);

document
.querySelectorAll(
".food-card,.contact-box,.story-section,.location-section,.booking-section"
)
.forEach(el=>{

el.classList.add("fade-up");

observer.observe(el);

});

/* =========================
   SCROLL TO TOP BUTTON
========================= */

const topBtn =
document.createElement("button");

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="20px";
topBtn.style.left="20px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.border="none";
topBtn.style.cursor="pointer";
topBtn.style.fontSize="22px";
topBtn.style.background="#E8D7B0";
topBtn.style.color="#16352D";
topBtn.style.borderRadius="50%";
topBtn.style.display="none";
topBtn.style.zIndex="999";

window.addEventListener("scroll",()=>{

if(window.scrollY > 500){

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
   LOCATION BUTTON
========================= */

const exploreBtn =
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
   BOOKING SUCCESS CARD
========================= */

function bookingSuccess(){

const success =
document.createElement("div");

success.innerHTML=
"Booking Request Submitted Successfully ✓";

success.style.position="fixed";
success.style.top="30px";
success.style.right="30px";
success.style.background="#1e4037";
success.style.color="#fff";
success.style.padding="15px 25px";
success.style.border="1px solid #E8D7B0";
success.style.zIndex="9999";

document.body.appendChild(success);

setTimeout(()=>{
success.remove();
},3000);

}

/* =========================
   PREMIUM PARALLAX
========================= */

window.addEventListener("scroll",()=>{

const scroll =
window.pageYOffset;

const hero =
document.querySelector(".hero");

if(hero){

hero.style.backgroundPositionY =
scroll * 0.4 + "px";

}

});

/* =========================
   LOADER
========================= */

window.addEventListener("load",()=>{

const loader =
document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{
loader.remove();
},500);

}

});
