const mainContainer = document.querySelector(".main-container");
const categoryBtns = document.querySelectorAll(".category_type");
const loginBtn = document.querySelector(".login_button");
const browserBtn = document.querySelector(".browser_button");
const browserInput = document.querySelector(".browser_input");

let logOutBtn = null;
let currentUser = null;
let hasValidToken = true;

categoryBtns.forEach((categoryBtn) => {
  categoryBtn.addEventListener("click", async function (e) {
    displayLoading();
    const category = this.dataset.category;
    let url = `/api/products?available=true`;
    if (category !== "All") {
      url += `&category=${category}`;
    }
    const products = await fetchProducts(url);
    if (products.length === 0) {
      displayNotProductsFound();
    } else {
      displayProducts(products);
      const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
      addToCartBtns.forEach(async (addToCartBtn) => {
        addToCartBtn.addEventListener("click", async function () {
          checkToken();
          if (hasValidToken && currentUser) {
            addProductToLocalStorage(this.dataset.id);
          } else {
            window.location.href = "/login";
          }
        });
      });
    }
  });
});
browserBtn.addEventListener("click", async () => {
  const name = browserInput.value;
  name
    ? (products = await fetchProducts(
        `/api/products?available=true&name=${name}`
      ))
    : (products = await fetchProducts(`/api/products?available=true`));
  displayProducts(products);
  addToCartBtns();
});
async function fetchProducts(url = "/api/products?available=true") {
  let response = await axios.get(url);
  products = response.data.products;
  return products;
}

async function displayProducts(products) {
  const productsContainerDOM = products
    .map((product) => {
      let productDescriptionDOM = `<p class="product-description">${
        product.description.length < 35
          ? product.description.slice(0, 35)
          : product.description.slice(0, 35) +
            `<a href="/singleProduct/${product._id}"> ...</a>`
      }</p>`;
      return `<article class="product">
      <div class="card-img-wrapper">
    <a href="/singleProduct/${product._id}"><img src=${product.img} alt="product name" class="card-product-img"/> </a>
</div>
<div class="card-main">
    <div class="card-main-info">
        <a href="/singleProduct/${product._id}">
        <h4>${product.name}</h4></a>
        <p class="product-price">
            $${product.price}
        </p>
    </div>
    ${productDescriptionDOM}
    <div class="card-footer">
        <button class="add-to-cart-btn" data-id=${product._id}>Add To Cart</button>
    </div>
</div>
</article>`;
    })
    .join("");
  mainContainer.innerHTML = `<section class="products-container">${productsContainerDOM}</section>`;
}

async function start() {
  await checkToken();
  if (hasValidToken && currentUser) {
    loginBtn.innerHTML = `          <p class="message_for_logged">
    Hello,<a href="/HTML/settings.html">
      <span style="padding-right: 15px">${currentUser.name}</span></a
    >
    <button class="log-out-btn btn">Log Out</button>
  </p>`;
    logOutBtn = loginBtn.querySelector(".log-out-btn");
    logOutBtn.addEventListener("click", logOut);
  } else {
    loginBtn.innerHTML = `<a href="/login">
    <button class="btn" type="sumbit" name="button">Log In</button>
  </a>`;
    logOutBtn = null;
  }
  displayLoading();
  const products = await fetchProducts();
  displayProducts(products);
  addToCartBtns();
}

function addToCartBtns() {
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach(async (addToCartBtn) => {
    addToCartBtn.addEventListener("click", async function () {
      checkToken();
      if (hasValidToken && currentUser) {
        addProductToLocalStorage(this.dataset.id);
      } else {
        window.location.href = "/login";
      }
    });
  });
}

async function checkToken() {
  const tokenIsPresent = localStorage.getItem("token") ? true : false;
  if (tokenIsPresent) {
    try {
      const headers = {
        authorization: localStorage.getItem("token"),
      };
      const getUserData = await axios.get("/api/profile", { headers });
      currentUser = getUserData.data;
      hasValidToken = true;
      if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", "[]");
      }
    } catch (error) {
      console.log(error);
      hasValidToken = false;
      currentUser = null;
      localStorage.clear();
    }
  }
}
function displayLoading() {
  mainContainer.innerHTML = `<section class="loading-gif-container">
  <p>Fetching Products. Please wait...</p>
</section>`;
}
function displayNotProductsFound() {
  mainContainer.innerHTML = ` <section class="loading-gif-container">
  <p style="margin-top:60px;">No products matches with your search</p>
</section>`;
}

async function logOut() {
  localStorage.clear();
  window.location.reload();
}

function addProductToLocalStorage(productID) {
  let cart_value = JSON.parse(localStorage.getItem("cart"));
  if (!cart_value.includes(productID)) {
    cart_value.push(productID);
    localStorage.setItem("cart", JSON.stringify(cart_value));
  }
}

start();
