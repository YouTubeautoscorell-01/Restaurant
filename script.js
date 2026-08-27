/* ==========================================
   CUSTOMER APP - COMPLETE SCRIPT.JS
   QUANTITY + CART + FIREBASE
========================================== */


/* =========================
   MOBILE MENU
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

if(menuBtn && mobileMenu){

    menuBtn.addEventListener("click",()=>{

        mobileMenu.classList.toggle("active");

    });

}


/* =========================
   CLOSE MOBILE MENU
========================= */

if(mobileMenu){

    mobileMenu.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click",()=>{

            mobileMenu.classList.remove("active");

        });

    });

}


/* =========================
   STORY POPUP
========================= */

const storyBtn =
    document.getElementById("storyBtn");

const storyPopup =
    document.getElementById("storyPopup");

const closeStory =
    document.getElementById("closeStory");


if(storyBtn && storyPopup){

    storyBtn.addEventListener("click",()=>{

        storyPopup.classList.add("active");

    });

}


if(closeStory && storyPopup){

    closeStory.addEventListener("click",()=>{

        storyPopup.classList.remove("active");

    });

}


window.addEventListener("click",(e)=>{

    if(
        storyPopup &&
        e.target === storyPopup
    ){

        storyPopup.classList.remove("active");

    }

});


/* =========================
   CART
========================= */

let cart = [];


/* =========================
   SAVE CART LOCAL STORAGE
========================= */

function saveCart(){

    try{

        localStorage.setItem(
            "customerCart",
            JSON.stringify(cart)
        );

    }catch(error){

        console.log(
            "Cart save error:",
            error
        );

    }

}


/* =========================
   LOAD CART
========================= */

function loadCart(){

    try{

        const saved =
            localStorage.getItem(
                "customerCart"
            );

        if(saved){

            const parsed =
                JSON.parse(saved);

            if(Array.isArray(parsed)){

                cart =
                    parsed.map(item=>({

                        name:String(item.name),

                        price:Number(item.price),

                        qty:Math.max(
                            1,
                            Number(item.qty) || 1
                        )

                    }));

            }

        }

    }catch(error){

        console.log(
            "Cart load error:",
            error
        );

        cart=[];

    }

}


/* =========================
   UPDATE PRODUCT QUANTITY UI
========================= */

function updateProductQuantity(card,qty){

    if(!card) return;

    const number =
        card.querySelector(
            ".qty-number"
        );

    if(number){

        number.innerText = qty;

    }

}


/* =========================
   PRODUCT QUANTITY CONTROLS
========================= */

const foodCards =
    document.querySelectorAll(
        ".order-card"
    );


foodCards.forEach(card=>{

    const minus =
        card.querySelector(
            ".qty-minus"
        );

    const plus =
        card.querySelector(
            ".qty-plus"
        );

    const number =
        card.querySelector(
            ".qty-number"
        );


    let quantity = 1;


    if(number){

        number.innerText =
            quantity;

    }


    /* PLUS */

    if(plus){

        plus.addEventListener(
            "click",
            ()=>{

                quantity++;

                updateProductQuantity(
                    card,
                    quantity
                );

            }
        );

    }


    /* MINUS */

    if(minus){

        minus.addEventListener(
            "click",
            ()=>{

                if(quantity > 1){

                    quantity--;

                }else{

                    quantity = 1;

                }

                updateProductQuantity(
                    card,
                    quantity
                );

            }
        );

    }


    /* ADD TO CART */

    const addButton =
        card.querySelector(
            ".add-cart"
        );


    if(addButton){

        addButton.addEventListener(
            "click",
            ()=>{

                const nameElement =
                    card.querySelector("h3");

                const priceElement =
                    card.querySelector(
                        ".food-price"
                    );


                if(
                    !nameElement ||
                    !priceElement
                ){

                    return;

                }


                const name =
                    nameElement.innerText.trim();


                const price =
                    parseInt(
                        priceElement.innerText
                            .replace(/[^\d]/g,""),
                        10
                    );


                if(
                    !name ||
                    isNaN(price)
                ){

                    alert(
                        "Unable to add this item."
                    );

                    return;

                }


                /* FIND EXISTING ITEM */

                const existingItem =
                    cart.find(
                        item =>
                            item.name === name
                    );


                /* ADD SELECTED QUANTITY */

                if(existingItem){

                    existingItem.qty +=
                        quantity;

                }else{

                    cart.push({

                        name:name,

                        price:price,

                        qty:quantity

                    });

                }


                saveCart();

                updateCart();


                /* SUCCESS */

                const oldText =
                    addButton.innerText;


                addButton.innerText =
                    "Added ✓";


                setTimeout(()=>{

                    addButton.innerText =
                        oldText;

                },1000);


                /*
                 * Product selector reset
                 * after adding.
                 */

                quantity = 1;

                updateProductQuantity(
                    card,
                    quantity
                );

            }
        );

    }

});


