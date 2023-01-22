const { host, hostname, href, origin, pathname, port, protocol, search } =
  window.location;
const productID = pathname.slice("/singleProduct/".length);
const loadingText = document.querySelector(".loading-text");
const errorText = document.querySelector(".error-text");
const productWrapper = document.querySelector(".product-wrapper");

let currentUser = null;
let hasValidToken = true;
window.addEventListener("DOMContentLoaded", start);

async function start() {
  hideErrorText();
  try {
    const data = await axios.get(`/api/products/${productID}`);
    const product = data.data.product;
    productWrapper.innerHTML = `<article class="single-product-img-container">
    <img
      class="single-product-img"
      src=${product.img}
      alt=""
    />
  </article>
  <div class="product-info">
    <h2 class="product-title">${product.name}</h2>
    <h5 class="product-company">${product.category}</h5>
    <span class="product-price">$${product.price}</span>
    <p class="product-description">
    ${product.description}
    </p>
    <div class="btn-container">
    <button class="add-to-cart-btn" data-id=${product._id}>Add To Cart</button>
    <a href="/">
      <button class="btn">Go Back</button>
    </a>
  </div>  `;
    const addToCartBtn = document.querySelector(".add-to-cart-btn");
    addToCartBtn.addEventListener("click", async function () {
      await checkToken();
      if (hasValidToken && currentUser) {
        addProductToLocalStorage(this.dataset.id);
      } else {
        window.location.href = "/login";
      }
    });
  } catch (error) {
    displayErrorText();
    hideLoading();
  }
  hideLoading();
}

function addProductToLocalStorage(productID) {
  let cart_value = JSON.parse(localStorage.getItem("cart"));
  if (!cart_value.includes(productID)) {
    cart_value.push(productID);
    localStorage.setItem("cart", JSON.stringify(cart_value));
  }
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
      hasValidToken = false;
      currentUser = null;
      localStorage.clear();
    }
  }
}

function displayLoading() {
  loadingText.style.display = "block";
}

function hideLoading() {
  loadingText.style.display = "none";
}

function displayErrorText() {
  errorText.style.display = "block";
}

function hideErrorText() {
  errorText.style.display = "none";
}
