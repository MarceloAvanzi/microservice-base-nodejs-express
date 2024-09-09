import UserData from "../../domain/data/UserData";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import User from "../../domain/entities/User";
import jwt from 'jsonwebtoken';

export default class Register {
  constructor(readonly userData: UserData) { }

  async execute(name: string, email: string, password: string) {
    // check if user already exists
    const user = await this.userData.findOne(email);

    if (user) throw ({ message: "Email already in use" });
    // check password to exist and be at least 8 characters long


    // hash password to save in db
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData: User = {
      id: uuidv4(),
      name,
      email,
      email_verified_at: null,
      password: hashPassword,
      profile_image: '',
    };

    const newUser = await this.userData.create(userData);

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      "token",
      { expiresIn: "24h" });


    return {
      token_type: "Bearer",
      expires_in: "24h",
      access_token: token,
      refresh_token: token,
    };
  }

}