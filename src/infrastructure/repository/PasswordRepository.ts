import passwordResetData from "../../domain/data/passwordResetData";
import Connection from "../database/Connection";

export default class PasswordRepository implements passwordResetData {

  constructor(readonly dbConnection: Connection) { }

  async findOne(email: string, token: string): Promise<any> {
    const passwordData = await this.dbConnection.query('select * from eccommercedb.password_reset where email = $1 and token = $2', [email, token])
    return passwordData.length ? passwordData[0] : null
  }

  async create(email: string, token: string): Promise<void> {
    const passwordData = await this.dbConnection.query('insert into eccommercedb.password_reset (email, token) values ($1, $2)', [email, token])
    if (!passwordData) throw ({ message: 'Error creating reset password token' })
    return
  }
  async delete(email: string): Promise<any> {
    const passwordData = await this.dbConnection.query('delete from eccommercedb.password_reset where email = $1', [email])
    if (!passwordData) throw ({ message: 'Error deleting password token' })
    return
  }
}