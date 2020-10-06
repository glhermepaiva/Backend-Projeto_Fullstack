import { Request, Response } from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { UserInputDTO } from '../model/User'

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.email,
        role: req.body.role
      }
      const userBusiness = new UserBusiness()
      const token = await userBusiness.createUser(input)

      res.status(200).send({message: `Usuário cadastrado com sucesso! Seja bem vindo(a) ao Flickenu, ${req.body.name}, você está agora logado(a).`, token})
    } catch (error) {
      res.status(400).send({ error: error.message })
    } finally {
      BaseDatabase.destroyConnection()
    }
  }
}