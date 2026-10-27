
/* CUSTOMER APP — SEARCH + CATEGORY + CART + FIREBASE CHECKOUT */
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const search = document.getElementById("foodSearch");
  const clear = document.getElementById("clearSearch");
  const cards = Array.from(document.querySelectorAll(".order-card"));
  const categoryButtons = Array.from(document.querySelectorAll(".category-btn"));
  const noResults = document.getElementById("noResults");
  const itemCount = document.getElementById("itemCount");
  const heading = document.getElementById("menuHeading");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const phoneDisplay = document.getElementById("customerPhoneDisplay");
  const logout = document.getElementById("logoutBtn");

  let activeCategory = "all";
  let cart = [];

  try {
    const saved = JSON.parse(localStorage.getItem("customerCart") || "[]");
    if (Array.isArray(saved)) {
      cart = saved.filter(item =>
        item &&
        typeof item.name === "string" &&
        Number(item.price) > 0 &&
        Number(item.qty) > 0
      ).map(item => ({
        name: item.name,
        price: Number(item.price),
        qty: Math.min(99, Math.floor(Number(item.qty)))
      }));
    }
  } catch (error) {
    cart = [];
  }

  function getName(card) {
    return (
      card.dataset.name ||
      card.querySelector("h3")?.textContent ||
      ""
    ).trim().toLowerCase();
  }

  function getCategory(card) {
    return (card.dataset.category || "all").trim().toLowerCase();
  }

  function getPrice(card) {
    const el = card.querySelector(".food-price");
    return Number((el?.textContent || "").replace(/[^\d.]/g, "")) || 0;
  }

  function showCards() {
    const term = (search?.value || "").trim().toLowerCase();
    let count = 0;

    cards.forEach(card => {
      const name = getName(card);
      const category = getCategory(card);
      const text = (card.textContent || "").toLowerCase();

      const matchesSearch =
        !term || name.includes(term) || text.includes(term);

      const matchesCategory =
        activeCategory === "all" || category === activeCategory;

      const show = matchesSearch && matchesCategory;

      card.hidden = !show;
      card.style.display = show ? "" : "none";

      if (show) count++;
    });

    if (noResults) noResults.hidden = count > 0;

    if (itemCount) {
      itemCount.textContent =
        count + (count === 1 ? " item" : " items");
    }

    if (heading) {
      heading.textContent = term
        ? "Search Results"
        : activeCategory === "all"
          ? "All Items"
          : activeCategory.charAt(0).toUpperCase() +
            activeCategory.slice(1);
    }
  }

  categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
      activeCategory =
        (button.dataset.category || "all").toLowerCase();

      categoryButtons.forEach(other => {
        const selected = other === button;
        other.classList.toggle("active", selected);
        other.setAttribute("aria-pressed", String(selected));
      });

      showCards();
    });
  });

  if (search) {
    search.addEventListener("input", showCards);
  }

  if (clear) {
    clear.addEventListener("click", function () {
      if (search) {
        search.value = "";
        search.focus();
      }
      showCards();
    });
  }

  function saveCart() {
    localStorage.setItem("customerCart", JSON.stringify(cart));
  }

  function renderCart() {
    const totalQty = cart.reduce(
      (sum, item) => sum + item.qty,
      0
    );

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    if (cartCount) {
      cartCount.textContent = totalQty + " items";
    }

    if (cartTotal) {
      cartTotal.textContent = "Total : ₹" + total;
    }

    if (!cartItems) return;

    if (cart.length === 0) {
      cartItems.innerHTML =
        '<div class="cart-empty"><p>Your cart is empty.</p></div>';
      return;
    }

    cartItems.innerHTML = "";

    cart.forEach(function (item, index) {
      const row = document.createElement("div");
      row.className = "cart-item";

      const info = document.createElement("div");
      info.className = "cart-item-info";

      const name = document.createElement("div");
      name.className = "cart-item-name";
      name.textContent = item.name;

      const price = document.createElement("div");
      price.className = "cart-item-price";
      price.textContent = "₹" + item.price + " × " + item.qty;

      info.append(name, price);

      const controls = document.createElement("div");
      controls.className = "cart-item-controls";

      [["−", -1], ["+", 1]].forEach(function (entry) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = entry[0];

        button.addEventListener("click", function () {
          cart[index].qty += entry[1];

          if (cart[index].qty <= 0) {
            cart.splice(index, 1);
          }

          saveCart();
          renderCart();
        });

        controls.appendChild(button);
      });

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", "Remove " + item.name);

      remove.addEventListener("click", function () {
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });

      controls.appendChild(remove);
      row.append(info, controls);
      cartItems.appendChild(row);
    });
  }

  cards.forEach(function (card) {
    let quantity = 1;

    const number = card.querySelector(".qty-number");
    const minus = card.querySelector(".qty-minus");
    const plus = card.querySelector(".qty-plus");
    const add = card.querySelector(".add-cart");

    function updateQuantity() {
      if (number) number.textContent = quantity;
    }

    if (minus) {
      minus.addEventListener("click", function () {
        quantity = Math.max(1, quantity - 1);
        updateQuantity();
      });
    }

    if (plus) {
      plus.addEventListener("click", function () {
        quantity = Math.min(99, quantity + 1);
        updateQuantity();
      });
    }

    if (add) {
      add.addEventListener("click", function () {
        const name = (
          card.querySelector("h3")?.textContent || ""
        ).trim();

        const price = getPrice(card);

        if (!name || price <= 0) {
          alert("Food name ya price nahi mila. Menu card check karein.");
          return;
        }

        const existing = cart.find(item =>
          item.name.toLowerCase() === name.toLowerCase() &&
          Number(item.price) === price
        );

        if (existing) {
          existing.qty = Math.min(999, existing.qty + quantity);
        } else {
          cart.push({
            name,
            price,
            qty: quantity
          });
        }

        saveCart();
        renderCart();

        const oldText = add.textContent;
        add.textContent = "Added ✓";
        quantity = 1;
        updateQuantity();

        setTimeout(function () {
          if (add.isConnected) add.textContent = oldText;
        }, 900);
      });
    }
  });

  // Display the logged-in customer's mobile number.
  if (phoneDisplay) {
    phoneDisplay.textContent =
      localStorage.getItem("customerPhone") || "Not logged in";
  }

  // Place order in the Chef collection and Billing collection.
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async function () {
      if (!cart.length) {
        alert("Please add food items to your cart first.");
        return;
      }

      const customerPhone = (
        localStorage.getItem("customerPhone") || ""
      ).replace(/\D/g, "");

      if (!/^\d{10}$/.test(customerPhone)) {
        alert("Customer mobile number nahi mila. Please login again.");
        return;
      }

      if (!window.db || !window.fb) {
        alert("Firebase load nahi hua. Page refresh karke try karein.");
        return;
      }

      const items = cart.map(item => ({
        name: String(item.name),
        price: Number(item.price),
        qty: Number(item.qty)
      }));

      const total = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      checkoutBtn.disabled = true;
      const originalText = checkoutBtn.innerHTML;
      checkoutBtn.textContent = "Sending Order...";

      try {
        const db = window.db;
        const fb = window.fb;

        const orderRef = fb.doc(fb.collection(db, "orders"));
        const billingRef = fb.doc(
          db,
          "activeOrders",
          orderRef.id
        );

        const orderData = {
          customerPhone,
          items,
          total,
          status: "Received",
          createdAt: fb.serverTimestamp(),
          updatedAt: fb.serverTimestamp()
        };

        const batch = fb.writeBatch(db);
        batch.set(orderRef, orderData);
        batch.set(billingRef, orderData);

        await batch.commit();

        cart = [];
        saveCart();
        renderCart();

        alert("Order placed successfully!");

      } catch (error) {
        console.error("ORDER SUBMISSION ERROR:", error);

        alert(
          "Order place nahi hua.\n\n" +
          "Error: " + error.message +
          "\n\nFirebase Firestore rules aur connection check karein."
        );
      } finally {
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = originalText;
      }
    });
  }

  // Logout and return to the number-entry page.
  if (logout) {
    logout.addEventListener("click", function () {
      localStorage.removeItem("customerPhone");
      localStorage.removeItem("customerCart");
      window.location.href = "customer-login/login.html";
    });
  }

  renderCart();
  showCards();

  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});
