const loginForm = document.querySelector("#login-formm");
const emailInput = document.querySelector('[name="username"]');
const passwordInput = document.querySelector('[name="password"]');
const errorParagraph = document.querySelector(".error");
const submitBtn = document.querySelector(".submit_buttonlog");
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (!passwordInput.value || !emailInput.value) {
    displayError("Please fill all fields!");
    return;
  }
  try {
    const resp = await axios.post("/api/auth/login", {
      email: emailInput.value,
      password: passwordInput.value,
    });
    const token = resp.data.token;
    console.log(token);
    localStorage.setItem("token", token);
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    displayError("User with provided credentials does not exist");
  }
});

function displayError(msg) {
  errorParagraph.innerHTML = `<i id = "error_exc" class ="fa fa-exclamation-triangle"></i>${
    " " + msg
  }`;
  errorParagraph.style.display = "block";
  errorParagraph.style.visibility = "visible";
}
