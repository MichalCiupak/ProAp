var pass = document.getElementById("password");
var log = document.getElementById("login");
var em = document.getElementById("emails");
var adr = document.getElementById("adres");
var surname = document.getElementById("surnamex");
var namex = document.getElementById("names");
var pinfo1  = document.getElementById("pinfo1");
var pinfo2 = document.getElementById("pinfo2");
var pinfo3 = document.getElementById("pinfo3");
var dict = {};
var submitButton = document.getElementsByClassName("submit_button");
var check_dict = {}
submitButton[0].classList.add("gray_color");
function show_green_check(dom_green,dom_red)
{
    dom_green.style.opacity = 1;
    dom_red.style.opacity = 0;
}
function show_red_check(dom_green,dom_red)
{
    dom_red.style.opacity = 1;
    dom_green.style.opacity = 0;
}
function containsChars(word, list_of_all_words) {
    return list_of_all_words.test(word);
}
function check_enabling()
{
if(Object.values(check_dict).filter(x=>x==true).length === 6)
{
    submitButton[0].classList.remove("gray_color");
    submitButton[0].classList.add("sbtx");
    submitButton[0].classList.add("bgcolor");
    console.log(submitButton);
    submitButton[0].disabled = false;
}
else
{
    submitButton[0].classList.add("gray_color");
    submitButton[0].classList.remove("sbtx");
    submitButton[0].classList.remove("sbtx");
    submitButton[0].classList.remove("bgcolor");
    // console.log(submitButton[0].style.backgroundColor);
    submitButton[0].disabled = true    ;
}
}
pass.addEventListener('input', ()=>
{
    if(pass.value.length != 0)
    {
        pinfo1.style.display = "block";
        pinfo2.style.display = "block";
        pinfo3.style.display = "block";
    }
    else{
        pinfo1.style.display = "none";
        pinfo2.style.display = "none";
        pinfo3.style.display = "none";
    }
    if (containsChars(pass.value, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/ ))
    {
        pinfo2.style.display = "none";
        dict.specChars = true;
    }
    else
    {
        dict.specChars = false;
    }
    if (containsChars(pass.value, /\d/))
    {
        pinfo3.style.display = "none";
        dict.digits = true;
    }
    else
    {
        dict.digits = false;
    }
    if(pass.value.length>=8)
    {
        pinfo1.style.display = "none";
        dict.length = true;
    }
    else
    {
        dict.length = false;
    }
    if(Object.values(dict).filter(x=>x==true).length === Object.values(dict).length)
    {
        show_green_check(document.getElementById("ppicon"),document.getElementById("wpxicon"))
        check_dict.password = true;
        check_enabling()
    }
    else
    {
        show_red_check(document.getElementById("ppicon"),document.getElementById("wpxicon"))
        check_dict.password = false;
        check_enabling()
    }

})
log.addEventListener('input', ()=>
{
if(log.value.length > 4)
{
    show_green_check(document.getElementById("plicon"),document.getElementById("wlicon"))
    check_dict.log = true;
    check_enabling()

}
else
{
    show_red_check(document.getElementById("plicon"),document.getElementById("wlicon"))
    check_dict.log = false;
    check_enabling()
}

})
em.addEventListener('input', ()=>
{
if(em.value.length > 0 && em.value.indexOf("@")>-1 && em.value.indexOf(".") >-1 )
{
    show_green_check(document.getElementById("peicon"),document.getElementById("weicon"))
    check_dict.em = true;
    check_enabling()

}
else
{
    show_red_check(document.getElementById("peicon"),document.getElementById("weicon"))
    check_dict.em = false;
    check_enabling()
}

})
adr.addEventListener('input', ()=>
{
if(adr.value.length > 0)
{
    show_green_check(document.getElementById("paicon"),document.getElementById("waicon"))
    check_dict.adr = true;
    check_enabling()
}
else
{
    show_red_check(document.getElementById("paicon"),document.getElementById("waicon"))
    check_dict.adr =false;
    check_enabling()
}

})
surname.addEventListener('input', ()=>
{
if(surname.value.length > 0)
{
    show_green_check(document.getElementById("psicon"),document.getElementById("wsicon"))
    check_dict.surname = true;
    check_enabling()
}
else
{
    show_red_check(document.getElementById("psicon"),document.getElementById("wsicon"))
    check_dict.surname = false;
    check_enabling()
}

})
namex.addEventListener('input', ()=>
{
if(namex.value.length > 0)
{
    show_green_check(document.getElementById("pnicon"),document.getElementById("wnicon"))
    check_dict.namex =true;
    check_enabling()

}
else
{
    show_red_check(document.getElementById("pnicon"),document.getElementById("wnicon"))
    check_dict.namex = false;
    check_enabling()
}

})