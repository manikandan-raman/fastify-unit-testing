import { DataSource } from "typeorm";

declare module "fastify" {
  interface FastifyRequest {
    db: DataSource;
  }
}
