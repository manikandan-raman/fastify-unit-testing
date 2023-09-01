interface User {
  user_id?: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  created_at?: Date;
  updated_at?: Date;
}

interface CreateUser
  extends Omit<User, ["user_id", "created_at", "updated_at"]> {}

interface UserId {
  id: string;
}

interface UpdateUser extends Partial<User> {}

interface GetAllUsers extends ApiResponse {
  users: User[];
}

interface GetUser extends ApiResponse {
  user: User;
}
