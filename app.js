// -------------- NAV BAR ------------- //

let toggleBtn = document.getElementsByClassName("toggle-button")[0];
let navbar = document.getElementsByClassName("nav-list")[0];

toggleBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// --------------------- ANIMATIONS ----------------------- //

gsap.registerPlugin(ScrollTrigger);

let tl1 = gsap.timeline();

tl1.from(".nav-flex", {
  opacity: 0.1,
  scale: 0.5,
  duration: 1.5,
  ease: "slow",
});

tl1.from(
  ".header",
  {
    opacity: 0,
    scale: 2,
    duration: 1,
    ease: "power1",
  },
  "-=2"
);

tl1.from(
  ".one",
  {
    opacity: 0,
    y: 100,
    stagger: 0.3,
    ease: "slow",
    duration: 1,
  },
  "-=1"
);

tl1.to(".header", {
  scrollTrigger: {
    trigger: ".header",
    start: "100px 50%",
    scrub: 2,
  },
  scale: 0.41,
  duration: 1,
  ease: "power1",
});

let tl2 = gsap.timeline();

tl2.to(".content", {
  scrollTrigger: {
    trigger: ".content",
    start: "top center",
    end: "bottom 90%",
    scrub: 2,
  },
  scale: 1.3,
  duration: 2,
  ease: "slow",
});

let tl3 = gsap.timeline();

tl3.from(".showcase-flex", {
  scrollTrigger: {
    trigger: ".showcase-flex",
    start: "-150px 60%",
    end: "bottom 95%",
    scrub: 2,
  },
  scale: 0.2,
  opacity: 0,
  x: "-100px",
  y: "50px",
  duration: 3.5,
  ease: "slow",
});

let tl4 = gsap.timeline();

tl4.from(".items", {
  scrollTrigger: {
    trigger: ".products",
    start: "top 20%",
    end: "center 60%",
    scrub: 2,
  },
  scale: 0,
  opacity: 0,
  duration: 3,
  stagger: 0.5,
  ease: "back",
});

let tl5 = gsap.timeline();

tl5.from(".two", {
  scrollTrigger: {
    trigger: ".two",
    start: "top 60%",
    end: "center 70%",
    scrub: 1,
  },
  opacity: 0,
  scale: 0.1,
  duration: 3,
  stagger: 1,
  ease: "slow",
});

// ------------ CART -------------------//

let cart = document.querySelectorAll(".add-cart");

let items = [
  {
    name: "hi-neck",
    tag: "hi-neck",
    price: 60.0,
    count: 0,
  },
  {
    name: "white",
    tag: "white",
    price: 70.0,
    count: 0,
  },
  {
    name: "green",
    tag: "green",
    price: 50.0,
    count: 0,
  },
  {
    name: "pink",
    tag: "pink",
    price: 65.0,
    count: 0,
  },
  {
    name: "grey",
    tag: "grey",
    price: 75.0,
    count: 0,
  },
  {
    name: "black",
    tag: "black",
    price: 55.0,
    count: 0,
  },
];

for (let i = 0; i < cart.length; i++) {
  cart[i].addEventListener("click", () => {
    cartNumber(items[i]);
    totalCost(items[i]);
    tax();
  });
}

function cartCount() {
  let productNumber = localStorage.getItem("cartNumber");

  document.querySelector(".cart span").textContent = productNumber;
}

