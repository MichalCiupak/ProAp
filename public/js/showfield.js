const currpage = window.location.href.split("/");
document.getElementById(
  currpage[currpage.length - 1].split(".")[0] + "x"
).style.backgroundColor = "#00008B";
document.getElementById(
  currpage[currpage.length - 1].split(".")[0] + "s"
).onmouseover = function () {
  this.style.fontWeight = "400";
  this.style.color = "green";
  this.removeAttribute("href");
};
