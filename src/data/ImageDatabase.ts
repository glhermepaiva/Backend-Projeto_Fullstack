import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {
  private static TABLE_NAME = "Flickenu_Imagens"
  private static PROFILE_PICTURE_TABLE = "Flickenu_FotosPerfil"

  public async addImage(
    id: string,
    subtitle: string,
    author: string, 
    date: number, 
    file: string, 
    tags: string[], 
    collection: string, 
    user_id: string
    ): Promise<void> {
      try {
        await this.getConnection()
        .insert({
          id, subtitle, author, date, file, tags, collection, user_id
        })
        .into(ImageDatabase.TABLE_NAME)
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
  }

  public async getUserImages(user: string): Promise<any> {
    const result = await this.getConnection()
    .raw(`
          SELECT * FROM ${ImageDatabase.TABLE_NAME}
          WHERE username = "${user}"
          ORDER BY ${ImageDatabase.TABLE_NAME}.date DESC
    `)
    console.log(result[0])
    return result[0]
  }

  public async getImageDetails(id: string): Promise<any> {
    const result = await this.getConnection()
    .raw(`
          SELECT * FROM ${ImageDatabase.TABLE_NAME}
          WHERE ID = "${id}"
    `)
    return result[0]
  }

  public async addProfileImage(
    id: string,
    file: string,
    user_id: string
    ): Promise<void> {
      try {
        await this.getConnection()
        .insert({
          id, file, user_id
        })
        .into(ImageDatabase.PROFILE_PICTURE_TABLE)
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
  }

  public async getProfilePicture(user: string): Promise<any> {
    const result = await this.getConnection()
    .raw(`
          SELECT * FROM ${ImageDatabase.PROFILE_PICTURE_TABLE}
          JOIN Flickenu_Usuarios on ${ImageDatabase.PROFILE_PICTURE_TABLE}.user_id = Flickenu_Usuarios.id
          WHERE username = "${user}"
    `)
    return result[0][0].file
  }

  public async deleteProfilePicture(userId: string): Promise<any> {
    await this.getConnection()
    .raw(`
         DELETE FROM ${ImageDatabase.PROFILE_PICTURE_TABLE}
         WHERE user_id = "${userId}"
    `)
  }
}