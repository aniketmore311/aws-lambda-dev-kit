const axios = require("axios").default;

async function getUsers() {
  const resp = await axios.get("https://jsonplaceholder.typicode.com/users");
  return resp.data;
}

module.exports = { getUsers };
