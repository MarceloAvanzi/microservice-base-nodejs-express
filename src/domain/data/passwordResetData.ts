export default interface passwordResetData {
  create(email: string, token: string): Promise<void>
  delete(email: string): Promise<void>
  findOne(email: string, token: string): Promise<any>
}