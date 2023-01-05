const cartContainer = document.querySelector(".cart-container");
const buyAllBtn = document.querySelector(".buy-btn");
async function start() {
  const cart = await JSON.parse(localStorage.getItem("cart"));
  const products = await fetchProducts(cart);
  displayProducts(products, cartContainer);
  console.log(products);
}
function getNotAvailableProducts(products) {
  return products.filter((product) => {
    console.log(product);
    return !product.available;
  });
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

buyAllBtn.addEventListener("click", async (e) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  let productsInCart = await fetchProducts(cart);

  let notAvailableProducts = getNotAvailableProducts(productsInCart);
  if (notAvailableProducts.length === 1) {
    alert(
      `Product ${notAvailableProducts[0].name} is not available! Please remove it from cart and try again`
    );
    return;
  } else if (notAvailableProducts.length > 1) {
    const notAvailableProductsNames = notAvailableProducts.map((product) => {
      return product.name;
    });
    alert(
      `Products: ${notAvailableProductsNames.join(
        ", "
      )} are not available! Please remove it from cart and try again`
    );
    return;
  }
  const thisUserProductsInCart = await thisUserProducts(productsInCart);
  console.log(thisUserProductsInCart);
  if (thisUserProductsInCart.length === 1) {
    alert(
      `Product: ${thisUserProductsInCart[0].name} is yours, you cannot buy it! Please remove it from cart and try again`
    );
    return;
  } else if (thisUserProductsInCart.length > 1) {
    const thisUserProductsNames = thisUserProductsInCart.map((product) => {
      return product.name;
    });
    alert(
      `Products: ${thisUserProductsNames.join(
        ", "
      )} are yours, you cannot buy it! Please remove it from cart and try again`
    );
    return;
  }
  const estimatedPrice = estimatePrice(productsInCart);
  let balance;
  try {
    const resp = await axios.get(`/api/profile`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    balance = resp.data.balance;
  } catch (error) {
    checkAuthorizationAndDisplay();
  }

  if (balance < estimatedPrice) {
    alert(
      `You don't have enought money on your balance! Products in cart cost ${estimatedPrice}$, but you have ${balance}$. Replenish your balance and try again`
    );
    return;
  }

  const productsIds = productsInCart.map((product) => {
    return product._id;
  });

  await Promise.all(
    cart.map(async (productID) => {
      try {
        const resp = await axios.get(`/api/products/${productID}`);
        const product = resp.data.product;
        return product;
      } catch (error) {}
    })
  );

  await Promise.all(
    productsIds.map(async (productID) => {
      let resp;
      try {
        resp = await axios.post(
          `/api/products/buy/${productID}`,
          {},
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
      } catch (error) {
        alert(resp.data.msg);
      }
      return 1;
    })
  );
  localStorage.setItem("cart", "[]");
  location.reload();
  alert(
    "Products were purchased successfully! You can see them in Purchased Products section"
  );
  console.log(productsInCart);
});

function estimatePrice(products) {
  const productPrices = products.map((product) => {
    return product.price;
  });
  const price = productPrices.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
  return price;
}

async function thisUserProducts(products) {
  const currentUser = await axios.get("/api/profile", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const thisUserID = currentUser.data.userID;
  const thisUserProductsInCart = products.filter((product) => {
    console.log(product.createdBy);
    return product.createdBy === thisUserID;
  });
  return thisUserProductsInCart;
}

start();
