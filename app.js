require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    adress:String,
    email:String,
    login:String,
    password:String,

})
const secret ="Thisisourlittlesecret"
userSchema.plugin(encrypt, {secret:secret, encryptedFields:["password"]})
const User = new mongoose.model("User", userSchema);

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/login", function(req,res)
{
    res.sendFile(__dirname+"/HTML/login.html");
})
app.get("/error404", function(req,res)
{
    res.sendFile(__dirname+"/HTML/error404.html");
})
app.get("/register", function(req,res)
{
    res.sendFile(__dirname+"/HTML/registration.html");
})
app.get("/", function(req,res)
{
    res.sendFile(__dirname +"/HTML/index.html" );
    // res.redirect("/");
})
app.post("/register", function (req,res)
{
    const newUser = new User({
        name : req.body.name,
        surname: req.body.surname,
        adress:req.body.adress,
        email:req.body.email,
        login:req.body.login,
        password:req.body.password,
    })
    newUser.save(function(err)
    {if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(req.body.login);
        res.redirect("/");
    }
    })
})
app.post("/login", function(req,res)
{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({$or :[{email:username},{login:username}]}, function(err, foundUser)
    {
        console.log(password)
        console.log(foundUser.password)
        if (err)
        {
            console.log(err);
        }
        if(foundUser)
        {
            if (foundUser.password === password)
            {
                res.redirect("/");
            }
            else
            {
                console.log("Nie dzia")
                res.send("User not found")
            }
        }

    })
})
// app.get("/validate.js",function(req,res)
// {
//     res.sendFile(path.join(__dirname+"/HTML/validate.js"));
// })

app.listen(3000,function()
{
    console.log("Server is running on port 3000");
})