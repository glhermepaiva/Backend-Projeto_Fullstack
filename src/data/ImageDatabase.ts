import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {
  private static TABLE_NAME = "Flickenu_Imagens"

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
            JOIN Flickenu_Usuarios on ${ImageDatabase.TABLE_NAME}.user_id = Flickenu_Usuarios.id
            WHERE username = "${user}"
            ORDER BY ${ImageDatabase.TABLE_NAME}.date DESC
      `)
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
}