console.log(1);
const { host, hostname, href, origin, pathname, port, protocol, search } =
  window.location;
// const product =
const productID = pathname.slice("/singleProduct/".length);
console.log(pathname);
console.log(productID);
console.log(pathname.indexOf("/singleProduct/"));
const span = document.querySelector("span");

span.innerHTML = productID;
