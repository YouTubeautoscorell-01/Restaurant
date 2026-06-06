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

let cart = [];
let total = 0;

const foodButtons =
document.querySelectorAll(".food-card button");

foodButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

const card =
btn.parentElement;

const name =
card.querySelector("h3").innerText;

const price =
card.querySelector("span")
.innerText
.replace("₹","");

cart.push(name);

total += Number(price);

btn.innerHTML = "Added ✓";

setTimeout(()=>{
btn.innerHTML = "Add To Cart";
},1500);

updateCart();

});

});



/* =========================
   UPDATE CART
========================= */

function updateCart(){

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

cartItems.innerHTML="";

cart.forEach(item=>{

const div =
document.createElement("div");

div.innerHTML=item;

div.style.marginBottom="8px";

cartItems.appendChild(div);

});

cartTotal.innerHTML=
`Total : ₹${total}`;

}


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
