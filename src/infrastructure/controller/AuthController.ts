import { Application, Request, Response, Router } from "express";
import Login from "../../application/auth/Login";
import { forgotPasswordSchema, loginSchema, passwordResetSchema, registerSchema } from "../../application/auth/schemaValidation";
import Register from "../../application/auth/Register";
import PasswordReset from "../../application/auth/PasswordReset";
import ForgotPassword from "../../application/auth/ForgotPassword";

export default class AuthController {
  private router: Router;

  constructor(readonly app: Application, readonly login: Login, readonly register: Register, readonly forgotPassword: ForgotPassword, readonly passwordReset: PasswordReset) {
    this.router = Router();
    this.AuthRoutes();
    app.use('/auth', this.router);
  }

  private AuthRoutes() {
    this.router.post('/login', async (req: Request, res: Response) => {
      try {
        loginSchema.parse(req.body);
        const { email, password } = req.body.data.attributes;
        const data = await this.login.execute(email, password)

        res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
    })
    this.router.post('/logout', async (req: Request, res: Response) => {
      try {
        res.sendStatus(200)
      } catch (error) {
        res.status(400).send(error);
      }
    })
    this.router.post('/register', async (req: Request, res: Response) => {
      try {
        registerSchema.parse(req.body);
        const { name, email, password } = req.body.data.attributes;
        const data = await this.register.execute(name, email, password);

        res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
    })
    this.router.post('/password-forgot', async (req: Request, res: Response) => {
      try {
        forgotPasswordSchema.parse(req.body);
        const { email } = req.body.data.attributes;
        const data = await this.forgotPassword.execute(email);

        res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
    })
    this.router.post('/password-reset', async (req: Request, res: Response) => {
      try {
        passwordResetSchema.parse(req.body);
        const { email, token, password } = req.body.data.attributes;

        const data = await this.passwordReset.execute(email, token, password)
        res.status(204).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
    })
  }
} 