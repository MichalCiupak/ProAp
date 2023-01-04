const addBalanceForm = document.querySelector("#add-balance-form");
const addToBalanceInput = document.querySelector("#additionalBalance");
const addToBalanceBtn = document.querySelector(".add-to-balance-btn");
addToBalanceBtn.addEventListener("click", async function (e) {
  const userIsLoggedIn = await checkAuthorizationAndDisplay();
  if (!userIsLoggedIn) {
    return;
  }
  e.preventDefault();
  let providedAmount = addToBalanceInput.value;
  if (providedAmount === "") {
    alert("Please provide data!");
    return;
  }
  providedAmount = Number(providedAmount);
  console.log(providedAmount);
  if (providedAmount <= 0) {
    alert("Please provide number bigger than 0!");
    return;
  }
  try {
    const resp = await axios.patch(
      `/api/profile/addBalance/${providedAmount}`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    alert("the account was successfully replenished!");
    location.reload();
  } catch (error) {}
});
