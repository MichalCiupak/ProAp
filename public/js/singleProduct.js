const { host, hostname, href, origin, pathname, port, protocol, search } =
  window.location;
const productID = pathname.slice("/singleProduct/".length);
console.log(pathname);
console.log(productID);
console.log(pathname.indexOf("/singleProduct/"));
const span = document.querySelector("span");

span.innerHTML = productID;

const productTitle = document.querySelector(".product-title");
const productCompeny = document.querySelector(".product-company");
const productPrice = document.querySelector(".product-price");
const productDesc = document.querySelector(".product-description");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const productImg = document.querySelector(".single-product-img");
const loadingText = document.querySelector(".loading-text");
const errorText = document.querySelector(".error-text");
const productWrapper = document.querySelector(".product-wrapper");

console.log(2);

window.addEventListener("DOMContentLoaded", start);

async function start() {
  hideErrorText();
  try {
    const data = await axios.get(`/api/products/${productID}`);
    const product = data.data.product;
    console.log(product);
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
    
    <button class="add-to-cart-btn">Add To Cart</button>
  `;
  } catch (error) {
    displayErrorText();
  }

  hideLoading();
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
