const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector('[name="username"]');
const passwordInput = document.querySelector('[name="password"]');
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
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
    console.log(1);
    // console.log(resp);
  }
});
