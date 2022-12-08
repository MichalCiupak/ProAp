const nameInput = document.querySelector("#names");
const surnameInput = document.querySelector("#surnamex");
const emailInput = document.querySelector("#emails");
const addressInput = document.querySelector("#adres");
const passwordInput = document.querySelector("#password");
const registerForm = document.querySelector("#register-form");
const submitInput = document.querySelector("#submit_button");

// DOES NOT WORK
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(2);
});

//WORKS
submitInput.addEventListener("submit", async function (e) {
  e.preventDefault();
  console.log(1);
  try {
    const resp = await axios.post("/api/auth/register", {
      name: nameInput.value,
      surname: surnameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      address: addressInput.value,
    });
    const token = resp.data.token;
    console.log(token);
    localStorage.setItem("token", token);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    console.log(`Cannot create user `);
  }
});
