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
//middlewares
app.use(fileUpload({ useTempFiles: true }));
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const authenticateUser = require("./middleware/authentication");
//utils
const connectDB = require("./utils/connectDB");

// used middlewares in app
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use("/", displayRouter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", authenticateUser, profileRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
