var namex = document.getElementById("name");
var surname = document.getElementById("surname");
var address = document.getElementById("adres");
var email = document.getElementById("email");
var login = document.getElementById("login");
console.log(email);
window.addEventListener("load", async (e) => {
  let data = await axios.get("/api/profile", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  //   console.log(data.data);
  const UserData = await data.data;
  console.log(UserData);
  namex.innerHTML = UserData.name;
  surname.innerHTML = UserData.surname;
  address.innerHTML = UserData.address;
  email.innerHTML = UserData.email;
  login.innerHTML = UserData.login;
});
