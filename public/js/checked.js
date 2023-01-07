var check = document.getElementById("toggle");
check.addEventListener("change", function()
{
    if(check.checked == true)
    {
        document.getElementById("toggleinfo").innerHTML = "Dark"
    }
    else
    {
        document.getElementById("toggleinfo").innerHTML = "Light"  
    }
})