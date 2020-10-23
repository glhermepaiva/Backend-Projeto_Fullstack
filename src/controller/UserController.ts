import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { LoginInputDTO, UserInputDTO } from '../model/User'

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }
      const userBusiness = new UserBusiness()
      const token = await userBusiness.createUser(input)
      const infos = await userBusiness.getInfos(input)

      res.status(200).send({token, infos})
    } catch (error) {
      res.status(400).send({error: error.message})
    }
  }

  async login(req: Request, res: Response) {
    try {
      const input: LoginInputDTO = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      }

      const userBusiness = new UserBusiness()
      const token = await userBusiness.getUserByEmailorUsername(input)
      const infos = await userBusiness.getInfos(input)

      res.status(200).send({token, infos})
    } catch (error) {
      if(error.message.includes("undefined")){
        res.status(400).send({message: "Por favor confira se seu email ou nome de usuário estão corretos"})
    }
      res.status(400).send({error: error.message})
    }
  }
}