var check = document.getElementById("toggle");
check.addEventListener("change", function()
{
    if(check.checked == true)
    {
        document.getElementById("toggleinfo").innerHTML = "Dark"
        document.body.classList.toggle("dark-ini")
    }
    else
    {
        document.getElementById("toggleinfo").innerHTML = "Light"
        document.body.classList.toggle("dark-ini")
    }
})