import fastify, { FastifyInstance } from "fastify";
import { initializeConnection } from "./config/db";
import { DataSource } from "typeorm";
import { userRoute } from "./routes/user.route";

export async function startServer(): Promise<FastifyInstance> {
  const server: FastifyInstance = fastify({ logger: true });

  const db: DataSource = await initializeConnection();
  await db.initialize();
  server.get("/", (request, reply) => {
    reply.send({ msg: "success" });
  });

  server.decorateRequest("db", null);
  server.addHook("preHandler", async (request, reply) => {
    request.db = db;
  });

  server.register(userRoute);

  return server;
}
