import User from "../entities/User"

export default interface UserData {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  findOne(email: string): Promise<User>;
  updatePassword(email: string, password: string): Promise<void>;
};