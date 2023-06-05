//@ts-check
const createHttpError = require("http-errors");
const yup = require("yup");

/**
 * @param {any} obj
 * @param {number=} statusCode
 * @returns {import('aws-lambda').APIGatewayProxyResult}
 */
function formatJSONResponse(obj, statusCode) {
  return {
    statusCode: statusCode === undefined ? 200 : statusCode,
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

/**
 * @description helper to handle error in lambda api handler works with http-errors
 * @param {import("http-errors").HttpError} err
 * @returns {import('aws-lambda').APIGatewayProxyResult}
 */
function formatErrorResponse(err) {
  if (createHttpError.isHttpError(err)) {
    return {
      statusCode: err.statusCode,
      body: JSON.stringify({
        statusCode: err.statusCode,
        message: err.message,
      }),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: "Something went wrong",
      }),
    };
  }
}

/**
 * @description logs error
 * @param {Error} err
 */
function logError(err) {
  if (process.env.NODE_ENV !== "test") {
    console.error({
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
}

/**
 * @description validate a schema and throw an http-error which can be handled by the error handling utils
 * @param {import("yup").Schema} schema
 * @param {any} data
 */
async function validate(schema, data) {
  try {
    await schema.validate(data);
  } catch (err) {
    throw new createHttpError.BadRequest(err.errors[0]);
  }
}

module.exports = {
  formatErrorResponse,
  formatJSONResponse,
  logError,
  validate,
};
