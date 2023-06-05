const { handler } = require("../../../src/functions/hello/index");

describe("handler", () => {
  it("should run proper result", async () => {
    const res = await handler(
      {
        pathParameters: {
          name: "ani",
        },
      },
      {}
    );
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.event).toBeDefined();
    expect(body.context).toBeDefined();
    expect(body.data).toEqual("test data");
  });
});
