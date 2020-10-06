import { ImageDatabase } from "../data/ImageDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { ImageInputDTO } from "../model/Image";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ImageBusiness {
  async addImage(image: ImageInputDTO, token: string) {
    if (!image.subtitle || !image.author || !image.date || !image.file || !image.tags || !image.collection){
      throw new Error("Por favor informe todos os dados")
    }

    const authenticator = new Authenticator()
    const authData = authenticator.getData(token)

    const idGenerator = new IdGenerator()
    const id = idGenerator.generate()

    const imageDatabase = new ImageDatabase()
    await imageDatabase.addImage(id, image.subtitle, image.author, image.date, image.file, image.tags, image.collection, authData.id)
  }
}