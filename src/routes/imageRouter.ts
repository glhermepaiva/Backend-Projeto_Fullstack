import express from 'express'
import { ImageController } from '../controller/ImageController'

export const imageRouter = express.Router()

const imageController = new ImageController()

imageRouter.post('/add', imageController.add)
imageRouter.get('/gallery/:username', imageController.userGallery)
imageRouter.get('/:id', imageController.imageDetails)
imageRouter.post('/add/profilePicture/:username', imageController.addProfilePicture)
imageRouter.get('/profilePicture/:username', imageController.profilePicture)