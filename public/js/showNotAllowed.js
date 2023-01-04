const body = document.querySelector("body");
async function checkAuthorizationAndDisplay() {
  let isLogedIn = await checkToken();

  if (!isLogedIn) {
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
