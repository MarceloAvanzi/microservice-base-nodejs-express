import UserData from "../../domain/data/UserData";
import User from "../../domain/entities/User";
import Connection from "../database/Connection";

export default class UserRepository implements UserData {

  constructor(readonly dbConnection: Connection) { }

  async update(user: User): Promise<User> {
    const userData = await this.dbConnection.query(
      'update eccommercedb.user set name = $1, email = $2, email_verified_at = $3, password = $4, profile_image = $5 where id = $7',
      [user.name, user.email, user.email_verified_at, user.password, user.profile_image, user.id]);
    return userData;
  }

  async create(user: User): Promise<User> {
    const userData = await this.dbConnection.query('insert into eccommercedb.user (name, email, password) values ($1, $2, $3)', [user.name, user.email, user.password]);
    if (!userData) throw ({ message: 'Error creating user' })
    return new User(user.id, user.name, user.email, user.email_verified_at, user.password, user.profile_image);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.dbConnection.query('select * from eccommercedb.user where email = $1', [email]);
    return user.length ? user[0] : null;
  }

  async updatePassword(email: string, password: string): Promise<void> {
    const userData = await this.dbConnection.query(
      'update eccommercedb.user set password = $1 where email = $2',
      [password, email]);
    if (!userData) throw ({ message: 'Error updating user' })
    return;
  }
}