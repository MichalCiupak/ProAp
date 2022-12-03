// TODO
const path = require("path");

// make this works somehow
const notFoundPath = path.join(__dirname, "../public/HTML/error404.html");
const notFound = (req, res) => {
  console.log("this is from notFound middleware");
  return res.status(404).sendFile(path.join(notFoundPath));
};

module.exports = notFound;
