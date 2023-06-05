//@ts-check

// example of how to get type information for lambada parameters and return types
// this example shows a lambda being used for APIGateway proxying other types are available for different triggers
/**
 * @param {import("aws-lambda").APIGatewayProxyEvent} event
 * @param {import('aws-lambda').Context} context
 * @returns {Promise<import('aws-lambda').APIGatewayProxyResult>}
 */
exports.handler = async (event, context) => {
  return {
    body: JSON.stringify({
      event,
      context,
    }),
    statusCode: 200,
  };
};
