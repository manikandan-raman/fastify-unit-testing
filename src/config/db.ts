import { DataSource } from "typeorm";
import { Users } from "../entities/user.entity";

export function initializeConnection(): DataSource {
  let dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5555,
    username: "postgres",
    password: "postgres",
    database: "bake_db",
    synchronize: true,
    entities: [Users],
  });
  return dataSource;
}
