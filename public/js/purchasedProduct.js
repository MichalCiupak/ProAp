const purchasedProductsContainer = document.querySelector(
  ".purchased-products-container"
);

async function start() {
  const boughtProducts = await fetchBoughtProducts();
  displayProducts(boughtProducts, purchasedProductsContainer);
}

async function fetchBoughtProducts() {
  const userLoggedIn = await checkAuthorizationAndDisplay();
  if (!userLoggedIn) {
    return;
  }
  try {
    const resp = await axios.get("/api/profile", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const boughtProducts = resp.data.boughtProducts;
    let foundProducts = await Promise.all(
      boughtProducts.map(async (productID) => {
        try {
          const resp = await axios.get(`/api/products/${productID}`);
          const product = resp.data.product;
          return product;
        } catch (error) {}
      })
    );
    return foundProducts.filter((product) => {
      return product;
    });
  } catch (error) {}
}

function displayProducts(products, container) {
  container.innerHTML = products
    .map((product) => {
      return `<article class="product">
    <img src=${product.img} class="cart-product-img" alt="product img" />
    <div class="cart-text-container">
      <a href="/singleProduct/${product._id}">
        <h3 class="product-title">${product.name}</h3>
      </a>
      
    </div>
  </article>`;
    })
    .join("");
}

start();
