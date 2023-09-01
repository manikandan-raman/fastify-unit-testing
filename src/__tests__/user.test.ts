import { FastifyInstance } from "fastify";
import { startServer } from "../server";

describe("users module", () => {
  let server!: FastifyInstance;
  let user_id: string | undefined;

  beforeAll(async () => {
    server = await startServer();
  });

  it("create new user", async () => {
    const rand = Math.floor(Math.random() * 10);
    const response = await server.inject({
      method: "POST",
      path: "/users",
      headers: {
        "content-type": "application/json",
      },
      payload: {
        username: "user_name " + rand,
        email: "email@test" + rand + ".com",
        phone: "t45e54",
        password: "admin@!23",
        address: "address",
      },
    });
    const data: GetUser = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(data).toMatchObject({ msg: "success" });
    expect(data.user).toHaveProperty("user_id");
  });

  it("get all users", async () => {
    const response = await server.inject({
      method: "GET",
      path: "/users",
      headers: {
        "content-type": "application/json",
      },
    });
    const data: GetAllUsers = JSON.parse(response.body);
    user_id = data.users[0].user_id;
    expect(response.statusCode).toBe(200);
    expect(data).toMatchObject({ msg: "success" });
    expect(data.users.length).toBeGreaterThanOrEqual(1);
  });

  it("get user by id", async () => {
    const response = await server.inject({
      method: "GET",
      path: `/users/${user_id}`,
      headers: {
        "content-type": "application/json",
      },
    });
    const data: GetUser = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(data).toMatchObject({ msg: "success" });
    expect(data.user).toHaveProperty("user_id");
  });

  it("update user by id", async () => {
    const rand = Math.floor(Math.random() * 10);
    const response = await server.inject({
      method: "PUT",
      path: `/users/${user_id}`,
      headers: {
        "content-type": "application/json",
      },
      payload: {
        username: "user_name " + rand,
        email: "email@test" + rand + ".com",
        phone: "t45e54",
        password: "admin@!23",
        address: "address",
      },
    });
    response.body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ msg: "success" });
  });

  it("delete user by id", async () => {
    const response = await server.inject({
      method: "DELETE",
      path: `/users/${user_id}`,
      headers: {
        "content-type": "application/json",
      },
    });
    response.body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ msg: "success" });
  });
});
