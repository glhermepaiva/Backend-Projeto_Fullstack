import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "Flickenu_Usuarios"

  public async createUser(id: string, username: string, name: string, email: string, password: string, role: string): Promise<void> {
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
}