function cartNumber(items, action) {
  let productNumber = localStorage.getItem("cartNumber");
  productNumber = parseInt(productNumber);

  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem("cartNumber", productNumber - 1);
    document.querySelector(".cart span").textContent = productNumber - 1;
  } else if (productNumber) {
    localStorage.setItem("cartNumber", productNumber + 1);
    document.querySelector(".cart span").textContent = productNumber + 1;
  } else {
    localStorage.setItem("cartNumber", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(items);
}

function setItems(items) {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[items.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [items.tag]: items,
      };
    }
    cartItems[items.tag].count += 1;
  } else {
    items.count = 1;
    cartItems = {
      [items.tag]: items,
    };
  }

  localStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function totalCost(items, action) {
  let cartCost = localStorage.getItem("cartCost");

  if (action == "decrease") {
    cartCost = parseInt(cartCost);

    localStorage.setItem("cartCost", cartCost - items.price);
  } else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("cartCost", cartCost + items.price);
  } else {
    localStorage.setItem("cartCost", items.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  let products = document.querySelector(".products-cart");

  let cartCost = localStorage.getItem("cartCost");
  let totalTax = localStorage.getItem("totalTax");
  let totalAfterTax = localStorage.getItem("totalAfterTax");

  if (cartItems && products) {
    products.innerHTML = "";
    Object.values(cartItems).map((item) => {
      products.innerHTML += `<div class="product">
      <ion-icon name="trash-outline"></ion-icon>
      <img src="./images/${item.tag}.png">
      <span> ${item.name} </span>
      </div>

      <div class="cart-price">$${item.price}.00</div>

      <div class="quantity">
      <ion-icon class="decrease" name="chevron-back-circle-outline"></ion-icon>
      <span> ${item.count} </span>
      <ion-icon class="increase" name="chevron-forward-circle-outline"></ion-icon>
      </div>
      <div class="total">
           <span> $${item.count * item.price}.00 </span>
      </div>
      `;
    });

    products.innerHTML += `
          <div class="basketTotalContainer">
            <div class="basket">
                <h4 class="basketTitle">
                    Basket Total -
                 </h4>

                 <h4 class="basketTotal">
                   $${cartCost}.00
                  </h4>

            </div>
            <div class="basket">
            <h4 class="basketTitle">
              Total Tax -
            </h4>
            <h4 class="basketTotalTax">
              ${totalTax}
            </h4>
          </div>
    
          <div class="basket">
            <h4 class="basketTitle">
              Total -
            </h4>
            <h4 class="totalAfterTax">
              ${totalAfterTax}
            </h4>
          </div>
          </div>
    `;
  }
  tax();
  deleteLocalStorage();
  manageQuantity();
}
function tax() {
  let totalTax = document.querySelector(".basketTotalTax");
  let totalAfterTax = document.querySelector(".totalAfterTax");
  let cartTotal = localStorage.getItem("cartCost");
  cartTotal = parseInt(cartTotal);

  let calculatedTax = (cartTotal * 13) / 100;
  totalTax = "$" + calculatedTax;
  totalAfterTax = "$" + (cartTotal + calculatedTax);

  localStorage.setItem("totalTax", totalTax);
  localStorage.setItem("totalAfterTax", totalAfterTax);
}

function deleteLocalStorage() {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  let productNumber = localStorage.getItem("cartNumber");
  let cartCost = localStorage.getItem("cartCost");
  let trash = document.querySelectorAll(".product ion-icon");
  let totalTax = localStorage.getItem("totalTax");
  let totalAfterTax = localStorage.getItem("totalAfterTax");
  let productName;

  for (let i = 0; i < trash.length; i++) {
    trash[i].addEventListener("click", () => {
      productName = trash[i].parentElement.textContent
        .toLowerCase()
        .replace(/ /g, "")
        .trim();

      let cartTotal =
        cartCost - cartItems[productName].price * cartItems[productName].count;
      let newTax = (cartTotal * 13) / 100;
      let newTotal = cartTotal + newTax;

      localStorage.setItem(
        "cartNumber",
        productNumber - cartItems[productName].count
      );

      localStorage.setItem(
        "cartCost",
        cartCost - cartItems[productName].price * cartItems[productName].count
      );

      delete cartItems[productName];
      localStorage.setItem("productInCart", JSON.stringify(cartItems));

      localStorage.setItem("totalTax", newTax);
      localStorage.setItem("totalAfterTax", newTotal);

      displayCart();
      cartCount();
    });
  }
}

function manageQuantity() {
  let decreaseBtn = document.querySelectorAll(".decrease");
  let increaseBtn = document.querySelectorAll(".increase");
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  let currentQuantity = 0;
  let currentProduct = "";

  for (let i = 0; i < decreaseBtn.length; i++) {
    decreaseBtn[i].addEventListener("click", () => {
      currentQuantity = decreaseBtn[i].parentElement.querySelector("span")
        .textContent;

      currentProduct = decreaseBtn[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();

      if (cartItems[currentProduct].count > 1) {
        cartItems[currentProduct].count -= 1;
        cartNumber(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        tax();
        localStorage.setItem("productInCart", JSON.stringify(cartItems));
        displayCart();
      }
    });
  }

  for (let i = 0; i < increaseBtn.length; i++) {
    increaseBtn[i].addEventListener("click", () => {
      currentQuantity = increaseBtn[i].parentElement.querySelector("span")
        .textContent;

      currentProduct = increaseBtn[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLowerCase()
        .replace(/ /g, "")
        .trim();

      cartItems[currentProduct].count += 1;
      cartNumber(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      tax();
      localStorage.setItem("productInCart", JSON.stringify(cartItems));
      displayCart();
    });
  }
}

displayCart();
cartCount();
tax();

// -------------- animations ------------ //
