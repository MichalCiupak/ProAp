var namex = document.getElementById("name");
var surname = document.getElementById("surname");
var address = document.getElementById("adres");
var email = document.getElementById("email");
var login = document.getElementById("login");

window.addEventListener("load", ()=>
{
    const token = localStorage.getItem("token");
    data = JSON.parse(token);
    namex.innerHTML = data["name"];
    surname.innerHTML = data["surname"];
    address.innerHTML = data["address"];
    email.innerHTML = data["email"];
    login.innerHTML = data["login"];


})