/* =========================
   UPDATE CART
========================= */

function updateCart(){

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    if(
        !cartItems ||
        !cartTotal
    ){

        return;

    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((item,index)=>{

        const itemPrice =
            Number(item.price) || 0;

        const itemQty =
            Math.max(
                1,
                Number(item.qty) || 1
            );


        total +=
            itemPrice * itemQty;


        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <h4>
                    ${escapeHTML(item.name)}
                </h4>

                <p>
                    ₹${itemPrice}
                </p>

            </div>


            <div class="cart-quantity">

                <button
                    class="cart-qty-btn"
                    onclick="changeCartQuantity(${index},-1)">

                    −

                </button>


                <span class="cart-qty-number">

                    ${itemQty}

                </span>


                <button
                    class="cart-qty-btn"
                    onclick="changeCartQuantity(${index},1)">

                    +

                </button>

            </div>


            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });


    cartTotal.innerText =
        "Total : ₹" + total;

}


/* =========================
   CHANGE CART QUANTITY
========================= */

function changeCartQuantity(index,change){

    if(
        index < 0 ||
        index >= cart.length
    ){

        return;

    }


    cart[index].qty =
        Math.max(
            1,
            Number(cart[index].qty) + change
        );


    saveCart();

    updateCart();

}


window.changeCartQuantity =
    changeCartQuantity;


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

    if(
        index < 0 ||
        index >= cart.length
    ){

        return;

    }


    cart.splice(index,1);

    saveCart();

    updateCart();

}


window.removeItem =
    removeItem;


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value){

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}


/* =========================
   BOOKING FORM
========================= */

const bookingForm =
    document.getElementById(
        "bookingForm"
    );


if(bookingForm){

    bookingForm.addEventListener(
        "submit",
        (e)=>{

            e.preventDefault();


            const nameElement =
                document.getElementById(
                    "name"
                );

            const mobileElement =
                document.getElementById(
                    "mobile"
                );


            const name =
                nameElement
                    ? nameElement.value.trim()
                    : "";


            const mobile =
                mobileElement
                    ? mobileElement.value.trim()
                    : "";


            if(!/^\d{10}$/.test(mobile)){

                alert(
                    "Please Enter Valid 10 Digit Mobile Number"
                );

                return;

            }


            alert(

`Thank You ${name}

Your Table Booking Request
Has Been Submitted Successfully.`

            );


            bookingForm.reset();

        }
    );

}


/* =========================
   EXPLORE LOCATION
========================= */

const exploreBtn =
    document.getElementById(
        "exploreLocation"
    );


if(exploreBtn){

    exploreBtn.addEventListener(
        "click",
        ()=>{

            window.open(
                "https://maps.google.com/",
                "_blank"
            );

        }
    );

}


/* =========================
   SCROLL TOP
========================= */

const topBtn =
    document.createElement(
        "button"
    );


topBtn.id =
    "topBtn";

topBtn.innerHTML =
    "↑";


document.body.appendChild(
    topBtn
);


window.addEventListener(
    "scroll",
    ()=>{

        if(window.scrollY > 400){

            topBtn.style.display =
                "block";

        }else{

            topBtn.style.display =
                "none";

        }

    }
);


topBtn.addEventListener(
    "click",
    ()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }
);


/* =========================
   LOADER
========================= */

window.addEventListener(
    "load",
    ()=>{

        const loader =
            document.getElementById(
                "loader"
            );


        if(loader){

            loader.style.opacity =
                "0";


            setTimeout(
                ()=>{

                    loader.remove();

                },
                500
            );

        }

    }
);


