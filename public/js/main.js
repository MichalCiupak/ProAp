const mainContainer = document.querySelector(".main-container");
const productsContainer = document.querySelector(".products-container");

async function fetchProducts() {
  let response = await axios.get("/api/products");
  products = response.data.products;
  console.log(products);
  return products;
}
async function displayProducts(products) {
  const productsContainerDOM = products
    .map((product) => {
      //   return `<article class="product">
      //     <div class="card-img-wrapper">
      //         <a href=/singleProduct/${product._id}><img src=${product.img} alt=product name class="card-product-img"/> </a>
      //     </div>
      //     <div class="card-main">
      //         <div class="card-main-info">
      //             <a href="singleProduct/${product._id}">
      //             <h4>${product.name}</h4></a>
      //             <p class="product-price">
      //                 $${product.price}
      //             </p>
      //         </div>
      //         <div class="card-footer">
      //             <button>Add To Cart</button>
      //         </div>
      //     </div>
      // </article>`;
      let productDescriptionDOM = `<p class="product-description">${
        product.description.length < 20
          ? product.description.slice(0, 20)
          : product.description.slice(0, 20) +
            `<a href="/singleProduct/${product._id}"> ...</a>`
      }</p>`;
      // if (product.description.length > 20) {
      //   productDescription;
      // }
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
  console.log(productsContainerDOM);
  productsContainer.innerHTML = productsContainerDOM;
}

async function start() {
  const products = await fetchProducts();
  displayProducts(products);
}

start();
const getAllProducts = console.log(mainContainer);
