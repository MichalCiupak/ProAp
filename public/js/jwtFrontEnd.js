const body = document.querySelector("body");
let currentUser = null;
let hasValidToken = true;
async function checkToken() {
  const tokenIsPresent = localStorage.getItem("token") ? true : false;
  if (tokenIsPresent) {
    try {
      const headers = {
        authorization: localStorage.getItem("token"),
      };
      const getUserData = await axios.get("/api/profile", { headers });
      currentUser = getUserData.data;
      hasValidToken = true;
      if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", "[]");
      }
    } catch (error) {
      console.log(error);
      hasValidToken = false;
      currentUser = null;
      return false;
    }
    return true;
  }
}
async function checkAuthorizationAndDisplay() {
  let isLogedIn = await checkToken();
  console.log(isLogedIn);
  if (!isLogedIn) {
    console.log(11111111122222222222);

    body.innerHTML = `<div id="error_container">
    <label class="number_404">403</label><br />
    <label class="number_404" style="font-size: 35px">Forbidden</label>
    <br /><br />
    <label style="color: rgb(38, 29, 41)"
      >Sorry, you don't have access to this page. Please <a href=/login>log in. </a></label>
    <br /><br />
  </div>`;
    return false;
  }
  return true;
}

checkAuthorizationAndDisplay();
