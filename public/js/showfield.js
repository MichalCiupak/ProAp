const currpage = window.location.href.split("/");
document.getElementById(
  currpage[currpage.length - 1].split(".")[0] + "x"
).style.backgroundColor = "#647C90";
document.getElementById(
  currpage[currpage.length - 1].split(".")[0] + "s"
).onmouseover = function () {
  this.style.fontWeight = "900";
  this.style.color = "white";
  this.removeAttribute("href");
};
