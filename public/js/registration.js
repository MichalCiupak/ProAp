const nameInput = document.querySelector("#names");
const surnameInput = document.querySelector("#surnamex");
const emailInput = document.querySelector("#emails");
const addressInput = document.querySelector("#adres");
const passwordInput = document.querySelector("#password");
const registerForm = document.querySelector("form");
const submitInput = document.querySelector(".submit_button");
const errorParagraph = document.querySelector(".error");
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

submitInput.addEventListener("submit", async function (e) {
  e.preventDefault();
});
submitInput.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const resp = await axios.post("/api/auth/register", {
      name: nameInput.value,
      surname: surnameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      address: addressInput.value,
    });
    const token = resp.data.token;
    localStorage.setItem("token", token);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    errorParagraph.style.display = "block";
  }
});
