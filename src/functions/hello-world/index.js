//@ts-check
const path = require("path");
const fs = require("fs");

// example of how to load location of folders from layers depending upon local or production(lambda) runtime
// node_modules are automatically loaded in PATH so no need to do this packages can be directly loaded
const COMMON_PATH =
  process.env.NODE_ENV == "production"
    ? "/opt/nodejs/common"
    : path.join(process.cwd(), "src", "common");
const utils = require(COMMON_PATH + "/utils.js");

const { addDays } = require("date-fns");

exports.handler = async (event, context) => {
  const today = new Date();
  const tomorrow = addDays(today, 1);

  const users = await utils.getUsers();
  const user = users[0];

  return {
    statusCode: 200,
    body: JSON.stringify({
      user,
      tomorrow: tomorrow.toISOString(),
      data: fs
        .readFileSync(path.join(__dirname, "data", "data.txt"))
        .toString(),
    }),
  };
};
