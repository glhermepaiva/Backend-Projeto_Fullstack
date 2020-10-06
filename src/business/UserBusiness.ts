import { UserDatabase } from "../data/UserDatabase";
import { UserInputDTO, UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
  async createUser(user: UserInputDTO) {
    if (!user.username || !user.name || !user.email || !user.password || !user.role){
      throw new Error("Por favor informe todos os dados")
    }

    if(user.email.indexOf("@") === -1) {
        throw new Error("Email inválido")
    }

    if (user.password.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres")
    }

    if (user.role !== UserRole.NORMAL && user.role !== UserRole.ADMIN) {
        throw new Error("O cargo precisa ser NORMAL ou ADMIN")
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(user.password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, user.username, user.email, user.name, hashPassword, user.role);

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({ id, role: user.role });

    return accessToken;
  }
}