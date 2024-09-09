import passwordResetData from "../../domain/data/passwordResetData";
import UserData from "../../domain/data/UserData";
import bcrypt from 'bcrypt';

export default class PasswordReset {
  constructor(readonly userData: UserData, readonly passwordReset: passwordResetData) { }

  async execute(email: string, token: string, password: string) {
    const user = await this.userData.findOne(email);
    if (!user) throw ({ message: "The email or token don't match any existing users" });

    const validToken = await this.passwordReset.findOne(email, token)
    if (!validToken) throw ({ message: "Invalid or expired token" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) throw ({ message: "New password needs to be different from the current password" })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await this.passwordReset.delete(email)

    await this.userData.updatePassword(user.email, hashPassword);

    return "Password successfully changed"
  }
}