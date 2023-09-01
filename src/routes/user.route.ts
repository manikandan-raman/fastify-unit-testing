import { FastifyInstance } from "fastify";
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/users.controller";

export const userRoute = async (fastify: FastifyInstance) => {
  fastify.post("/users", createNewUser);
  fastify.get("/users", getAllUsers);
  fastify.get("/users/:id", getUserById);
  fastify.put("/users/:id", updateUserById);
  fastify.delete("/users/:id", deleteUserById);
};
