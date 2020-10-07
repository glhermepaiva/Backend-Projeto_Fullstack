import { ImageDatabase } from "../data/ImageDatabase";
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

  async getUserImages(token: string, user: string) {
    const authenticator = new Authenticator()
    authenticator.getData(token)

    if(!user) {
      throw new Error("Por favor informe um usuário para ver suas fotos")
    }

    const imageDatabase = new ImageDatabase()
    const images = await imageDatabase.getUserImages(user)

    return images
  }

  async getImageDetails(token: string, id: string) {
    const authenticator = new Authenticator()
    authenticator.getData(token)

    if (!id) {
      throw new Error("Por favor informe o id de uma imagem para ver seus detalhes")
    }

    const imageDatabase = new ImageDatabase()
    const details = await imageDatabase.getImageDetails(id)

    return details
  }
}