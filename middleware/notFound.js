const path = require("path");

const notFoundPath = path.join(__dirname, "../public/HTML/error404.html");
const notFound = (req, res) => {
  return res.status(404).sendFile(path.join(notFoundPath));
};

module.exports = notFound;
