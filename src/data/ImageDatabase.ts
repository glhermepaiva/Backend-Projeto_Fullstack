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
}