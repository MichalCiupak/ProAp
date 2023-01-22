const newProductForm = document.querySelector("#new-product-form");
const priceElement = document.querySelector("#price");
const productImage = document.querySelector("#productImage");
const errorMsgElement = document.querySelector(".error-msg");
const nameElement = document.querySelector("#name");

newProductForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userIsLoggedIn = await checkAuthorizationAndDisplay();
  if (!userIsLoggedIn) {
    return;
  }
  if (!productImage.value) {
    alert("Please select image before adding new Product!");
    return;
  }
  const formData = new FormData(newProductForm);

  try {
    const resp = await axios.post("/api/products", formData, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    alert("Successfully Added New Product!");
    location.reload();
  } catch (error) {
    let errorMsg = error.response.data.msg;
    if (priceElement.value === "0" || Number(priceElement.value) < 0) {
      errorMsg = "Price for the product should be > 0";
    } else if (!nameElement.value) {
      errorMsg = "Please provide product name!";
    }
    alert(errorMsg);
  }
});

async function showAlert(element, msg, time) {
  element.display = "block";
  element.innerHTML = msg;
  await setTimeout(() => {
    element.display = "none";
  }, time);
}

async function start() {
  const isLogedIn = await checkToken();
}

start();
