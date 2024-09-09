export default class User {
  constructor(readonly id: string, readonly name: string, readonly email: string, readonly email_verified_at: Date | null, readonly password: string, readonly profile_image: string) { 
  }
}