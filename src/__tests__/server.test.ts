import { initializeConnection } from "../config/db";
import { startServer } from "../server";

describe("sample test", () => {
  // beforeAll(async () => {
  //   // await db.initialize();
  // });

  afterAll(async () => {
    if (initializeConnection().isInitialized) {
      await initializeConnection().destroy();
    }
  });

  it("server health check", async () => {
    const server = await startServer();
    const response = await server.inject({
      method: "GET",
      path: "/",
      headers: {
        "content-type": "application/json",
      },
    });
    response.body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ msg: "success" });
  });
});
