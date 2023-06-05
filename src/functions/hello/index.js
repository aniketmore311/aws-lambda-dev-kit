//@ts-check
const path = require("path");
const fs = require("fs");
const yup = require("yup");

/*
 * when layers are loaded by lamba they are loaded in /opt directory hence dynamic require functions must be used to load the files correctly
 * NODE_ENV environment variable is used to resolve the correct path of the common folder depending upon where the code is running on local machine or in lambda runtime
 * this is why NODE_ENV needs to be set to production while deploying the lambda function so that the path is resolved correctly in lambda runtime
 */
const COMMON_PATH =
  process.env.NODE_ENV == "production"
    ? "/opt/nodejs/common"
    : path.join(process.cwd(), "src", "common");

// example of how to require common files and get types for dynamic requires
/**@type {import('../../common/utils')} */
const utils = require(COMMON_PATH + "/utils.js");

// packages installed in node_modules can be imported directly in local as well as lamba environment
const createHttpError = require("http-errors");

// example of how to get type information for lambada parameters and return types
// this example shows a lambda being used for APIGateway proxying other types are available for different triggers
/**
 * @param {import("aws-lambda").APIGatewayProxyEvent} event
 * @param {import('aws-lambda').Context} context
 * @returns {Promise<import('aws-lambda').APIGatewayProxyResult>}
 *
 * @path /hello/:name
 * @requestMethod GET
 */
exports.handler = async (event, context) => {
  try {
    // input validation
    await utils.validate(
      yup.object({
        name: yup.string().required().min(3).max(5),
      }),
      event.pathParameters
    );
    //@ts-expect-error
    const name = event.pathParameters.name;

    return utils.formatJSONResponse({
      greeting: `hello! ${name}`,
      // to test file reading from lambda environment
      data: fs
        .readFileSync(path.join(__dirname, "data", "data.txt"))
        .toString(),
      event: event,
      context: context,
    });
  } catch (err) {
    utils.logError(err);
    return utils.formatErrorResponse(err);
  }
};
