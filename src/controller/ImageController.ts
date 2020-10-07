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

  async userGallery(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const user = req.params.username as string

      const imageBusiness = new ImageBusiness()
      const images = await imageBusiness.getUserImages(token, user)

      res.status(200).send({
        gallery: images.map((image: any) => {
          return {
            subtitle: image.subtitle,
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

  async imageDetails(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const id = req.params.id

      const imageBusiness = new ImageBusiness()
      const details = await imageBusiness.getImageDetails(token, id)

      res.status(200).send({
        image: details.map((info: any) => {
          return {
            subtitle: info.subtitle,
            author: info.author,
            date: info.date,
            file: info.file,
            tags: info.tags,
            collection: info.collection
          }
        })
      })
    } catch (error) {
      res.status(400).send({error: error.message})
    } finally {
      BaseDatabase.destroyConnection()
    }
  }
}