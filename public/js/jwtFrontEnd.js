let currentUser = null;
let hasValidToken = true;
async function checkToken() {
  const tokenIsPresent = localStorage.getItem("token") ? true : false;
  if (tokenIsPresent) {
    try {
      const headers = {
        authorization: localStorage.getItem("token"),
      };
      const getUserData = await axios.get("/api/profile", { headers });
      currentUser = getUserData.data;
      hasValidToken = true;
      if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", "[]");
      }
      return true;
    } catch (error) {
      console.log(error);
      hasValidToken = false;
      currentUser = null;
      localStorage.clear();
      return false;
    }
  }
}
