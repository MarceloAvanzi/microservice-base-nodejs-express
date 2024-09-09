import UserData from "../../domain/data/UserData";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class Login {
  constructor(readonly userData: UserData) { }

  async execute(email: string, password: string) {
    //Check If User Exists
    const user = await this.userData.findOne(email);
    if (!user) throw ({ message: "Credentials don't match any existing users" });

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw ({ message: "Invalid password" })

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret", // Use environment variable for security
      { expiresIn: "30m" }
    );

    return {
      token_type: "Bearer",
      expires_in: "30m",
      access_token: token,
      refresh_token: token, // Ideally, generate a different refresh token
    };

  }
}