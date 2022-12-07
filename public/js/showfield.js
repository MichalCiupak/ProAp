// document.getElementById("fff").innerHTML = ((window.location.href).split("/"))[((window.location.href).split("/")).length -1]+"x"

document.getElementById(((window.location.href).split("/"))[((window.location.href).split("/")).length -1]+"x").style.backgroundColor = "#00008B";
document.getElementById(((window.location.href).split("/"))[((window.location.href).split("/")).length -1]+"s").onmouseover = function()
{
    this.style.fontWeight = "400";
    this.style.color ="green";
    this.removeAttribute("href");
}