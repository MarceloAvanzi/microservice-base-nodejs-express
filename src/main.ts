import 'dotenv/config'
import DatabaseConnection from './infrastructure/database/DatabaseConnection';
import ExpressHttpServer from './infrastructure/http/ExpressHttpServer';
import AuthController from './infrastructure/controller/AuthController';
import Login from './application/auth/Login';
import UserRepository from './infrastructure/repository/UserRepository';
import Register from './application/auth/Register';
import PasswordReset from './application/auth/PasswordReset';
import PasswordRepository from './infrastructure/repository/PasswordRepository';
import ForgotPassword from './application/auth/ForgotPassword';

const port = Number(process.env.PORT) || 8000;

async function main() {
  const dbConnection = new DatabaseConnection();
  const server = new ExpressHttpServer();
  const userData = new UserRepository(dbConnection);
  const passwordResetData = new PasswordRepository(dbConnection);
  const login = new Login(userData);
  const register = new Register(userData);
  const forgotPassword = new ForgotPassword(userData, passwordResetData)
  const passwordReset = new PasswordReset(userData, passwordResetData);
  new AuthController(server.app, login, register, forgotPassword, passwordReset,)
  server.listen(port);
}

main()
