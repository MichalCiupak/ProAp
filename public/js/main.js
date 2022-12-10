const mainContainer = document.querySelector(".main-container");
const categoryBtns = document.querySelectorAll(".category_type");
const loginBtn = document.querySelector(".login_button");
let logOutBtn = null;
let currentUser = null;
let hasValidToken = true;
categoryBtns.forEach((categoryBtn) => {
  categoryBtn.addEventListener("click", async function (e) {
    displayLoading();
    const category = this.dataset.category;
    let url = `/api/products?`;
    if (category !== "All") {
      url += `category=${category}`;
    }
    const products = await fetchProducts(url);
    if (products.length === 0) {
      displayNotProductsFound();
    } else {
      displayProducts(products);
    }
  });
});

async function fetchProducts(url = "/api/products") {
  let response = await axios.get(url);
  products = response.data.products;
  return products;
}

async function displayProducts(products) {
  const productsContainerDOM = products
    .map((product) => {
      let productDescriptionDOM = `<p class="product-description">${
        product.description.length < 20
          ? product.description.slice(0, 20)
          : product.description.slice(0, 20) +
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
        <button class="add-to-cart-btn">Add To Cart</button>
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
    console.log(currentUser);
    loginBtn.innerHTML = `<p>Hello,<a href="/HTML/settings.html"> ${currentUser.name}</a>
    <button class="log-out-btn btn">Log Out</button>
    </p>`;
    logOutBtn = loginBtn.querySelector(".log-out-btn");
    logOutBtn.addEventListener("click", logOut);
  } else {
    loginBtn.innerHTML = `<a href="/login">
    <button class="btn" type="sumbit" name="button">Log in</button>
  </a>`;
    logOutBtn = null;
  }
  displayLoading();
  const products = await fetchProducts();
  displayProducts(products);
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
    } catch (error) {
      console.log(error);
      hasValidToken = false;
      currentUser = null;
    }
  }
}
function displayLoading() {
  mainContainer.innerHTML = ` <section class="loading-gif-container">
  <p>Fetching Products. Please wait...</p>
</section>`;
}
function displayNotProductsFound() {
  mainContainer.innerHTML = ` <section class="loading-gif-container">
  <p>No products matches with your search</p>
</section>`;
}

async function logOut() {
  localStorage.clear();
  window.location.reload();
}

start();
