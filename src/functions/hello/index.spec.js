const { handler } = require("./index");

describe("handler", () => {
  it("should run proper result", async () => {
    const res = await handler({}, {});
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.user).toBeDefined();
    expect(body.tomorrow).toBeDefined();
    expect(body.data).toEqual("test data");
  });
});
