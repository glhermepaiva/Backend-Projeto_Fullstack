import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "Flickenu_Usuarios"

  public async createUser(
    id: string, 
    username: string, 
    name: string, 
    email: string, 
    password: string, 
    role: string
    ): Promise<void> {
    try {
      await this.getConnection()
      .insert({
        id, username, name, email, password, role
      })
      .into(UserDatabase.TABLE_NAME)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async getUserByEmailorUsername(email: string, username: string): Promise<User> {
    const result = await this.getConnection()
    .raw(`
          SELECT * FROM ${UserDatabase.TABLE_NAME}
          WHERE EMAIL = "${email}" or USERNAME = "${username}"
    `)
    return User.toUserModel(result[0][0])
  }
}