/* ==========================================
   SAVE ORDER TO FIREBASE
========================================== */

async function saveOrderToFirebase(){

    try{


        /* =========================
           FIREBASE CHECK
        ========================= */

        if(
            !window.db ||
            !window.fb
        ){

            alert(
                "Firebase is not ready. Please wait a moment and try again."
            );

            return false;

        }


        /* =========================
           PHONE
        ========================= */

        const phone =
            localStorage.getItem(
                "customerPhone"
            );


        if(!phone){

            alert(
                "Please login first."
            );

            return false;

        }


        /* =========================
           CART CHECK
        ========================= */

        if(
            !Array.isArray(cart) ||
            cart.length === 0
        ){

            alert(
                "Cart Empty"
            );

            return false;

        }


        /* =========================
           CLEAN CART
        ========================= */

        const newItems =
            cart.map(item=>({

                name:String(item.name),

                price:Number(item.price),

                qty:Math.max(
                    1,
                    Number(item.qty) || 1
                )

            }));


        /* =========================
           TOTAL
        ========================= */

        const newTotal =
            newItems.reduce(
                (total,item)=>{

                    return total +
                        (
                            item.price *
                            item.qty
                        );

                },
                0
            );


        /* =================================
           CREATE SEPARATE CHEF ORDER
        ================================= */

        await fb.addDoc(

            fb.collection(
                db,
                "orders"
            ),

            {

                customerPhone:phone,

                items:newItems,

                total:newTotal,

                status:"Received",

                createdAt:
                    fb.serverTimestamp(),

                updatedAt:
                    fb.serverTimestamp()

            }

        );


        /* =================================
           BILLING ACTIVE ORDER
        ================================= */

        const billRef =
            fb.doc(
                db,
                "activeOrders",
                phone
            );


        const oldBill =
            await fb.getDoc(
                billRef
            );


        let finalItems = [];


        /* =========================
           EXISTING BILL
        ========================= */

        if(oldBill.exists()){

            const oldData =
                oldBill.data();


            if(
                Array.isArray(
                    oldData.items
                )
            ){

                finalItems =
                    oldData.items.map(
                        item=>({

                            name:
                                String(item.name),

                            price:
                                Number(item.price),

                            qty:
                                Math.max(
                                    1,
                                    Number(item.qty) || 1
                                )

                        })
                    );

            }

        }


        /* =========================
           MERGE ITEMS
        ========================= */

        newItems.forEach(newItem=>{

            const existingIndex =
                finalItems.findIndex(
                    item =>
                        item.name ===
                        newItem.name
                );


            if(existingIndex !== -1){

                finalItems[
                    existingIndex
                ].qty +=
                    newItem.qty;

            }else{

                finalItems.push({

                    name:
                        newItem.name,

                    price:
                        newItem.price,

                    qty:
                        newItem.qty

                });

            }

        });


        /* =========================
           FINAL TOTAL
        ========================= */

        const finalTotal =
            finalItems.reduce(
                (total,item)=>{

                    return total +
                        (
                            Number(item.price) *
                            Number(item.qty)
                        );

                },
                0
            );


        /* =========================
           SAVE ACTIVE BILL
        ========================= */

        await fb.setDoc(

            billRef,

            {

                customerPhone:
                    phone,

                items:
                    finalItems,

                total:
                    finalTotal,

                updatedAt:
                    fb.serverTimestamp()

            },

            {
                merge:true
            }

        );


        /* =========================
           SUCCESS
        ========================= */

        cart = [];

        saveCart();

        updateCart();


        alert(
            "Order Placed Successfully"
        );


        return true;


    }catch(error){

        console.error(
            "Firebase Order Error:",
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


if(checkoutButton){

    checkoutButton.addEventListener(
        "click",
        async()=>{

            if(
                !Array.isArray(cart) ||
                cart.length === 0
            ){

                alert(
                    "Cart Empty"
                );

                return;

            }


            checkoutButton.disabled =
                true;

            checkoutButton.innerText =
                "Processing...";


            const success =
                await saveOrderToFirebase();


            checkoutButton.disabled =
                false;

            checkoutButton.innerText =
                "Checkout";


            if(!success){

                updateCart();

            }

        }
    );

}


/* =========================
   INITIAL LOAD
========================= */

loadCart();

updateCart();
