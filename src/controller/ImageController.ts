import { Request, Response } from 'express'
import { ImageBusiness } from '../business/ImageBusiness';
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageInputDTO } from '../model/Image';

export class ImageController {
  async add(req: Request, res: Response) {
    try {
      const input: ImageInputDTO = {
        subtitle: req.body.subtitle,
        author: req.body.author,
        date: req.body.date,
        file: req.body.file,
        tags: req.body.tags,
        collection: req.body.collection
      }
      const token = req.headers.authorization as string

      const imageBusiness = new ImageBusiness()
      await imageBusiness.addImage(input, token)

      res.status(200).send({message: `Imagem cadastrada com sucesso!`})
    } catch (error) {
      res.status(400).send({error: error.message})
    } finally {
      BaseDatabase.destroyConnection()
    }
  }

  async personalGallery(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string

      const imageBusiness = new ImageBusiness()
      const images = await imageBusiness.getPersonalImages(token)

      res.status(200).send({
        gallery: images.map((image: any) => {
          return {
            subtitle: image.subtitle,
            id: image.id,
            author: image.author,
            date: image.date,
            file: image.file,
            tags: image.tags,
            collection: image.collection
          }
        }) 
      })
    } catch (error) {
      res.status(400).send({error: error.message})
    } finally {
      BaseDatabase.destroyConnection()
    }
  }

  async addProfilePicture(req: Request, res: Response) {
    try {
      const file = req.body.file as string

      const token = req.headers.authorization as string

      const imageBusiness = new ImageBusiness()
      await imageBusiness.addProfileImage(file, token)

      res.status(200).send({message: `Imagem de perfil atualizada com sucesso!`})
    } catch (error) {
      res.status(400).send({error: error.message})
    } finally {
      BaseDatabase.destroyConnection()
    }
  }

  async profilePicture(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const user = req.params.username as string

      const imageBusiness = new ImageBusiness()
      const profilePicture = await imageBusiness.getProfilePicture(token, user)

      res.status(200).send({profilePicture})
    } catch (error) {
      res.status(400).send({error: error.message})
    } finally {
      BaseDatabase.destroyConnection()
    }
  }
}