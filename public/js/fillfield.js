var namex = document.getElementById("name");
var surname = document.getElementById("surname");
var address = document.getElementById("adres");
var email = document.getElementById("email");
var login = document.getElementById("login");
window.addEventListener("load", async (e) => {
  let data = await axios.get("/api/profile", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const UserData = await data.data;
  namex.innerHTML = UserData.name;
  surname.innerHTML = UserData.surname;
  address.innerHTML = UserData.balance;
  email.innerHTML = UserData.email;
  login.innerHTML = UserData.login;
});
