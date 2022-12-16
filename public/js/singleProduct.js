const { host, hostname, href, origin, pathname, port, protocol, search } =
  window.location;
const productID = pathname.slice("/singleProduct/".length);
console.log(pathname);
console.log(productID);
console.log(pathname.indexOf("/singleProduct/"));

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
    <div class="btn-container">
    <button class="add-to-cart-btn">Add To Cart</button>
    <a href="/">
      <button class="btn">Go Back</button>
    </a>
  </div>  `;
  } catch (error) {
    displayErrorText();
    hideLoading();
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
