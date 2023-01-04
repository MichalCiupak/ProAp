const newProductForm = document.querySelector("#new-product-form");
const priceElement = document.querySelector("#price");
const productImage = document.querySelector("#productImage");
const errorMsgElement = document.querySelector(".error-msg");
const nameElement = document.querySelector("#name");
console.log(newProductForm);

newProductForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userIsLoggedIn = await checkAuthorizationAndDisplay();
  if (!userIsLoggedIn) {
    return;
  }
  console.log(productImage.value);
  if (!productImage.value) {
    alert("Please select image before adding new Product!");
    return;
  }
  const formData = new FormData(newProductForm);

  //   for (const item of formData) {
  //     console.log(item[0], item[1]);
  //   }

  try {
    const resp = await axios.post("/api/products", formData, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    alert("Successfully Added New Product!");
    location.reload();
    console.log(resp);
  } catch (error) {
    let errorMsg = error.response.data.msg;
    console.log("-----------");
    if (priceElement.value === "0" || Number(priceElement.value) < 0) {
      errorMsg = "Price for the product should be > 0";
    } else if (!nameElement.value) {
      errorMsg = "Please provide product name!";
    }
    alert(errorMsg);
    // await showAlert(errorMsgElement, error.response.data.msg, 3000);
    // errorMsgElement.innerHTML = error.response.data.msg;

    console.log(error.response.data.msg);
    console.log("-----------");
  }

  console.log(111);
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

  console.log(currentUser);
}

start();
