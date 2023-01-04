const cartContainer = document.querySelector(".cart-container");

async function start() {
  const cart = await JSON.parse(localStorage.getItem("cart"));
  const products = await fetchProducts(cart);
  displayProducts(products, cartContainer);
  console.log(products);
}

async function fetchProducts(cart) {
  let foundProducts = await Promise.all(
    cart.map(async (productID) => {
      try {
        const resp = await axios.get(`/api/products/${productID}`);
        const product = resp.data.product;
        return product;
      } catch (error) {}
    })
  );
  // clean undefined objects from array
  return foundProducts.filter((product) => {
    return product;
  });
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
      <button class="remove-from-cart-btn" data-id=${product._id}>Remove</ tton>
    </div>
  </article>`;
    })
    .join("");
  const removeFromCartBtns = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartBtns.forEach((removeFromCartBtn) => {
    removeFromCartBtn.addEventListener("click", function (e) {
      const productID = this.dataset.id;
      console.log(productID);
      let cart = JSON.parse(localStorage.getItem("cart"));
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart.filter((currentID) => {
            return currentID !== productID;
          })
        )
      );
      document.location.reload();
    });
  });
}

start();
