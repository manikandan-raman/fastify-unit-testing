import { FastifyReply, FastifyRequest } from "fastify";
import { Users } from "../entities/user.entity";
import bcrypt from "bcrypt";

export const createNewUser = async (
  request: FastifyRequest<{ Body: CreateUser }>,
  reply: FastifyReply
) => {
  const userRepository = request.db.getRepository(Users);
  const { username, email, phone, address } = request.body;
  let { password } = request.body as CreateUser;
  password = await bcrypt.hash(password, 10);
  try {
    let user = await userRepository.create({
      username: username,
      email: email,
      phone: phone,
      password: password,
      address: address,
    });
    user = await user.save();
    return reply.code(201).send({ msg: "success", user });
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userRepository = request.db.getRepository(Users);
  const users = await userRepository.find();
  return reply.send({ msg: "success", users });
};

export const getUserById = async (
  request: FastifyRequest<{ Params: UserId }>,
  reply: FastifyReply
) => {
  const userRepository = request.db.getRepository(Users);
  const user = await userRepository.findOne({
    where: { user_id: request.params.id },
  });
  return reply.send({ msg: "success", user });
};

export const updateUserById = async (
  request: FastifyRequest<{ Params: UserId; Body: UpdateUser }>,
  reply: FastifyReply
) => {
  const userRepository = request.db.getRepository(Users);
  let user = await userRepository.findOne({
    where: { user_id: request.params.id },
  });
  if (!user) {
    throw new Error("user not found");
  }
  const { username, email, phone, address } = request.body;
  const update = await userRepository.update(
    { user_id: request.params.id },
    { username, email, phone, address }
  );
  if (update.affected) {
    return reply.send({ msg: "success", user });
  }
  reply.send({ msg: "failure" });
};

export const deleteUserById = async (
  request: FastifyRequest<{ Params: UserId }>,
  reply: FastifyReply
) => {
  const userRepository = request.db.getRepository(Users);
  const user = await userRepository.delete({ user_id: request.params.id });

  if (user.affected) {
    return reply.send({ msg: "success", user });
  }
  reply.send({ msg: "failure" });
};
