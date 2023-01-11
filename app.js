require("dotenv").config();
require("express-async-errors");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("request");
// const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();
// routers
const displayRouter = require("./routes/displayPageRoutes");
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const profileRouter = require("./routes/profileRoutes");
const emailRouter = require("./routes/emailRouter");
//middlewares
app.use(fileUpload({ useTempFiles: true }));
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authenticateUser = require("./middleware/authentication");
//utils
const connectDB = require("./utils/connectDB");

// mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
// const userSchema = new mongoose.Schema({
//     name: String,
//     surname: String,
//     adress:String,
//     email:String,
//     login:String,
//     password:String,
// })
// const secret = "Thisisourlittlesecret";
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });
// const User = new mongoose.model("User", userSchema);

// used middlewares in app
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use("/", displayRouter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", authenticateUser, profileRouter);
app.use("/api/confirmation", emailRouter);
// app.get("/login", function (req, res) {
//   res.sendFile(path.join(__dirname, "./public/HTML/login.html"));
// });
// app.get("/error404", function (req, res) {
//   res.sendFile(__dirname + "/HTML/error404.html");
// });
// app.get("/register", function (req, res) {
//   res.sendFile(__dirname + "/HTML/registration.html");
// });
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/HTML/index.html");
//   // res.redirect("/");
// });
// app.post("/register", function (req, res) {
//   const newUser = new User({
//     name: req.body.name,
//     surname: req.body.surname,
//     adress: req.body.adress,
//     email: req.body.email,
//     login: req.body.login,
//     password: req.body.password,
//   });
//   newUser.save(function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(req.body.login);
//       res.redirect("/");
//     }
//   });
// });
// app.post("/login", function (req, res) {
//   const username = req.body.username;
//   const password = req.body.password;
//   User.findOne(
//     { $or: [{ email: username }, { login: username }] },
//     function (err, foundUser) {
//       console.log(password);
//       console.log(foundUser.password);
//       if (err) {
//         console.log(err);
//       }
//       if (foundUser) {
//         if (foundUser.password === password) {
//           res.redirect("/");
//         } else {
//           console.log("Nie dzia");
//           res.send("User not found");
//         }
//       }
//     }
//   );
// });

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// app.get("/validate.js",function(req,res)
// {
//     res.sendFile(path.join(__dirname+"/HTML/validate.js"));
// })

// start server
const port = process.env.PORT || 2000;
app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`Listening on port ${port}...`);
  } catch (error) {
    console.log(error);
  }
});
