/* ==========================================
   CUSTOMER APP - FINAL SCRIPT
========================================== */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

  });

}


/* =========================
   STORY POPUP
========================= */

const storyBtn = document.getElementById("storyBtn");
const storyPopup = document.getElementById("storyPopup");
const closeStory = document.getElementById("closeStory");

if (storyBtn && storyPopup) {

  storyBtn.addEventListener("click", () => {

    storyPopup.classList.add("active");

  });

}

if (closeStory && storyPopup) {

  closeStory.addEventListener("click", () => {

    storyPopup.classList.remove("active");

  });

}

window.addEventListener("click", (e) => {

  if (storyPopup && e.target === storyPopup) {

    storyPopup.classList.remove("active");

  }

});


/* =========================
   CART
========================= */

let cart = [];


/* =========================
   ADD TO CART
========================= */

const addButtons =
  document.querySelectorAll(".add-cart");

addButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const card =
      button.closest(".order-card");

    if (!card) return;

    const nameElement =
      card.querySelector("h3");

    const priceElement =
      card.querySelector(".food-price");

    if (!nameElement || !priceElement) {

      alert("Food information not found.");

      return;

    }

    const name =
      nameElement.innerText.trim();

    const price =
      parseInt(
        priceElement.innerText
          .replace(/[^\d]/g, ""),
        10
      );

    if (!name || isNaN(price)) {

      alert("Invalid food information.");

      return;

    }


    /* Check existing item */

    const existingItem =
      cart.find(item => item.name === name);


    if (existingItem) {

      existingItem.qty += 1;

    } else {

      cart.push({

        name: name,

        price: price,

        qty: 1

      });

    }


    updateCart();

    button.innerHTML = "Added ✓";

    setTimeout(() => {

      button.innerHTML = "Add To Cart";

    }, 1000);

  });

});


/* =========================
   UPDATE CART
========================= */

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");


  if (!cartItems || !cartTotal) return;


  cartItems.innerHTML = "";

  let total = 0;


  cart.forEach((item, index) => {

    total +=
      item.price * item.qty;


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


  cartTotal.innerHTML =
    "Total : ₹" + total;

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

  if (
    index < 0 ||
    index >= cart.length
  ) {

    return;

  }

  cart.splice(index, 1);

  updateCart();

}

window.removeItem = removeItem;


/* =========================
   BOOKING FORM
========================= */

const bookingForm =
  document.getElementById("bookingForm");

if (bookingForm) {

  bookingForm.addEventListener("submit", (e) => {

    e.preventDefault();


    const nameElement =
      document.getElementById("name");

    const mobileElement =
      document.getElementById("mobile");


    const name =
      nameElement
        ? nameElement.value.trim()
        : "";


    const mobile =
      mobileElement
        ? mobileElement.value.trim()
        : "";


    if (mobile.length !== 10) {

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
   EXPLORE LOCATION
========================= */

const exploreBtn =
  document.getElementById(
    "exploreLocation"
  );

if (exploreBtn) {

  exploreBtn.addEventListener("click", () => {

    window.open(
      "https://maps.google.com/?q=Restaurant",
      "_blank"
    );

  });

}


/* =========================
   SCROLL TO TOP
========================= */

const topBtn =
  document.createElement("button");

topBtn.id = "topBtn";

topBtn.innerHTML = "↑";

document.body.appendChild(topBtn);


window.addEventListener("scroll", () => {

  if (window.scrollY > 400) {

    topBtn.style.display = "block";

  } else {

    topBtn.style.display = "none";

  }

});


topBtn.addEventListener("click", () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

});


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

  const loader =
    document.getElementById("loader");

  if (loader) {

    loader.style.opacity = "0";

    setTimeout(() => {

      loader.remove();

    }, 500);

  }

});


/* ==========================================
   FIREBASE ORDER SAVE
========================================== */

async function saveOrderToFirebase() {

  try {

    /* Firebase ready check */

    if (
      !window.db ||
      !window.fb
    ) {

      alert(
        "Firebase is not ready. Please wait a moment and try again."
      );

      return false;

    }


    /* Customer phone */

    const phone =
      localStorage.getItem(
        "customerPhone"
      );


    if (!phone) {

      alert(
        "Customer login required."
      );

      return false;

    }


    /* Cart check */

    if (
      !Array.isArray(cart) ||
      cart.length === 0
    ) {

      alert("Cart Empty");

      return false;

    }


    /* Clean cart */

    const newItems =
      cart.map(item => ({

        name: String(item.name),

        price: Number(item.price),

        qty: Number(item.qty)

      }));


    /* Same customer = same bill */

    const orderRef =
      fb.doc(
        db,
        "activeOrders",
        phone
      );


    /* Check existing order */

    const oldOrder =
      await fb.getDoc(orderRef);


    let finalItems = [];


    if (oldOrder.exists()) {

      const oldData =
        oldOrder.data();


      finalItems =
        Array.isArray(oldData.items)
          ? oldData.items.map(item => ({

              name: String(item.name),

              price: Number(item.price),

              qty: Number(item.qty)

            }))
          : [];


      /* Merge new items */

      newItems.forEach(newItem => {

        const existingIndex =
          finalItems.findIndex(
            item =>
              item.name === newItem.name
          );


        if (existingIndex !== -1) {

          finalItems[existingIndex].qty +=
            newItem.qty;

        } else {

          finalItems.push({

            name: newItem.name,

            price: newItem.price,

            qty: newItem.qty

          });

        }

      });


    } else {

      finalItems = newItems;

    }


    /* Calculate total */

    const finalTotal =
      finalItems.reduce(
        (total, item) =>
          total +
          (
            Number(item.price) *
            Number(item.qty)
          ),
        0
      );


    /* Save */

    await fb.setDoc(

      orderRef,

      {

        customerPhone: phone,

        items: finalItems,

        total: finalTotal,

        updatedAt:
          fb.serverTimestamp()

      }

    );


    /* Clear cart */

    cart = [];

    updateCart();


    alert(
      "Order Placed Successfully"
    );


    return true;


  } catch (error) {

    console.error(
      "FIREBASE ORDER ERROR:",
      error
    );


    alert(
      "Firebase Error:\n" +
      error.message
    );


    return false;

  }

}


/* =========================
   CHECKOUT
========================= */

const checkoutButton =
  document.getElementById(
    "checkoutBtn"
  );


if (checkoutButton) {

  checkoutButton.addEventListener(
    "click",
    async () => {

      if (cart.length === 0) {

        alert("Cart Empty");

        return;

      }


      await saveOrderToFirebase();

    }
  );

}


/* =========================
   INITIAL CART
========================= */

updateCart();
