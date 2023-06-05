//@ts-check
const path = require("path");
const fs = require("fs");

/*
 * when layers are loaded by lamba they are loaded in /opt directory hence dynamic require functions must be used to load the files correctly
 * NODE_ENV environment variable is used to resolve the correct path of the common folder depending upon where the code is running on local machine or in lambda runtime
 * this is why NODE_ENV needs to be set to production while deploying the lambda function
 */
const COMMON_PATH =
  process.env.NODE_ENV == "production"
    ? "/opt/nodejs/common"
    : path.join(process.cwd(), "src", "common");

// example of how to get types for dynamic requires
/**@type {import('../../common/utils')} */
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
