import passwordResetData from "../../domain/data/passwordResetData";
import UserData from "../../domain/data/UserData";
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

export default class ForgotPassword {
  constructor(readonly userData: UserData, readonly passwordReset: passwordResetData) {

  }

  async execute(email: string) {
    const user = await this.userData.findOne(email);
    if (!user) throw ({ message: "The email does not match any existing user" });

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      }
    });

    const token = uuidv4();

    await transport.sendMail({
      from: "admin@jsonapi.com",
      to: user.email,
      subject: "Reset Password",
      html: `<p>You requested to change your password.If this request was not made by you please contact us. Access <a href='${process.env.APP_URL_CLIENT}/auth/reset-password?token=${token}&email=${user.email}'>this link</a> to reset your password </p>`,
    });

    const dataSent = {
      data: "password-forgot",
      attributes: {
        redirect_url: `${process.env.APP_URL_API}/password-reset`,
        email: email,
      },
    };

    await this.passwordReset.create(user.email, token);

    return dataSent;
  }
}